import { Request, Response } from "express";
import { google } from "googleapis";
import Document from "../models/Document";
import admin from "firebase-admin";
import { convertHtmlToDocsRequests, getOrCreateDocumentsFolder } from "../utils/document";

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  token: string;
}

const createDocument = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, content } = req.body;

  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const newDoc = new Document({ userId: req.user.uid, title, content });
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ message: "Error creating document" });
  }
}

const uploadDocument = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.body.accessToken });

    const userDrive = google.drive({ version: "v3", auth: oauth2Client });
    
    const folderId = await getOrCreateDocumentsFolder(req.body.accessToken);

    const metadata = {
      name: document.title || "MyDocument",
      mimeType: "application/vnd.google-apps.document",
      parents: [folderId]
    };
    
    const driveResponse = await userDrive.files.create({
      requestBody: metadata,
      fields: "id",
    });

    document.googleDriveId = driveResponse.data.id;

    const docs = google.docs({
      version: "v1",
      auth: oauth2Client,
    });

    const requests = convertHtmlToDocsRequests(document.content);

    await docs.documents.batchUpdate({
      documentId: driveResponse.data.id,
      requestBody: {
        requests,
      },
    });

    await document.save();

    res.status(200).json({ 
      message: "Document uploaded", 
      driveId: driveResponse.data.id,
      folderLocation: folderId
    });
  } catch (error) {
    console.log("Error uploading document:", error?.response?.data || error.message);
    res.status(500).json({ message: "Error uploading document", error: error?.message });
  }
}

const getDocuments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const documents = await Document.find({ userId: req.user.uid }).sort({ createdAt: -1 })
    if(documents.length > 0){
      res.status(200).send({ documents })
    } else {
      res.status(404).send({ message: "Documents not found!"})
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!"})
  }
}

export { createDocument, uploadDocument, getDocuments }
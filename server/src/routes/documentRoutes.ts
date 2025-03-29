import express from "express";
import dotenv from "dotenv";
import { createDocument, uploadDocument, getDocuments } from "../controllers/documentCtrl";
import verifyToken from "../middleware";

dotenv.config();

const router = express.Router();

router.post("/create", verifyToken, createDocument);

router.post("/upload/:id", verifyToken, uploadDocument);

router.get("/", verifyToken, getDocuments)

export { router as documentRouter }

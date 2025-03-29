import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useAuth } from "@/context/AuthContext"; // Import auth context
import { useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

const TextEditor = () => {
  const user = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("")

  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  if (!editor) return null;


  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const getStoredAccessToken = () => {
    return localStorage.getItem("googleAccessToken");
  };

  const saveDocument = async () => {
    if (!user) {
      alert("You must be logged in to save documents.");
      return;
    }

    setLoading(true);
    const content = editor.getHTML(); // Get content from editor
    const token = await user.getIdToken(); // Firebase auth token
    // const text = editor.getText();

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.post(
        `${apiBaseUrl}/docs/create`,
        { content: content, title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 201) {
        const accessToken = getStoredAccessToken();

        const driveRes = await axios.post(
          `${apiBaseUrl}/docs/upload/${res.data._id}`,
          { content, title, accessToken },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if(driveRes.status == 200){
          alert("Document saved successfully!")
          navigate("/dashboard/documents");
        }
      }

    } catch (error: any) {
      console.error("Error saving document:", error);
      alert(`Error saving document: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-w-full min-h-full mx-auto bg-white shadow-lg rounded-xl p-5">
      {/* Toolbar */}
      <div className="flex flex-row justify-between gap-4 flex-wrap">
        <Input content={title} onChange={(e) => handleTitleChange(e)} placeholder="Title of the document"></Input>
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-sm">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`toolbar-btn ${editor.isActive("bold") ? "bg-blue-200" : ""}`}
          >
            <Bold size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`toolbar-btn ${editor.isActive("italic") ? "bg-blue-200" : ""}`}
          >
            <Italic size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`toolbar-btn ${editor.isActive("underline") ? "bg-blue-200" : ""}`}
          >
            <UnderlineIcon size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`toolbar-btn ${editor.isActive("heading", { level: 1 }) ? "bg-blue-200" : ""}`}
          >
            <Heading1 size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`toolbar-btn ${editor.isActive("heading", { level: 2 }) ? "bg-blue-200" : ""}`}
          >
            <Heading2 size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: "left" }) ? "bg-blue-200" : ""}`}
          >
            <AlignLeft size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: "center" }) ? "bg-blue-200" : ""}`}
          >
            <AlignCenter size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: "right" }) ? "bg-blue-200" : ""}`}
          >
            <AlignRight size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-btn ${editor.isActive("bulletList") ? "bg-blue-200" : ""}`}
          >
            <List size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-btn ${editor.isActive("orderedList") ? "bg-blue-200" : ""}`}
          >
            <ListOrdered size={18} />
          </button>

          <button
            onClick={() => {
              const url = prompt("Enter image URL");
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            className="toolbar-btn"
          >
            <ImageIcon size={18} />
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={saveDocument}
          className="px-4 py-2 bg-primary rounded-xl text-white min-w-fit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save to Drive"}
        </button>
      </div>

      {/* Editor Content */}
      <div
        className="mt-4 border border-gray-300 rounded-lg p-2 cursor-text focus:outline-none focus:border-gray-300 min-h-[60%]"
        onClick={() => editor?.chain().focus().run()} // Click to focus
      >
        <EditorContent editor={editor} className="outline-none focus:outline-none" />
      </div>
    </div>
  );
};

export default TextEditor;

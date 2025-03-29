import { Plus } from "lucide-react";
import DocumentCard from "./DocumentCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type DocumentType = {
    _id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: Date;
    googleDriveId: string;
}

export default function Documents(){

    const user = useAuth();

    const navigate = useNavigate();

    const [documents, setDocuments] = useState<[DocumentType] | []>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDocs(){
            const token = await user?.getIdToken();
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/docs/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.status === 200){
                setDocuments(res.data.documents);
            }
        }
        getDocs();
        setLoading(false);
    }, [])

    if(loading){
        return <div className="m-8"><p className="text-md font-bold">You documents are loading...</p></div>
    }

    const stripHtml = (html: string): string => {
        return html?.replace(/<[^>]+>/g, ""); // Remove HTML tags
    };

    function handleNew(){
        navigate("/dashboard/new");
    }

    return(
        <div className="p-8">
            <div className="flex gap-4 flex-wrap">
                <button onClick={() => handleNew()} className="flex flex-col gap-4 border border-gray-400 max-w-[140px] p-12 rounded-2xl cursor-pointer">
                    <Plus className="w-8 h-8 text-gray-600"/>
                    <p>New</p>
                </button>
                {!loading && documents.length > 0 ? (
                    documents.map((document) => {
                        const plainText = stripHtml(document?.content); // Remove HTML tags
                        const previewText = plainText.length > 20 ? plainText.substring(0, 20) + "..." : plainText;

                        return <DocumentCard key={document._id} title={document.title} content={previewText} />;
                })
                ) : <></>}
            </div>
        </div>
    )
}
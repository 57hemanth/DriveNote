import DocumentCard from "./DocumentCard";

export default function Documents(){
    return(
        <div className="p-8">
            <div className="flex gap-4 flex-wrap">
                <DocumentCard />
                <DocumentCard />
                <DocumentCard />
            </div>
        </div>
    )
}
import { Plus } from "lucide-react";

export default function DocumentCard(){
    return(
        <div className="flex flex-col gap-4 border border-gray-400 w-fit p-12 rounded-2xl cursor-pointer">
            <Plus className="w-8 h-8 text-gray-600"/>
            <p>New</p>
        </div>
    )
}
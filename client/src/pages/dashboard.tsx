import { AppSidebar } from "@/components/app-sidebar";
import Documents from "@/components/dashboard/Documents";
import New from "@/components/dashboard/TextEditor";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {

    const user = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeItem, setActiveItem] = useState("documents");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user == undefined) return;
        setLoading(false);
        if (user?.email) {
            navigate("/dashboard/documents")
        } else {
            setLoading(false);
            navigate("/login")
        }
    }, [user])

    useEffect(() => {
        const path = location.pathname;
        if (path.includes("documents")) setActiveItem("documents");
        else if (path.includes("new")) setActiveItem("new");
        else setActiveItem("");
    }, [location]);

    if(loading){
        return <div className="flex justify-center items-center h-screen">Loading...😊 Please login if you haven't already.</div>
    }

    return (
        <SidebarProvider>
            <AppSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                Welcome, {user?.displayName} 👋
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{activeItem == "documents" ? "All Documents" : "New"}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                { activeItem == "documents" ? <Documents /> : <New /> }
            </SidebarInset>
        </SidebarProvider>
    )
}
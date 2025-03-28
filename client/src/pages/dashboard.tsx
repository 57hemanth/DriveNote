import { AppSidebar } from "@/components/app-sidebar";
import Documents from "@/components/dashboard/Documents";
import New from "@/components/dashboard/New";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const user = useAuth();
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState("documents");

    useEffect(() => {

        if (user == undefined) return;

        if (user?.email) {
            navigate("/dashboard/documents")
        } else {
            navigate("/")
        }
    }, [user])

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
                                <BreadcrumbItem>
                                    Welcome, Hemanth 👋
                                </BreadcrumbItem>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>All Documents</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                { activeItem == "documents" ? <Documents /> : <New /> }
            </SidebarInset>
        </SidebarProvider>
    )
}
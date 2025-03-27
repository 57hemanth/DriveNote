import { Outlet } from "react-router-dom";
import Footer from "../components/homepage/Footer";
import Header from "../components/homepage/Header";

export default function MainLayout(){
    return(
        <div className="max-w-[1280px] mx-auto">
            <Header />
                <Outlet />
            <Footer />
        </div>
    )
}
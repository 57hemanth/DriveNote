import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="max-h-80 py-[12px] rounded-full px-8 mt-10 bg-primary flex flex-row justify-between">
            <h1 className="logo text-2xl text-white">DriveNote</h1>
            <nav className="text-white flex flex-row gap-4 justify-center items-center">
                <Link to={"/"} className="cursor-pointer">About Us</Link>
                <Link to={"/"} className="cursor-pointer">Contact Us</Link>
            </nav>
            <Link to={"/"} className="outline-none bg-white flex justify-center items-center px-2 rounded-full">
                <p className="text-primary">Get Started</p>
            </Link>
        </header>
    )
}
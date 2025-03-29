import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="max-h-80 py-[12px] rounded-full px-8 mt-10 mx-2 bg-primary flex flex-row justify-between">
            <Link to={"/"} className="logo text-2xl text-white">DriveNote</Link>
            <nav className="text-white hidden flex-row gap-4 justify-center items-center md:flex">
                <Link to={"/about"} className="cursor-pointer">About Me</Link>
                <Link to={"/contact"} className="cursor-pointer">Contact Me</Link>
            </nav>
            <Link to={"/login"} className="outline-none bg-white flex justify-center items-center px-4 rounded-full">
                <p className="text-primary">Login</p>
            </Link>
        </header>
    )
}
import { Link } from "react-router-dom";

export default function Hero(){
    return(
        <div className="flex flex-col justify-center items-center mt-20 gap-6">
            <h1 className="text-4xl max-w-[560px] text-center leading-12 font-medium">Effortless Writing. Instant Saving. Anywhere, Anytime</h1>
            <p className="max-w-[600px] text-center">Create and edit letters with ease, seamlessly save them to Google Drive, and access them anytime from any device.</p>
            <div className="flex flex-row gap-4 border px-4 py-2 rounded-full">
                <input className="w-[240px] outline-none" placeholder="Enter your email address" />
                <Link to={"/login"} className="bg-primary px-4 py-1 rounded-full text-white">
                    <p>Get Started</p>
                </Link>
            </div>            
        </div>
    )
}
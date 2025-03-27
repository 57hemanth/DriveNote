import Hero from "../components/homepage/Hero";

export default function Homepage(){
    return(
        <main className="max-w-[1280px] mx-auto">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#4285F4_100%)]"></div>
            <Hero />
        </main>
    )
}
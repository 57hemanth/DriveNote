export default function Contact() {
    return (
      <div className="flex flex-col items-center justify-center mt-10 p-6">
        <div className="max-w-lg bg-white p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Me</h1>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-row gap-1">
                <p>Email:</p>  
                <a href="mailto:hemanthyanamaddi@gmail.com" className="text-blue-500 hover:underline">
                    hemanthyanamaddi@gmail.com
                </a>
            </div>
            <p>Phone Number: +91 8332970360</p>
            <div className="flex flex-row">
                <p>Linkedin:</p>
                <a href="https://linkedin.com/in/hemanthyanamaddi">Hemanth Yanamaddi</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
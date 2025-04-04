import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../firebase";
import axios from "axios";

import { NotebookText } from "lucide-react";
import { cn } from "../lib/utils";

import { User } from "firebase/auth";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [user, setUser] = useState<User | null>(null);
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      navigate("/dashboard/documents")
    }
  }, [currentUser]);

  const handleLogin = async () => {
    try {
      const userInfo = await signInWithGoogle();
      if (userInfo) {
        setUser(userInfo.user);
        const res = await axios(`${import.meta.env.VITE_API_BASE_URL}/user/save`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        })
        if(res.status == 200){
          console.log("User created successfully.")
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 max-w-[560px] mx-auto my-20 px-4", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <NotebookText className="size-6" />
              </div>
              <span className="sr-only">DriveNote.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to DriveNote.</h1>
            <div className="text-center text-sm">
            Instant Saving. Anywhere, Anytime.
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full cursor-pointer" onClick={handleLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </form>

      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

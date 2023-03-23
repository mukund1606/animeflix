import axios from "axios";
import { useCallback, useState } from "react";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"))
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles"
      });

    }
    catch (error) {
      console.log(error);
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password
      });
      
      login();
    }
    catch (error) {
      console.log(error);
    }
  },[email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12"/>
        </nav>
        <div className="flex justify-center">
          <div className="self-center w-full px-16 py-16 mt-2 bg-black rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-md">
            <h2 className="mb-8 text-4xl font-semibold text-white">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && <Input 
                label="Username" 
                onChange={(ev: any) => {setName(ev.target.value)}} 
                id="name" 
                value={name} 
              />}
              <Input 
                label="Email" 
                onChange={(ev: any) => {setEmail(ev.target.value)}} 
                id="email" 
                type="email"
                value={email} 
              />
              <Input 
                label="Password" 
                onChange={(ev: any) => {setPassword(ev.target.value)}} 
                id="password" 
                type="password"
                value={password} 
              />
            </div>
            <button onClick={variant === "login" ? login : register} className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700">
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div
                onClick={() => signIn("google", {
                  callbackUrl: "/profiles"
                })}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
              >
                <FcGoogle className="text-2xl" />
              </div>
              <div
                onClick={() => signIn("github", {
                  callbackUrl: "/profiles"
                })}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
              >
                <FaGithub className="text-2xl" />
              </div>
            </div>
            <p className="mt-12 text-neutral-500">
              {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
              <span onClick={toggleVariant} className="ml-1 text-white cursor-pointer hover:underline">
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;
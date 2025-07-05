"use client";
import Header from "@/components/LandingPage/Header";
import MockCanvas from "@/components/LandingPage/MockCanvas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { BACKEND_URL, FRONTEND_URL } from "@/config";
import { useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";

export default function CardDemo() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function signup() {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      toast.warning("Please fill out all fields");
      return;
    }

    try {
      await axios.post(BACKEND_URL + "/signup", { name, email, password });
      toast.success("You have successfully signed up");
      setTimeout(() => {
        router.push(`${FRONTEND_URL}/login`);
      }, 800);
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("User exist try again");
    }
  }

  return (
    <div>
      <Header />

      <Toaster position="top-right" richColors />
      <div className="bg-black h-screen grid grid-cols-6 gap-4 items-center ">
        <div className="w-full p-20 col-span-3 hidden lg:block">
          <MockCanvas />
        </div>
        <div className="lg:col-span-3 col-span-6 ">
          <div className="bg-black flex justify-center items-center ">
            <Card className=" bg-gray-900 border-none w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-white">Create new account</CardTitle>
                <CardDescription>
                  Create a new account — enter your email below to get
                  started{" "}
                </CardDescription>
                <CardAction>
                  <Button
                    className="text-white cursor-pointer"
                    variant="link"
                    onClick={() => router.push(`${FRONTEND_URL}login`)}
                  >
                    Log In
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label className="text-white" htmlFor="email">
                        Name
                      </Label>
                      <Input
                        ref={nameRef}
                        className="text-white"
                        id="Name"
                        type="text"
                        placeholder="john_doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white" htmlFor="email">
                        Email
                      </Label>
                      <Input
                        ref={emailRef}
                        className="text-white"
                        id="email"
                        type="email"
                        placeholder="john_doe@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label className="text-white" htmlFor="password">
                          Password
                        </Label>
                      </div>
                      <Input
                        ref={passwordRef}
                        className="text-white "
                        id="password"
                        type="password"
                        placeholder="*******"
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-gray-950"
                  onClick={signup}
                >
                  Signup
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { BACKEND_URL, FRONTEND_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast, Toaster } from "sonner";
export default function CardDemo() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.warning("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(BACKEND_URL + "/signin", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setTimeout(() => {
        router.push(`${FRONTEND_URL}/canvas`);
      }, 800);
      toast.success("You have successfully signed in");
    } catch (error) {
      console.error("Signin failed:", error);
      toast.error("Enter right credentials");
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
          <div className="bg-black flex justify-center items-center h-screen">
            <Card className=" bg-gray-900 border-none w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Login to your account
                </CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                  <Button
                    className="text-white cursor-pointer"
                    variant="link"
                    onClick={() => router.push(`${FRONTEND_URL}signup`)}
                  >
                    Sign Up
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label className="text-white" htmlFor="email">
                        Email
                      </Label>
                      <Input
                        className="text-white"
                        id="email"
                        type="email"
                        ref={emailRef}
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
                        className="   text-white "
                        id="password"
                        type="password"
                        ref={passwordRef}
                        required
                        placeholder="*******"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-gray-950"
                  onClick={signin}
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

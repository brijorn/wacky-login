"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getRiddle from "./riddle";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { RealButton } from "@/components/ui/realbutton";
import { useRouter } from "next/navigation"; // Import remains the same

export default function Home() {
  // 1. CALL HOOK HERE (At the top level)
  const router = useRouter();

  // State
  const [riddle, setRiddle] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setRiddle(getRiddle());
  }, []);

  const handleSubmit = () => {
    if (!riddle) return;

    if (username.toLowerCase().trim() === riddle.answer.toLowerCase()) {
      toast.success("Correct! Enter your password.");

      // 2. USE THE VARIABLE HERE (Do not call the hook here)
      router.push(`/level2?username=${encodeURIComponent(username)}`);

    } else {
      toast.error("Wrong username. Try again");
      setUsername("");
    }
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!riddle) {
    return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    // ... (Rest of your JSX remains exactly the same)
    <div className="w-screen h-screen flex justify-center flex-col items-center transition-all duration-500">
      {/* ... content ... */}
      <div className="flex justify-center content-center align-top">
        <RealButton
          className="text-2xl font-bold p-10"
          onClick={() => handleSubmit()}
          variant="ghost"
        >
          {showPassword ? "CONFIRM LOGIN" : "WACKY LOGIN"}
        </RealButton>
      </div>
      <p className="mb-4 text-lg font-medium">{riddle.question}</p>

    <div className="w-full max-w-md space-y-4 text-center">
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldGroup>

            {/* USERNAME FIELD */}
            <Field>
              <FieldLabel htmlFor="username-input">
                Enter Username (Answer)
              </FieldLabel>
              <Input
                id="username-input"
                placeholder="Answer the riddle..."
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={showPassword}
                className={showPassword ? "opacity-50 bg-gray-100" : ""}
              />
            </Field>

          </FieldGroup>
        </form>
        <Button
          className="bg-gray-800 text-white px-8 py-3 rounded shadow-lg min-w-[120px] hover:bg-gray-700"
          onClick={handleRefresh}
        >
          LOGIN
        </Button>
      </div>
      <ToastContainer aria-label={"toast"} position="bottom-center" theme="colored" />
    </div>
  )
}
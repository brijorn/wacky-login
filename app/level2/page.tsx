"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { RealButton } from "@/components/ui/realbutton";

export default function Level2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const savedUsername = searchParams.get('username') || "Guest";

  // --- Configuration ---
  const INITIAL_COUNTDOWN_SECONDS = 15;

  // --- STATE ---
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN_SECONDS);
  const [password, setPassword] = useState('');
  
  // 0 = Start (Standard Layout Position)
  // 1 = Top Left
  // 2 = Top Right
  // 3 = Bottom Right
  // 4 = Bottom Left
  const [clickStage, setClickStage] = useState(0);

  // --- 1. TIMER LOGIC ---
  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
      return;
    }
    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [countdown]);

  // --- 2. JUMP / SUBMIT LOGIC ---
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Stage 0 -> 1 -> 2 -> 3 -> 4
    if (clickStage < 4) {
      setClickStage((prev) => prev + 1);
      return;
    }

    // Stage 4 (Final Click): Check Password
    // Fix: Ensure savedUsername is treated as string for safety
    const usernameStr = String(savedUsername);
    const correctPassword = usernameStr.split("").reverse().join("");

    if (password.toLowerCase().trim() === correctPassword.toLowerCase()) {
      toast.success("LOGGED IN SUCCESSFULLY!");
      // Fix: Uncommented the router push
      router.push('/level3'); 
    } else {
      // Fix: Removed redirection to home. Now just resets the level state.
      toast.error("INCORRECT! Try again...");
      setClickStage(0);
      setPassword('');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // --- 3. DYNAMIC POSITION CLASSES ---
  const getButtonPosition = () => {
    // Fix: Changed to 'fixed' so it breaks out of the relative container 
    // and actually goes to the screen corners
    switch (clickStage) {
      case 1: // Top Left
        return "fixed top-10 left-10";
      case 2: // Top Right
        return "fixed top-10 right-10";
      case 3: // Bottom Right
        return "fixed bottom-10 right-10";
      case 4: // Bottom Left
        return "fixed bottom-10 left-10";
      default:
        return "relative"; // Stage 0 keeps it in the document flow
    }
  };

  const getButtonText = () => {
    if (clickStage === 0) return "LOGIN";
    if (clickStage === 1) return "Catch Me";
    if (clickStage === 2) return "If";
    if (clickStage === 3) return "You";
    if (clickStage === 4) return "Can!";
    return "LOGIN";
  };

  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center transition-all duration-500 overflow-hidden relative">
      
      {/* Header Container */}
      <div className="flex flex-col items-center justify-center z-10 w-full mb-8">
        
        <RealButton
          className="text-2xl font-bold p-10 mb-4"
          onClick={handleRefresh}
          variant="ghost"
        >
          WACKY LOGIN
        </RealButton>

        <p className="mb-4 text-lg font-medium text-red-500">
          Self Destruct in: {countdown}s
        </p>

        {/* The Form */}
        <div className="w-full max-w-md space-y-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="username-input">
                  Enter Username
                </FieldLabel>
                <Input
                  id="username-input"
                  value="********"
                  disabled={true}
                  className="bg-gray-100 cursor-not-allowed opacity-70"
                />
              </Field>

              <div className="animate-in fade-in slide-in-from-top-4 duration-500 mt-4">
                <Field>
                  <FieldLabel htmlFor="password-input">
                    Enter Password (username backwards)
                  </FieldLabel>
                  <Input
                    id="password-input"
                    type="text" 
                    placeholder="Type here..."
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoFocus
                  />
                </Field>
              </div>

            </FieldGroup>
          </form>
        </div>

        <div className="mt-8 h-14 w-full flex justify-center relative">
          <div className={`
              z-50 
              transition-all duration-500 ease-in-out
              ${getButtonPosition()}
            `}>
            <Button
              className="bg-gray-800 text-white px-8 py-3 rounded shadow-lg min-w-[120px] hover:bg-gray-700"
              onClick={handleButtonClick}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>

      </div>

      <ToastContainer aria-label={"toast"} position="bottom-center" theme="colored" />
    </div>
  )
}
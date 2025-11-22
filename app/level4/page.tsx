"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const REDIRECT_DELAY_MS = 10000; // 10 seconds total delay
const MESSAGE_APPEAR_DELAY = REDIRECT_DELAY_MS - 3000; // Secondary message appears at 7 seconds

const RedirectToHomeApp = () => {
  const router = useRouter();

  // State for secondary message visibility
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    console.log(`Starting 10-second timer. Message appears at ${MESSAGE_APPEAR_DELAY / 1000}s. Redirecting at ${REDIRECT_DELAY_MS / 1000}s.`);
    
    // 1. Timer for the message appearance (7 seconds)
    const messageTimerId = setTimeout(() => {
      setShowMessage(true);
      console.log('Secondary message visible.');
    }, MESSAGE_APPEAR_DELAY);

    // 2. Timer for the redirection (10 seconds)
    const redirectTimerId = setTimeout(() => {
      console.log('Time expired. Redirecting to home page.');
      router.push('/'); // Redirect to the actual home page
    }, REDIRECT_DELAY_MS);

    // 3. Cleanup function: Clears both timers
    return () => {
      clearTimeout(messageTimerId);
      clearTimeout(redirectTimerId);
      console.log('Timers cleanup performed.');
    };
  }, [router]); // Add router to dependencies to avoid lint warnings

  // Initial view: The "Congrats" screen
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-extrabold text-green-600">
          CONGRATS
        </h1>
        {/* The secondary message is only shown after the showMessage state is true */}
        {showMessage && (
          <p className="mt-8 text-3xl font-bold text-green-700 opacity-0 animate-fadeIn" style={{ animation: 'fadeIn 1s forwards' }}>
            Now go back and do it again
          </p>
        )}
      </div>
       {/* Define the fade-in keyframe for smooth appearance */}
       <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RedirectToHomeApp;
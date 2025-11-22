"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, } from "@/components/ui/button";
import NavigationBar from "@/components/NavigationBar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export default function Home() {
    const RUN_DISTANCE = 75; // The distance (in pixels) the mouse has to be from the button to trigger movement
    const INITIAL_COUNTDOWN_SECONDS = 10;
    const RunawayButton()
    const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN_SECONDS);

    const RUN_DISTANCE = 100;
const INITIAL_COUNTDOWN_SECONDS = 30; // Set the timer duration

const RunawayButton = () => {
  // --- TIMER LOGIC ---
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN_SECONDS);

  useEffect(() => {
    // Exit if the countdown is already zero
    if (countdown === 0) {
      import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <div className="w-full max-w-md">
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                Enter Username
              </FieldLabel>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder="Enter password (username backwards): "
                required
                onChange={handleText}
                value={answer}
              />
            </Field>
            <Field>
            </Field>
          </FieldGroup>
        </form>
      </div>
  )
}
      return;
    }

    // Set up the interval to decrement the countdown every second
    const timerId = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    // or when the countdown state changes (before re-running the effect)
    return () => clearInterval(timerId);
  }, [countdown]);

    // Exit if the countdown is already zero
    
  
    // 1. Refs to get the button's element and its container's element
    const buttonRef = useRef(null);
    const containerRef = useRef(null);
    

    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current || !containerRef.current) return;

    // Get the button's current position and dimensions relative to the viewport
    const buttonRect = buttonRef.current.getBoundingClientRect();
    
    // Calculate the button's center coordinates
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Mouse cursor coordinates
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Vector components from mouse to button center
    const deltaX = buttonCenterX - mouseX;
    const deltaY = buttonCenterY - mouseY;
    
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // Calculate the button's potential new position relative to the container's top/left (0,0)
    // The original button position, plus the calculated offset
    const buttonStartLeft = containerRect.left + (containerRect.width - buttonWidth) / 2;
    const buttonStartTop = containerRect.top + (containerRect.height - buttonHeight) / 2;
    
    const potentialLeft = buttonStartLeft + newOffsetX;
    const potentialTop = buttonStartTop + newOffsetY;

    // Check X-axis boundaries
    const maxLeft = containerRect.left + PADDING; // Left boundary
    const maxRight = containerRect.right - buttonWidth - PADDING; // Right boundary

    if (potentialLeft < maxLeft) {
      // Button is trying to move too far left. Lock its left edge to maxLeft.
      // New offset = (Boundary position) - (Initial position)
      newOffsetX = maxLeft - buttonStartLeft;
    } else if (potentialLeft > maxRight) {
      // Button is trying to move too far right. Lock its right edge to maxRight.
      newOffsetX = maxRight - buttonStartLeft;
    }

    // Check Y-axis boundaries
    const maxTop = containerRect.top + PADDING; // Top boundary
    const maxBottom = containerRect.bottom - buttonHeight - PADDING; // Bottom boundary

    if (potentialTop < maxTop) {
      // Button is trying to move too far up.
      newOffsetY = maxTop - buttonStartTop;
    } else if (potentialTop > maxBottom) {
      // Button is trying to move too far down.
      newOffsetY = maxBottom - buttonStartTop;
    }
  }
    // Calculate the straight-line distance (Hypotenuse)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < RUN_DISTANCE) {
      // The mouse is too close! Calculate how much to push the button away.
      
      // Calculate the angle (in radians) of the vector from mouse to button center
      const angle = Math.atan2(deltaY, deltaX);

      // The desired new distance from the mouse to the button center (just outside the RUN_DISTANCE)
      const newDistance = RUN_DISTANCE; 

      // Calculate the new center coordinates based on the angle and new distance from the mouse
      const newButtonCenterX = mouseX + Math.cos(angle) * newDistance;
      const newButtonCenterY = mouseY + Math.sin(angle) * newDistance;

      // Calculate the necessary translation (offset) to move the button to this new center
      // We subtract the initial center (before any translation) to get the required shift.
      const newOffsetX = newButtonCenterX - (buttonRect.left + buttonRect.width / 2);
      const newOffsetY = newButtonCenterY - (buttonRect.top + buttonRect.height / 2);

      setOffset({ x: newOffsetX, y: newOffsetY });
    } else {
      // The mouse is far enough away, reset the button to its original position
      setOffset({ x: 0, y: 0 });
    }
  }, []);

  // Use useEffect to add a global mousemove listener to the document
  // This allows the button to react even when the mouse is outside the container.
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);
  
  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: '400px', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        border: '1px dashed #ccc' 
      }}
    >
      <div style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Page will refresh in: **{countdown}** seconds
      </div>
      
      <button
        ref={buttonRef}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: 'transform 0.3s ease-out',
          position: 'absolute',
          padding: '15px 30px',
          fontSize: '1.2rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        onClick={() => alert("You finally caught me!")}
      >
        Login
      </button>
    </div>
  );
};

};

export default RunawayButton;



"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const SimpleGuessingGame = () => {
    const router = useRouter();

    // State for the number the user needs to guess (1-10)
    const [targetNumber, setTargetNumber] = useState(0);

    // State for the user's current guess from the slider (default: 5)
    const [userGuess, setUserGuess] = useState(5);

    // State for the feedback message displayed to the user
    const [feedback, setFeedback] = useState("Make your first guess!");

    // State to track if the number has been correctly guessed
    const [isGuessed, setIsGuessed] = useState(false);

    /**
     * Generates a new random number between 1 and 10.
     */
    const generateNewNumber = () => {
        // Generate a number between 1 and 10 (inclusive)
        const newTarget = 1 // Math.floor(Math.random() * 10) + 1;
        setTargetNumber(newTarget);
        setUserGuess(5); // Reset slider to default
        setFeedback("A new number has been generated. Guess it!");
        setIsGuessed(false);
    };

    // Start the game when the component loads
    useEffect(() => {
        generateNewNumber();
    }, []);

    /**
     * Handles the user submitting their guess.
     */
    const handleSubmitGuess = () => {
        if (isGuessed) {
            setFeedback("The game is over!"); // Corrected typo
            return;
        }

        if (userGuess === targetNumber) {
            setFeedback(`✅ **You Got It!** The number was ${targetNumber}.`);
            setIsGuessed(true);
            
            // Redirect to Level 4 after a short delay to show the success message
            setTimeout(() => {
                router.push('/level4');
            }, 1500);
        } else {
            setFeedback("❌ Incorrect. Try Again.");
            // Redirect to home on incorrect guess after a short delay
            setTimeout(() => {
                router.push('/');
            }, 1500);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-md text-center bg-white font-sans animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="text-gray-800 text-2xl font-bold mb-5">🤔 Guessing Game (No Hints)</h1>

            <p className="text-lg mb-8">
                Guess a number between <strong>1</strong> and <strong>10</strong>.
            </p>

            {/* --- Slider Input --- */}
            <div className="mb-8 py-2 border-b border-gray-200">
                <label htmlFor="guessSlider" className="block text-xl font-bold mb-4">
                    Your Current Guess: <strong>{userGuess}</strong>
                </label>
                <input
                    type="range"
                    id="guessSlider"
                    min="1"
                    max="10"
                    value={userGuess}
                    onChange={(e) => setUserGuess(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                    <span>1</span>
                    <span>10</span>
                </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex justify-around mb-8 gap-4">
                <Button
                    onClick={handleSubmitGuess}
                    disabled={isGuessed}
                    variant={isGuessed ? "secondary" : "default"}
                    className={isGuessed ? "cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}
                >
                    {isGuessed ? '✅ Guessed!' : 'Submit Guess'}
                </Button>
            </div>

            {/* --- Feedback Display --- */}
            <h3 className="min-h-[40px] text-xl font-medium text-gray-800">{feedback}</h3>
        </div>
    );
};

export default SimpleGuessingGame;
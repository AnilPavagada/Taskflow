import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Helper function to check and handle popup opener safely
    const safeWindowClose = (popup) => {
        if (popup && popup.opener && popup.opener.location.origin === window.location.origin) {
            popup.close(); // Close popup safely
        } else {
            console.warn("Popup opener is not accessible due to cross-origin policies.");
        }
    };

    

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            // Ensure the popup is triggered by direct user interaction
            const result = await signInWithPopup(auth, provider);
            const user = result.user; // Get user details
            console.log("User signed in:", user);

            // Navigate to '/home' after successful sign-in
            navigate("/home");
        } catch (error) {
            if (error.code === "auth/popup-blocked") {
                console.error("Popup blocked by the browser. Ensure direct user interaction.");
            } else {
                console.error("Error during sign-in:", error.message);
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF9F9] relative overflow-hidden">
            {/* Left Side */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 sm:px-8 md:px-12 lg:px-20">
                <div className="w-full max-w-md text-center space-y-8">
                    <div className="flex items-center justify-center space-x-3">
                        <img
                            src={assets.Task}
                            alt="TaskBuddy Logo"
                            className="h-12 w-12 sm:h-16 sm:w-16"
                        />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-600 leading-tight">
                            TaskBuddy
                        </h1>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                        Streamline your workflow and track progress effortlessly with our all-in-one task management app.
                    </p>
                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="mt-6 bg-gray-900 text-white py-2.5 px-6 sm:py-3 sm:px-8 rounded-full flex items-center justify-center space-x-3 shadow-lg hover:bg-gray-700 transition duration-200"
                    >
                        <img
                            src={assets.Google}
                            alt="Google Logo"
                            className="h-5 w-5 sm:h-6 sm:w-6"
                        />
                        <span className="font-semibold text-sm sm:text-base">Continue with Google</span>
                    </button>
                </div>
            </div>

            {/* Right Side (Image) */}
            <div className="flex-1 hidden md:flex relative items-center justify-center bg-[#FFF9F9] overflow-hidden">
                <div className="absolute top-0 right-0 left-0 w-full h-full">
                    <img
                        src={assets.Circle}
                        alt="Background Circles"
                        className="w-[120%] h-[120%] object-cover opacity-50 transform translate-x-0 -translate-y-0"
                    />
                </div>
                <div className="flex-1 relative bg-[#FFF9F9] overflow-hidden">
                    {/* This div and image will only appear on mobile screens */}
                    <div className="absolute bottom-0 left-0 md:hidden">
                        <img
                            src={assets.Circle}
                            alt="Background Circles"
                            className="w-[120px] h-[120px] opacity-50"
                        />
                    </div>
                </div>



                <div className="w-[90%] max-w-2xl bg-white shadow-xl rounded-lg p-6 z-10 transform scale-95 hover:scale-100 transition duration-300">
                    <img
                        src={assets.Right}
                        alt="Task List"
                        className="w-full rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon for loading

const GoogleAuthentication = () => {
    const [loading, setLoading] = useState(false); // State for loading
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate();

    // Success handler
    const handleGoogleSuccess = async (response) => {
        setLoading(true); // Show loading spinner
        setErrorMessage(''); // Clear any previous error message
        const token = response.credential;

        try {
            const res = await fetch("http://localhost:8080/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (!res.ok) {
                throw new Error("Failed to authenticate with Google");
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            console.log("JWT Token:", data.token);
            navigate("/"); // Redirect to home page after success
        } catch (error) {
            setErrorMessage('Authentication failed, please try again later.');
            console.error("Authentication error:", error);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    // Failure handler
    const handleGoogleFailure = (error) => {
        setErrorMessage('Google Login Failed, please try again.');
        console.error("Google Login Failed", error);
    };

    return (
        <GoogleOAuthProvider
            clientId={import.meta.env.REACT_APP_CLIENTID || "894699118587-l20o01e237hkhho2u8r4107r333vq4bc.apps.googleusercontent.com"}
        >
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Welcome to Pay Per Go
                    </h2>
                    <div className="text-center">
                        {loading ? (
                            <button
                                disabled
                                className="bg-blue-500 text-white w-full py-2 rounded-lg flex justify-center items-center disabled:opacity-50"
                            >
                                <FaSpinner className="animate-spin w-5 h-5 mr-2" />
                                Authenticating...
                            </button>
                        ) : (
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onFailure={handleGoogleFailure}
                                buttonText="Login with Google"
                                theme="outline" // Optional: You can customize the button style further
                                shape="rectangular" // Optional: Make button rectangular for a cleaner look
                            />
                        )}

                        {errorMessage && (
                            <div className="mt-4 text-red-600 text-sm">{errorMessage}</div>
                        )}
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthentication;

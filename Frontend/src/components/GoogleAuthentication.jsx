import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

const GoogleAuthentication = () => {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (response) => {
        console.log("response : ",response);
        const token = response.credential;
        console.log("token : ",token);
        const res = await fetch("http://localhost:8080/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        const data = await res.json();
        localStorage.setItem("token",data.token);
        console.log("JWT Token:", data.token);
        navigate("/");
    };

    const handleGoogleFailure = (error) => {
        console.error("Google Login Failed", error);
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_CLIENTID = "894699118587-l20o01e237hkhho2u8r4107r333vq4bc.apps.googleusercontent.com"
        }>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                //cookiePolicy={"single_host_origin"}
                buttonText="Login with Google"
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthentication;
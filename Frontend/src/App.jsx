import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GoogleAuthentication from './components/GoogleAuthentication';
import Logout from "./components/Logout";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";  // Admin-specific Home page
import AddProduct from "./pages/AddProduct";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import { useEffect, useState } from "react";
// import * as jwt_decode from 'jwt-decode';
// import jwt_decode from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";

function App() {
    const [role, setRole] = useState(null);

    // Check for role or JWT token in local storage 
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
            console.log("role set as (Inside App.jsx):" + decodedToken.role);
        } else {
            setRole("USER");
        }
    }, []);

    // Debugging: Check role value
    console.log("Current Role:", role);

    return (
        <BrowserRouter>
            <Header role={role} />
            <Routes>
                {/* For User Role */}
                {role === "USER" ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/Authenticate" element={<GoogleAuthentication setRole={setRole} />} />
                        <Route path="/logout" element={<Logout setRole={setRole}/>} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/admin-home" element={<Navigate to="/" />} />
                        {/* Optional: A route for handling 404 (not found) */}
                        {/* <Route path="*" element={<NotFound />} /> */}
                    </>
                ) : 
                null
                }

                {/* For Admin Role */}
                {role === "ADMIN" ? (
                    <>
                        <Route path="/admin-home" element={<AdminHome />} />
                        <Route path="/logout" element={<Logout setRole={setRole}/>} />
                        <Route path="/" element={<Navigate to="/admin-home" />} />
                        <Route path="/user-profile" element={<Navigate to="/admin-home" />} />
                        <Route path="/add-product" element={<Navigate to="/admin-home" />} />
                        <Route path="/Authenticate" element={<Navigate to="/admin-home" />} />
                    </>
                ) : 
                null
                }

                {/* Redirect if no role is defined */}
                {/* <Route path="*" element={<Navigate to="/" />} /> */}

            </Routes>
        </BrowserRouter>
    );
}

export default App;

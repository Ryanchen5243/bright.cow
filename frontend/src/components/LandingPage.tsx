import { Business } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const handleSignout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signed out successfully")
            navigate("/login")
        }).catch((error) => {
            // An error happened.
            console.log("error signing out", error)
        });
    }
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
    }, [])

    return (
        <div className="landing-page">
            <nav>
                <div className="nav-company-name">
                    <Business className="nav-icon"/>
                    <Link to="/" className="nav-company-name-link">UWU~VIBE</Link>
                </div>
                <div className="nav-links">
                    <Link to="/app" className="nav-link">Home</Link>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#about" className="nav-link">About Us</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>
            </nav>
            <h1>Konevo LLC</h1>
            <p>Your one-stop platform for gaming, socializing, and more. Explore our features and join the fun today!</p>
            <Link to="/login" className="landing-cta-button">Get Started</Link>
        </div>
    );
}
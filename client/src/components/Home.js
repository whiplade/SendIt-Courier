import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../CSS/Home.css";

export default function Home() {
    return(
        <>
        {<NavBar />}
        <div className="background-image">
            <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFyY2VsfGVufDB8fDB8fHww" alt=""/>
        </div>
        {<Footer />}
        </>
        
    )
}


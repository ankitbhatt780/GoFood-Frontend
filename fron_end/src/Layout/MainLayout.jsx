import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function MainLayout({ children }) {
    return (
        <div>

            <Navbar />
            {children}
            <Footer />

        </div>
    );
}

export default MainLayout;

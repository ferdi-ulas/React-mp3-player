import React from "react";
import { FaGithub, FaYoutube, FaGlobe, FaLinkedin } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
    return (
        <div className="footer-container">
            <span className="details">&copy; Ferdi ULAŞ</span>
            <footer className="social-links">
                <a
                    href="https://github.com/ferdi-ulas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <FaGithub /> GitHub
                </a>
                <a
                    href="https://www.youtube.com/@jr.ferdiulas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <FaYoutube /> YouTube
                </a>
                <a
                    href="https://cv-main-psi.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <FaGlobe /> Web Sitesi
                </a>
                <a
                    href="https://www.linkedin.com/in/ferdiulas-/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <FaLinkedin /> Linkedin
                </a>
            </footer>
        </div>
    );
};

export default Footer;

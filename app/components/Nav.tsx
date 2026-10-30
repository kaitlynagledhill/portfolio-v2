"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => {
      setIsScrolled(window.scrollY > 80);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  return (
    <nav className={`nav nav-entrance ${isScrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-brand">
        <a href="/" className="nav-home">
          <span className="nav-name">Kaitlyn Gledhill</span>
        </a>
        <span className="nav-title">FULL STACK ENGINEER, DIGITAL DESIGNER</span>
      </div>

      <div className="nav-links">
        <a href="#work" className="nav-link">
          work
        </a>
        <a href="#about" className="nav-link">
          about
        </a>
        {/* <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          resume
        </a> */}
        <a href="#contact" className="nav-link">
          contact
        </a>
      </div>
    </nav>
  );
}

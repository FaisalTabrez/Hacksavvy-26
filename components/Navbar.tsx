"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Close mobile nav when clicking a link
  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container-fluid container-xxl d-flex align-items-center justify-content-between">
        <div id="logo" className="me-auto">
          <a href="https://mgit.ac.in/" style={{ width: "280px", marginTop: "1px" }}>
            <img
              className="lazy"
              src="/mgitwhitelogo.png"
              alt="MGIT Logo"
              style={{ padding: "20px", width: "220px", height: "auto" }}
            />
          </a>
        </div>

        <nav
          id="navbar"
          className={`navbar order-last order-lg-0 ${isMobileNavOpen ? "navbar-mobile" : ""
            }`}
        >
          <ul className="d-flex flex-row align-items-center">
            <li>
              <Link className="nav-link scrollto" href="#about" onClick={closeMobileNav}>
                About
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#theme" onClick={closeMobileNav}>
                Theme
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#leaders" onClick={closeMobileNav}>
                Leaders
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#guidelines" onClick={closeMobileNav}>
                Guidelines
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#schedule" onClick={closeMobileNav}>
                Schedule
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#supporters" onClick={closeMobileNav}>
                Our Partners
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#team" onClick={closeMobileNav}>
                Team
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#faq" onClick={closeMobileNav}>
                F.A.Q
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#contact" onClick={closeMobileNav}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
            {isMobileNavOpen ? <BiX /> : <BiMenu />}
          </div>
        </nav>
        <a className="buy-tickets scrollto" href="#">
          Register
        </a>
      </div>
    </header>
  );
}

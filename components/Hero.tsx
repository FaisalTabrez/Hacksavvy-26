"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const tickerWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero Section Animations
        gsap.fromTo(
            ".hero-title",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
        gsap.fromTo(
            ".hero-subtitle",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 1 }
        );

        // Ticker animation: slower start, then even slower
        const ticker = document.querySelector(".ticker") as HTMLElement;
        if (ticker) {
            setTimeout(() => {
                ticker.style.animation = "scrollSlow 60s linear infinite";
            }, 25000);
        }

        // Hide ticker when scrolling past hero section
        const handleScroll = () => {
            if (heroRef.current && tickerWrapRef.current) {
                const heroBottom = heroRef.current.offsetHeight;
                if (window.scrollY > heroBottom) {
                    tickerWrapRef.current.style.opacity = "0";
                    tickerWrapRef.current.style.pointerEvents = "none";
                } else {
                    tickerWrapRef.current.style.opacity = "1";
                    tickerWrapRef.current.style.pointerEvents = "auto";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="hero" className="section !justify-start pt-52" ref={heroRef}>
            <div id="ticker-wrap-top">
                <div className="ticker">
                    <div className="ticker-reverse">
                        <span>
                            REGISTRATIONS OPEN • REGISTRATIONS OPEN • REGISTRATIONS OPEN{" "}
                        </span>
                        <span>
                            REGISTRATIONS OPEN • REGISTRATIONS OPEN • REGISTRATIONS OPEN{" "}
                        </span>
                        <span>
                            REGISTRATIONS OPEN • REGISTRATIONS OPEN • REGISTRATIONS OPEN{" "}
                        </span>
                        <span>
                            REGISTRATIONS OPEN • REGISTRATIONS OPEN • REGISTRATIONS OPEN{" "}
                        </span>
                    </div>
                </div>
            </div>

            <div className="hero-content !mt-0">
                <h1 className="hero-title">
                    H<span className="c1">ACK</span>
                    S<span className="c1">AVVY</span>-26
                </h1>
                <p className="hero-subtitle">
                    National-Level Hackathon <br />
                    <br /> MGIT, Hyderabad <br /> February 12th-13th 2026
                </p>
            </div>

            <div className="w-full max-w-[1200px] mt-20 px-4">
                <div className="themes-row">
                    <div className="theme-box">
                        <p className="theme-subtitle">
                            AI, Automation, Robotics & <br />
                            Drone Technology
                        </p>
                    </div>

                    <div className="theme-box">
                        <p className="theme-subtitle">
                            Cybersecurity & <br />
                            Blockchain
                        </p>
                    </div>

                    <div className="theme-box">
                        <p className="theme-subtitle">
                            IoT, VLSI & <br />
                            Embedded Systems
                        </p>
                    </div>

                    <div className="theme-box">
                        <p className="theme-subtitle">
                            Sustainability & <br />
                            Environment
                        </p>
                    </div>

                    <div className="theme-box">
                        <p className="theme-subtitle">Open Innovation</p>
                    </div>
                </div>
            </div>

            <div className="ticker-wrap" id="ticker-wrap" ref={tickerWrapRef}>
                <div className="ticker">
                    <span>24 Hour Hackathon • </span>
                    <span>Price Pool: ₹ 2,50,000 • </span>
                    <span>National Level Event • </span>
                    <span>Industry Expert Mentors • </span>
                    <span>Exciting Domains & Tracks • </span>
                    <span>Networking Opportunities • </span>
                    {/* Duplicate spans for seamless loop */}
                    <span>24 Hour Hackathon • </span>
                    <span>Price Pool: ₹ 2,50,000 • </span>
                    <span>National Level Event • </span>
                    <span>Industry Expert Mentors • </span>
                    <span>Exciting Domains & Tracks • </span>
                    <span>Networking Opportunities • </span>
                </div>
            </div>
        </section>
    );
}

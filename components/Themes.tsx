"use client";

import { useState } from "react";

export default function Themes() {
    const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

    const togglePS = (id: string) => {
        setOpenStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <section id="theme" className="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Main Themes of HackSavvy</h2>
                        <p style={{ textAlign: "justify" }}>
                            Dive into the heart of innovation with HackSavvy's carefully
                            selected themes, each designed to challenge your creativity and
                            technical prowess. From the intricate world of Artificial
                            Intelligence to the sustainable solutions in Infrastructure,
                            explore how technology can transform our future. Click on a theme
                            below to access complete problem statements and tailor your
                            project to solve real-world issues.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="container">
                            <div className="details">
                                <img
                                    src="theme/ai.jpg"
                                    alt="AI, Automation, Robotics & Drone Technology"
                                    className="circle-img"
                                />
                                <p>
                                    AI, Automation, <br />
                                    Robotics & Drone Technology
                                </p>
                                <div className="social">
                                    <a href="#theme1" className="buy-tickets">
                                        View Problem Statements
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="container">
                            <div className="details">
                                <img
                                    src="theme/security.jpg"
                                    alt="Cybersecurity and BlockChain"
                                    className="circle-img"
                                />
                                <p>
                                    Cybersecurity
                                    <br />& BlockChain
                                    <br />
                                </p>
                                <div className="social">
                                    <a href="#theme2" className="buy-tickets">
                                        View Problem Statements
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="container">
                            <div className="details">
                                <img
                                    src="theme/iot.jpg"
                                    alt="Internet of Things (IoT) and Smart Connectivity"
                                    className="circle-img"
                                />
                                <p>
                                    IoT, VLSI & Embedded
                                    <br />
                                    Systems
                                    <br />
                                </p>
                                <div className="social">
                                    <a href="#theme3" className="buy-tickets">
                                        View Problem Statements
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="container">
                            <div className="details">
                                <img
                                    src="theme/sustainable.jpg"
                                    alt="Sustainability and Environment"
                                    className="circle-img"
                                />
                                <p>
                                    Sustainability
                                    <br />& Environment
                                    <br />
                                </p>
                                <div className="social">
                                    <a href="#theme4" className="buy-tickets">
                                        View Problem Statements
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="container">
                            <div className="details">
                                <img
                                    src="theme/open.jpg"
                                    alt="Open Innovation and Collaborative Solutions"
                                    className="circle-img"
                                />
                                <p>
                                    Open Innovation
                                    <br />& Technology
                                    <br />
                                </p>
                                <div className="social">
                                    <a href="#theme5" className="buy-tickets">
                                        View Guideline Statements
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>              
        </section>
    );
}

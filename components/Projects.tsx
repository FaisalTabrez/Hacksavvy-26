"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current || !sectionRef.current) return;

        const slides = containerRef.current.querySelectorAll(".project-slide");

        const ctx = gsap.context(() => {
            gsap.to(containerRef.current, {
                xPercent: -100 * (slides.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (slides.length - 1),
                    // Use a function to calculate end position dynamically
                    end: () => "+=" + containerRef.current!.offsetWidth,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" className="section" ref={sectionRef}>
            <h2>Media & Highlights</h2>
            <div className="projects-container" ref={containerRef}>
                <div className="project-slide">
                    <img src="media/1.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Organizing Committee</div>
                </div>

                <div className="project-slide">
                    <img src="media/2.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">
                        Technical Workshop of HackSavvy-25
                    </div>
                </div>

                <div className="project-slide">
                    <img src="media/3.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">
                        Inaugural Function of Hacksavvy-25
                    </div>
                </div>

                <div className="project-slide">
                    <img src="media/4.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Award Ceremony</div>
                </div>

                <div className="project-slide">
                    <img src="media/5.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Lamp Lighting Ceremony</div>
                </div>

                <div className="project-slide">
                    <img src="media/6.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Award Ceremony</div>
                </div>

                <div className="project-slide">
                    <img src="media/1.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Organizing Committee</div>
                </div>

                <div className="project-slide">
                    <img src="media/2.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">
                        Technical Workshop of HackSavvy-25
                    </div>
                </div>

                <div className="project-slide">
                    <img src="media/3.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">
                        Inaugural Function of Hacksavvy-25
                    </div>
                </div>

                <div className="project-slide">
                    <img src="media/4.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Award Ceremony</div>
                </div>

                <div className="project-slide">
                    <img src="media/5.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Lamp Lighting Ceremony</div>
                </div>

                <div className="project-slide">
                    <img src="media/6.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Award Ceremony</div>
                </div>

                <div className="project-slide">
                    <img src="media/7.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Teams Presenting</div>
                </div>

                <div className="project-slide">
                    <img src="media/8.jpg" alt="Media from hacksavvy-25" />
                    <div className="project-overlay">Faculty Co-ordinators</div>
                </div>
            </div>
        </section>
    );
}

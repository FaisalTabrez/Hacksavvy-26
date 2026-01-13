"use client";

import { useRef, useState } from "react";

export default function Team() {
    const facultyTrackRef = useRef<HTMLDivElement>(null);
    const studentTrackRef = useRef<HTMLDivElement>(null);

    // State to track offsets for manual control
    const [facultyOffset, setFacultyOffset] = useState(0);
    const [studentOffset, setStudentOffset] = useState(0);

    const slideAmount = 290; // card width (260) + gap (30)

    const handleSlide = (
        direction: "prev" | "next",
        trackRef: React.RefObject<HTMLDivElement | null>,
        currentOffset: number,
        setOffset: React.Dispatch<React.SetStateAction<number>>
    ) => {
        if (!trackRef.current) return;

        const track = trackRef.current;

        // Stop animation
        track.classList.add("manual-control");

        let newOffset = currentOffset;
        if (direction === "prev") {
            newOffset += slideAmount;
            // Limit
            const maxRight = slideAmount * 3;
            if (newOffset > maxRight) newOffset = maxRight;
        } else {
            newOffset -= slideAmount;
            // Limit
            const maxLeft = -(track.scrollWidth / 2); // Approximate limit
            if (newOffset < maxLeft) newOffset = maxLeft;
        }

        setOffset(newOffset);
        track.style.transform = `translateX(${newOffset}px)`;

        // Resume animation after 5 seconds
        setTimeout(() => {
            if (track) {
                track.classList.remove("manual-control");
                track.style.transform = "";
                setOffset(0);
            }
        }, 5000);
    };

    return (
        <section id="team" className="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Meet the Team</h2>
                        <p style={{ textAlign: "justify" }}>
                            Our dedicated team of organizers and volunteers work tirelessly
                            behind the scenes to ensure HackSavvy-26 is a seamless and
                            unforgettable experience for all participants. Get to know the
                            passionate individuals who bring this event to life!
                        </p>
                        <h3>Faculty Co-ordinators</h3>
                    </div>
                </div>

                {/* Faculty Slider */}
                <div className="team-slider-wrapper">
                    <button
                        className="nav-btn prev"
                        onClick={() => handleSlide("prev", facultyTrackRef, facultyOffset, setFacultyOffset)}
                    >
                        &#10094;
                    </button>

                    <div className="team-slider">
                        <div className="team-track" ref={facultyTrackRef}>
                            <div className="team-card">
                                <img src="faculty/1.jpg" alt="Dr. Ch. Ramesh Babu" />
                                <h4>Dr. Ch. Ramesh Babu</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/2.jpg" alt="Dr. V. Subba Ramaiaha" />
                                <h4>Dr. V. Subba Ramaiaha</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/3.jpg" alt="Dr. A. Ratna Raju" />
                                <h4>Dr. A. Ratna Raju</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/4.jpg" alt="Dr. K. Madubabu" />
                                <h4>Dr. K. Madubabu</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/5.jpg" alt="Dr. Meera Alphy" />
                                <h4>Dr. Meera Alphy</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/6.jpg" alt="Mr. R. Srinivas" />
                                <h4>Mr. R. Srinivas</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/7.jpg" alt="Dr. B. Yadaiah" />
                                <h4>Dr. B. Yadaiah</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/15.jpg" alt="Ms. J Hima Bindu" />
                                <h4>Ms. J Hima Bindu</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/8.jpg" alt="Mrs. V Veena" />
                                <h4>Mrs. V Veena</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/9.jpg" alt="A. Bal raju" />
                                <h4>A. Bal raju</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/10.jpg" alt="Dr. S Siva Reddy" />
                                <h4>Dr. S Siva Reddy</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/11.jpg" alt="Mr. Sheri Abhishek" />
                                <h4>Mr. Sheri Abhishek</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>
                            <div className="team-card">
                                <img src="faculty/12.jpg" alt="Mr. P. Shankar Kumar" />
                                <h4>Mr. P. Shankar Kumar</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/13.jpg" alt="Dr. Asheesh Kumar" />
                                <h4>Dr. Asheesh Kumar</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>

                            <div className="team-card">
                                <img src="faculty/14.jpg" alt="Mr. Bhoomik Ketari" />
                                <h4>Mr. Bhoomik Ketari</h4>
                                <p>Faculty Co-ordinator</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="nav-btn next"
                        onClick={() => handleSlide("next", facultyTrackRef, facultyOffset, setFacultyOffset)}
                    >
                        &#10095;
                    </button>
                </div>

                <h3>Student Co-ordinators</h3>

                {/* Student Slider */}
                <div className="team-slider-wrapper">
                    <button
                        className="nav-btn prev"
                        onClick={() => handleSlide("prev", studentTrackRef, studentOffset, setStudentOffset)}
                    >
                        &#10094;
                    </button>

                    <div className="team-slider">
                        <div className="team-track" ref={studentTrackRef}>
                            <div className="team-card">
                                <img src="student/1.jpg" alt="Junaid Ahmed Khan" />
                                <h4>Junaid Ahmed Khan</h4>
                                <p>Student Co-ordinator</p>
                                <a href="tel:+91 8008800401">+91 8008800401</a>
                            </div>

                            <div className="team-card">
                                <img src="student/6.jpg" alt="Vrundha Reddy Panga" />
                                <h4>Vrundha Reddy Panga</h4>
                                <p>Student Co-ordinator</p>
                                <a href="tel:+91 9133199706">+91 9133199706</a>
                            </div>

                            <div className="team-card">
                                <img src="student/2.jpg" alt="Sai Amrutha Polu " />
                                <h4>Sai Amrutha Polu </h4>
                                <p>Student Co-ordinator</p>
                                <a href="tel:+91 8464085246">+91 8464085246</a>
                            </div>

                            <div className="team-card">
                                <img src="student/3.jpg" alt="Maneesha Kallepalli" />
                                <h4>Maneesha Kallepalli</h4>
                                <p>Student Co-ordinator</p>
                                <a href="tel:+91 9393005221">+91 9393005221</a>
                            </div>

                            <div className="team-card">
                                <img src="student/4.jpg" alt="Shreya Reddy Thangella" />
                                <h4>Shreya Reddy Thangella</h4>
                                <p>Student Co-ordinator</p>
                                <a href="tel:+91 8919290101">+91 8919290101</a>
                            </div>

                            <div className="team-card">
                                <img src="student/5.jpg" alt="Kriti Karunam" />
                                <h4>Kriti Karunam</h4>
                                <p>Student Co-ordinator</p>
                                <a href="tel:+91 9966430309">+91 9966430309</a>
                            </div>
                        </div>
                    </div>
                    <button
                        className="nav-btn next"
                        onClick={() => handleSlide("next", studentTrackRef, studentOffset, setStudentOffset)}
                    >
                        &#10095;
                    </button>
                </div>
            </div>
        </section>
    );
}

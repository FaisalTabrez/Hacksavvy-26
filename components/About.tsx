export default function About() {
    return (
        <>
            <section id="about" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>About The Event</h2>
                            <p style={{ textAlign: "justify" }}>
                                Join us at HackSavvy, exclusively hosted by the Mahatma Gandhi
                                Institute of Technology, for a premier national-level 24-hour
                                hackathon dedicated to students passionate about advancing the
                                frontiers of innovation. Immerse yourself in the realm of
                                technology, exploring a wide range of themes including
                                Artificial Intelligence (AI), Cybersecurity, Internet of Things
                                (IoT), Machine Learning, Blockchain Technology, Drone
                                Technology, Robotics, and Sustainable Infrastructure. This
                                national event provides a unique platform for students from
                                across the country to engage in deep collaboration, guided by
                                industry experts, to turn innovative ideas into practical
                                solutions. HackSavvy is the ideal stage for students to
                                challenge the status quo, enhance their technical prowess, and
                                achieve significant breakthroughs. Circle the date for an
                                extraordinary experience of learning, growth, and the
                                exhilaration of making a tangible difference through
                                technological innovation at a national scale.
                            </p>
                        </div>
                        <div className="col-lg-2">
                            <div
                                className="about_image bg_cover"
                                style={{
                                    backgroundImage:
                                        "url('https://mgit.ac.in/wp-content/themes/CBIT/hackassets/img/aboutmgit.png')",
                                    height: "400px",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                            <div className="col-lg-6">
                                <p style={{ whiteSpace: "nowrap" }}>
                                    <span style={{ textDecoration: "underline", fontWeight: 600 }}>
                                    Where
                                    </span>
                                    <span>: MGIT, Hyderabad</span>
                                </p>

                                <p style={{ whiteSpace: "nowrap" }}>
                                    <span style={{ textDecoration: "underline", fontWeight: 600 }}>
                                    When
                                    </span>
                                    <span>: Thursday – Friday</span>
                                    <br />
                                    12th – 13th Feb 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about-mgit" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <h2>About MGIT</h2>
                            <p>Knowledge is Power</p>
                            <p style={{ textAlign: "justify" }}>
                                Mahatma Gandhi Institute of Technology (MGIT) has experienced
                                rapid growth since its establishment in 1997 by the Chaitanya
                                Bharathi Educational Society (CBES) in the serene and tranquil
                                surroundings of Gandipet, Hyderabad.
                            </p>
                            <p style={{ textAlign: "justify" }}>
                                MGIT is an autonomous engineering institute accredited by NAAC
                                with A++ grade and approved by AICTE, with several
                                NBA-accredited programs. It is consistently ranked among notable
                                engineering colleges and offers strong placement outcomes with
                                good industry connections.
                            </p>
                            <p style={{ textAlign: "justify" }}>
                                In its two decades and more, all the stakeholders of the
                                Institute, relentlessly endeavoured to position MGIT as a Leader
                                and an Innovator in the ecosystem of technical education. The
                                Institute has established excellent Infrastructure such as
                                state-of-the-art laboratories, spacious library with a
                                collection of printed and digital books & journals, sports &
                                hostel facilities along with Infrastructure for extra and
                                co-curricular engagements in pursuit of academic excellence.
                                MGIT has scaled greater heights both Nationally &
                                Internationally and made its mark in Industry and in academia.
                            </p>
                            <a href="https://mgit.ac.in/" className="buy-tickets">
                                Know More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

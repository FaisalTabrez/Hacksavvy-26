export default function Schedule() {
    return (
        <section id="schedule" className="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Schedule of The Event</h2>
                        <p>
                            Dive into two days of innovative hacking, collaboration, and fun
                            at HackSavvy-26, where technology meets creativity.
                        </p>
                        <a className="buy-tickets scrollto" href="#day-1">
                            Day 1: 12th Feb
                        </a>
                        <a
                            className="buy-tickets scrollto"
                            href="#day-2"
                            style={{ marginLeft: "10px" }}
                        >
                            Day 2: 13th Feb
                        </a>
                        <br />
                        <br />
                        <div id="day-1" className="schedule-item">
                            <h3>Day 1: 12th February 2026</h3>

                            <time>08:00 AM - 09:00 AM</time>
                            <h4>Registration</h4>
                            <p>
                                Main registration opens, marking the beginning of an exciting
                                journey.
                            </p>

                            <time>09:00 AM - 11:00 AM</time>
                            <h4>Hacking Starts!</h4>
                            <p>
                                Participants start coding, bringing their innovative ideas to
                                life.
                            </p>

                            <time>11:00 AM - 01:30 PM</time>
                            <h4>1st Checkpoint</h4>
                            <p>
                                Teams present their progress and receive valuable feedback from
                                mentors.
                            </p>

                            <time>01:30 PM - 02:00 PM</time>
                            <h4>Lunch</h4>
                            <p>
                                A well-deserved break where participants can recharge in batches
                                until 2 PM.
                            </p>

                            <time>03:00 PM - 05:00 PM</time>
                            <h4>2nd Checkpoint</h4>
                            <p>
                                Teams showcase their advancements and tackle any challenges with
                                mentor guidance.
                            </p>

                            <time>05:00 PM - 07:30 PM</time>
                            <h4>Snacks</h4>
                            <p>
                                A quick refreshment break to boost energy levels for continued
                                coding.
                            </p>

                            <time>07:30 PM - 09:30 PM</time>
                            <h4>Dinner</h4>
                            <p>
                                Another opportunity for participants to enjoy a meal in batches
                                until 9:30 PM.
                            </p>

                            <time>09:30 PM - 12:00 AM</time>
                            <h4>1st Round</h4>
                            <p>
                                Initial presentations where teams preview their projects to
                                judges for early feedback.
                            </p>
                            <br />
                            <br />
                        </div>

                        <div id="day-2" className="schedule-item">
                            <h3>Day 2: 13th February 2026</h3>

                            <time>12:00 AM - 02:00 AM</time>
                            <h4>Fun Games</h4>
                            <p>
                                A leisurely break from coding with engaging activities to relax
                                and have fun.
                            </p>

                            <time>02:00 AM - 06:00 AM</time>
                            <h4>Midnight Snack</h4>
                            <p>
                                Coffee, tea, and biscuits served to help maintain focus during
                                the late-night coding sprint.
                            </p>

                            <time>06:00 AM - 07:30 AM</time>
                            <h4>3rd Checkpoint</h4>
                            <p>
                                A crucial time for teams to finalize their projects and prepare
                                for the final presentation.
                            </p>

                            <time>07:30 AM - 09:00 AM</time>
                            <h4>Breakfast</h4>
                            <p>
                                Energizing breakfast served to fuel participants for the final
                                push of the hackathon.
                            </p>

                            <time>09:00 AM - 10:00 AM</time>
                            <h4>Final Round</h4>
                            <p>
                                Teams present their completed projects to judges and peers,
                                showcasing their hard work and innovation.
                            </p>

                            <time>10:00 AM - 11:00 AM</time>
                            <h4>Closing Ceremony</h4>
                            <p>
                                The event wraps up with the announcement of winners,
                                distribution of prizes, and acknowledgments, celebrating the
                                achievements of all participants.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

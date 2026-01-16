"use client";

import { useState } from "react";

export default function Problemstatements() {
    const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

    const togglePS = (id: string) => {
        setOpenStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <>
            {/* Theme 1 Details */}
            <section id="theme1" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>
                                AI, Automation, <br />
                                Robotics & Drone Technology
                            </h2>

                            {/* Problem Statement 1 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps11")}>
                                <h3>
                                    PS-1.1: City-Scale AI-Driven Urban Risk Intelligence System ▾
                                </h3>
                            </div>

                            {/* Hidden content */}
                            <div
                                id="ps11"
                                className="ps-content"
                                style={{ display: openStates["ps11"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Modern urban environments face compound and cascading risks
                                    such as flooding, heatwaves, and air pollution due to climate
                                    change, rapid urbanization, and aging infrastructure.
                                </p>

                                <p>
                                    Participants are required to design an AI-driven early warning
                                    and decision-support system that integrates real-time IoT
                                    data, satellite imagery, historical climate data, and urban
                                    infrastructure information.
                                </p>

                                <h3>Objectives</h3>
                                <p>
                                    • Predict and monitor urban flooding, heatwaves, and air
                                    pollution events
                                </p>
                                <p>• Fuse heterogeneous real-time and historical data sources</p>
                                <p>• Provide explainable insights for policymakers</p>
                                <p>• Support scenario-based policy simulations</p>

                                <h3>Expected Deliverables</h3>
                                <p>• AI/ML models for risk prediction</p>
                                <p>• Interactive decision-support dashboard</p>
                                <p>• Explainability and uncertainty visualization</p>
                                <p>• System architecture and technical documentation</p>
                            </div>

                            {/* Problem Statement 2 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps12")}>
                                <h3>
                                    PS-1.2: Explainable Multi-Modal AI Framework for Medical
                                    Diagnosis ▾
                                </h3>
                            </div>

                            <div
                                id="ps12"
                                className="ps-content"
                                style={{ display: openStates["ps12"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Healthcare AI solutions often fail in resource-constrained
                                    hospitals due to data silos, lack of interpretability, and
                                    fairness concerns. There is a need for a clinically reliable
                                    and explainable AI system that can integrate diverse medical
                                    data while adhering to ethical and regulatory requirements.
                                </p>
                                <p>
                                    Participants must design a multi-modal diagnostic AI framework
                                    integrating medical images, EHRs, lab reports, and wearable
                                    data.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Enable accurate multi-modal medical diagnosis</p>
                                <p>• Ensure model explainability and trust</p>
                                <p>• Detect and mitigate demographic bias</p>
                                <p>• Enable deployment in low-resource settings</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Multi-modal AI diagnostic model</p>
                                <p>• Explainability module (visual/textual)</p>
                                <p>• Bias and fairness evaluation report</p>
                                <p>• Deployment feasibility analysis</p>
                                <p>• Demonstration prototype</p>
                            </div>

                            {/* Problem Statement 3 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps13")}>
                                <h3>
                                    PS-1.3: Multi-Agent Reinforcement Learning for Traffic
                                    Intelligence ▾
                                </h3>
                            </div>

                            <div
                                id="ps13"
                                className="ps-content"
                                style={{ display: openStates["ps13"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Urban traffic systems are dynamic, adversarial, and
                                    multi-agent. Traditional traffic signal control systems fail
                                    to adapt to real-time changes, leading to congestion and
                                    delayed emergency response.
                                </p>
                                <p>
                                    Participants must develop a multi-agent reinforcement learning
                                    (MARL) system to optimize traffic signals, predict accidents,
                                    and prioritize emergency vehicles.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Optimize traffic signal timings dynamically</p>
                                <p>• Predict accident-prone scenarios</p>
                                <p>• Enable emergency vehicle prioritization</p>
                                <p>• Balance local and global traffic objectives</p>
                                <h3>Expected Deliverables</h3>
                                <p>• MARL-based traffic control model</p>
                                <p>• Simulation results and performance metrics</p>
                                <p>• Emergency handling logic</p>
                                <p>• Visualization dashboard</p>
                                <p>• Technical documentation</p>
                            </div>

                            {/* Problem Statement 4 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps14")}>
                                <h3>
                                    PS-1.4: Cross-Platform Misinformation Intelligence System ▾
                                </h3>
                            </div>

                            <div
                                id="ps14"
                                className="ps-content"
                                style={{ display: openStates["ps14"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Misinformation spreads rapidly across platforms using text,
                                    images, videos, and coordinated networks. Manual moderation is
                                    insufficient to detect such campaigns.
                                </p>
                                <p>
                                    Participants must develop a cross-platform misinformation
                                    detection system capable of identifying fake news, deepfakes,
                                    and coordinated disinformation campaigns.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Detect fake news and manipulated media</p>
                                <p>• Identify coordinated disinformation networks</p>
                                <p>• Track content provenance</p>
                                <p>• Support explainable moderation decisions</p>
                                <h3>Expected Deliverables</h3>
                                <p>• NLP and vision-language detection models</p>
                                <p>• Network analysis and visualization</p>
                                <p>• Provenance tracking module</p>
                                <p>• Explainability report</p>
                                <p>• Functional demo</p>
                            </div>

                            {/* Problem Statement 5 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps15")}>
                                <h3>PS-1.5: Autonomous Infrastructure Monitoring via Drones ▾</h3>
                            </div>

                            <div
                                id="ps15"
                                className="ps-content"
                                style={{ display: openStates["ps15"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Manual inspection of infrastructure is costly, slow, and
                                    unsafe. Cities require autonomous drone-based inspection
                                    systems for early detection of structural anomalies.
                                </p>
                                <p>
                                    Participants must design an autonomous drone system for
                                    real-time infrastructure monitoring, anomaly detection, and
                                    reporting.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Perform automated visual inspection</p>
                                <p>• Detect cracks, corrosion, and deformation</p>
                                <p>• Predict maintenance needs</p>
                                <p>• Reduce inspection time and risk</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Drone-based vision model</p>
                                <p>• Structural anomaly detection pipeline</p>
                                <p>• Predictive maintenance analytics</p>
                                <p>• Inspection report generation system</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Theme 2 Details */}
            <section id="theme2" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Cyber Security & Blockchain</h2>
                            {/* Problem Statement 1 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps21")}>
                                <h3>
                                    PS-2.1: Advanced AI-Based Phishing and Social Engineering
                                    Detection Platform ▾
                                </h3>
                            </div>
                            <div
                                id="ps21"
                                className="ps-content"
                                style={{ display: openStates["ps21"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Phishing and social engineering attacks have evolved beyond
                                    simple spam emails to highly targeted, context-aware attacks
                                    exploiting human psychology. Existing detection systems often
                                    fail to identify sophisticated threats such as Business Email
                                    Compromise (BEC), credential harvesting, and
                                    impersonation-based scams.
                                </p>
                                <p>
                                    Design and develop an AI-powered, multi-modal phishing
                                    detection platform capable of analyzing email content, sender
                                    metadata, embedded URLs, webpage structures, and user behavior
                                    patterns to detect and alert users about sophisticated
                                    phishing and social engineering attacks in real time.
                                </p>
                                <h3>Objectives</h3>
                                <p>
                                    • NLP-based intent detection (urgency, fear, authority cues)
                                </p>
                                <p>
                                    • URL lexical analysis, reputation scoring, and webpage
                                    similarity detection
                                </p>
                                <p>
                                    • Sender behavior profiling (domain age, sending frequency,
                                    anomalies)
                                </p>
                                <p>• Explainable AI to justify detection decisions</p>
                                <p>• Integration as a browser plugin with backend microservices</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Functional prototype (plugin + backend)</p>
                                <p>• Detection accuracy evaluation</p>
                                <p>• Explainability reports</p>
                                <p>• Technical documentation and demo video</p>
                            </div>

                            {/* Problem Statement 2 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps22")}>
                                <h3>
                                    PS-2.2: Explainable Multi-Modal AI Framework for Medical
                                    Diagnosis ▾
                                </h3>
                            </div>
                            <div
                                id="ps22"
                                className="ps-content"
                                style={{ display: openStates["ps22"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    IoT ecosystems are highly vulnerable due to weak
                                    authentication, insecure communication, and unmanaged device
                                    lifecycles. Zero-trust principles are required to secure these
                                    environments.
                                </p>
                                <p>
                                    Design a Zero-Trust IoT security framework ensuring
                                    authenticated, encrypted, and continuously verified
                                    communication among devices and backend systems.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Mutual authentication</p>
                                <p>• Device identity lifecycle management</p>
                                <p>• Lightweight cryptographic protocols (ECC, DTLS)</p>
                                <p>• Secure firmware updates</p>
                                <p>• Attack simulation and detection</p>
                                <h3>Constraints</h3>
                                <p>• Secure IoT communication demo</p>
                                <p>• Device trust scoring mechanism</p>
                                <p>• Threat detection alerts</p>
                                <p>
                                    Technology Stack (Indicative): IoT Security, Cryptography,
                                    PKI, Edge Computing
                                </p>
                                <h3>Expected Deliverables</h3>
                                <p>• Secure IoT prototype</p>
                                <p>• Attack simulation results</p>
                                <p>• Documentation and demo</p>
                            </div>

                            {/* Problem Statement 3 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps23")}>
                                <h3>
                                    PS-2.3: Blockchain-Based Self-Sovereign Digital Identity
                                    System ▾
                                </h3>
                            </div>
                            <div
                                id="ps23"
                                className="ps-content"
                                style={{ display: openStates["ps23"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Centralized identity systems expose users to privacy risks and
                                    identity theft. Self-Sovereign Identity (SSI) enables
                                    user-controlled, verifiable digital identities.
                                </p>
                                <p>
                                    Build a blockchain-backed SSI platform that enables users to
                                    create, manage, and verify digital identities using
                                    decentralized identifiers and verifiable credentials.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Decentralized Identifiers (DIDs)</p>
                                <p>• Zero-Knowledge Proof concepts</p>
                                <p>• Selective disclosure mechanisms</p>
                                <p>• Identity revocation and recovery</p>
                                <p>• Smart contract-based verification</p>
                                <h3>Expected Deliverables</h3>
                                <p>• SSI wallet and verifier portal</p>
                                <p>• Smart contract verification logic</p>
                                <p>• Secure, passwordless authentication</p>
                            </div>

                            {/* Problem Statement 4 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps24")}>
                                <h3>
                                    PS-2.4: Real-Time Credit Card Fraud Detection with Explainable
                                    AI ▾
                                </h3>
                            </div>
                            <div
                                id="ps24"
                                className="ps-content"
                                style={{ display: openStates["ps24"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Financial fraud detection systems must balance accuracy,
                                    latency, and transparency. Black-box models hinder trust and
                                    regulatory acceptance.
                                </p>
                                <p>
                                    Develop a real-time fraud detection system capable of
                                    processing streaming transaction data while providing
                                    explainable decisions.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Streaming data processing</p>
                                <p>• Ensemble ML models</p>
                                <p>• Concept drift detection</p>
                                <p>• User behavior profiling</p>
                                <p>• Explainable AI integration</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Fraud detection prototype</p>
                                <p>• Evaluation report</p>
                                <p>• Demo and documentation</p>
                            </div>

                            {/* Problem Statement 5 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps25")}>
                                <h3>
                                    PS-2.5: AI-Driven Automated Incident Response and SOAR
                                    Platform ▾
                                </h3>
                            </div>
                            <div
                                id="ps25"
                                className="ps-content"
                                style={{ display: openStates["ps25"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Manual incident response is slow, error-prone, and
                                    inconsistent. Automated SOAR platforms improve response speed
                                    and consistency.
                                </p>
                                <p>
                                    Develop an AI-assisted Security Orchestration, Automation, and
                                    Response (SOAR) system that automatically generates, executes,
                                    and improves incident response workflows.
                                </p>
                                <h3>Objectives</h3>
                                <p>• NLP-based incident classification</p>
                                <p>• Dynamic playbook generation</p>
                                <p>• Integration with security tools (simulated)</p>
                                <p>• Continuous post-incident learning</p>
                                <p>• Compliance-aligned reporting</p>
                                <h3>Expected Deliverables</h3>
                                <p>• SOAR platform prototype</p>
                                <p>• Incident simulation results</p>
                                <p>• Documentation and demo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Theme 3 Details */}
            <section id="theme3" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>IoT, VLSI & Embedded Systems</h2>
                            {/* Problem Statement 1 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps31")}>
                                <h3>PS-3.1: Edge-AI Wearable Health Monitoring Ecosystem ▾</h3>
                            </div>
                            <div
                                id="ps31"
                                className="ps-content"
                                style={{ display: openStates["ps31"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Continuous physiological monitoring generates sensitive,
                                    high-frequency data. Cloud-only analytics introduce latency
                                    and privacy risks.
                                </p>
                                <p>
                                    Participants must design an Edge-AI enabled wearable health
                                    ecosystem capable of real-time anomaly detection with
                                    privacy-preserving federated learning.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Perform real-time health anomaly detection</p>
                                <p>• Enable privacy-preserving learning</p>
                                <p>• Minimize false alarms</p>
                                <p>• Support automated emergency alerts</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Edge-AI anomaly detection model</p>
                                <p>• Federated learning framework</p>
                                <p>• Emergency alert workflow</p>
                                <p>• System architecture documentation</p>
                                <p>• Demo prototype</p>
                            </div>

                            {/* Problem Statement 2 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps32")}>
                                <h3>PS-3.2: AI-Assisted Rural Telemedicine Platform ▾</h3>
                            </div>
                            <div
                                id="ps32"
                                className="ps-content"
                                style={{ display: openStates["ps32"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Rural healthcare faces doctor shortages, connectivity issues,
                                    and language barriers. AI can bridge this gap by assisting
                                    frontline health workers.
                                </p>
                                <p>
                                    Participants must develop an AI-assisted telemedicine platform
                                    combining voice-based decision support, low-bandwidth imaging,
                                    and vernacular language processing.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Enable AI-assisted clinical decision support</p>
                                <p>• Support local languages and voice interaction</p>
                                <p>• Operate in low-connectivity environments</p>
                                <p>• Improve healthcare accessibility</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Voice-based clinical AI module</p>
                                <p>• Vernacular NLP system</p>
                                <p>• Offline-first system design</p>
                                <p>• Usability evaluation</p>
                                <p>• Prototype demo</p>
                            </div>

                            {/* Problem Statement 3 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps33")}>
                                <h3>PS-3.3: AI-Calibrated Biosensor for Lifestyle Diseases ▾</h3>
                            </div>
                            <div
                                id="ps33"
                                className="ps-content"
                                style={{ display: openStates["ps33"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Early detection of lifestyle and metabolic diseases requires
                                    low-cost, accurate, and noise-resilient biosensors.
                                </p>
                                <p>
                                    Participants must design a biosensor system calibrated using
                                    AI and signal processing, integrated with mobile health
                                    platforms.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Improve accuracy of low-cost biosensors</p>
                                <p>• Detect early disease indicators</p>
                                <p>• Enable mobile health integration</p>
                                <p>• Ensure affordability and usability</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Signal processing and AI calibration model</p>
                                <p>• Mobile health integration</p>
                                <p>• Accuracy and drift analysis</p>
                                <p>• Prototype or simulation</p>
                                <p>• Technical documentation</p>
                            </div>

                            {/* Problem Statement 4 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps4")}>
                                <h3>
                                    PS-3.4: AI-Optimized Electric Vehicle Charging Infrastructure
                                    ▾
                                </h3>
                            </div>
                            <div
                                id="ps4"
                                className="ps-content"
                                style={{ display: openStates["ps4"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    The rapid adoption of electric vehicles (EVs) has increased
                                    pressure on power grids due to uncoordinated charging.
                                    Intelligent charging strategies are required to balance grid
                                    load, reduce peak demand, and improve user experience.
                                </p>
                                <p>
                                    Develop an AI-optimized EV charging infrastructure that
                                    enables smart charging scheduling, dynamic pricing, grid-aware
                                    load balancing, and vehicle-to-grid (V2G) integration.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Grid load and transformer capacity constraints</p>
                                <p>• Uncertain and heterogeneous user charging behavior</p>
                                <p>
                                    • Coordination between EVs, grid operators, and charging
                                    stations
                                </p>
                                <p>• Real-time pricing and demand-response mechanisms</p>
                                <h3>Expected Deliverables</h3>
                                <p>• EV charging optimization prototype</p>
                                <p>• Simulation results under varying demand scenarios</p>
                                <p>• Grid and user dashboards</p>
                                <p>• Technical and deployment documentation</p>
                            </div>

                            {/* Problem Statement 5 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps5")}>
                                <h3>
                                    PS-3.5: AI-Driven IoT-Based Smart Energy Management System ▾
                                </h3>
                            </div>
                            <div
                                id="ps5"
                                className="ps-content"
                                style={{ display: openStates["ps5"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    The rapid adoption of electric vehicles (EVs) has increased
                                    pressure on power grids due to uncoordinated charging.
                                    Intelligent charging strategies are required to balance grid
                                    load, reduce peak demand, and improve user experience.
                                </p>
                                <p>
                                    Develop an AI-optimized EV charging infrastructure that
                                    enables smart charging scheduling, dynamic pricing, grid-aware
                                    load balancing, and vehicle-to-grid (V2G) integration.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Monitor real-time building energy consumption</p>
                                <p>• Predict peak energy usage using AI/ML</p>
                                <p>• Automate energy-saving actions</p>
                                <p>• Reduce energy costs and wastage</p>
                                <h3>Expected Deliverables</h3>
                                <p>• AI-based energy prediction models</p>
                                <p>• IoT-enabled monitoring system</p>
                                <p>• Automated energy optimization strategies</p>
                                <p>• Interactive dashboard and documentation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Theme 4 Details */}
            <section id="theme4" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Sustainability & Environment</h2>
                            {/* Problem Statement 1 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps41")}>
                                <h3>PS-4.1: Intelligent AI-Powered Rural Microgrid System ▾</h3>
                            </div>
                            <div
                                id="ps41"
                                className="ps-content"
                                style={{ display: openStates["ps41"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Rural and remote regions across India continue to face
                                    unreliable, intermittent, or inadequate access to electricity.
                                    Hybrid microgrids integrating renewable energy sources such as
                                    solar, wind, biomass, and energy storage provide a sustainable
                                    solution; however, effective operation is challenged by
                                    intermittent generation, variable demand patterns,
                                    affordability constraints, and limited infrastructure.
                                </p>
                                <p>
                                    Design and develop an AI-powered rural microgrid management
                                    system that intelligently optimizes hybrid energy sources,
                                    predicts rural energy demand, and ensures reliable,
                                    affordable, and sustainable electricity access for rural
                                    communities.
                                </p>
                                <h3>Objectives</h3>
                                <p>
                                    • Optimize the utilization of multiple renewable energy
                                    sources
                                </p>
                                <p>
                                    • Forecast rural energy demand under uncertain usage patterns
                                </p>
                                <p>• Improve reliability and reduce power outages</p>
                                <p>• Ensure affordability and energy equity</p>
                                <p>
                                    • Support scalable deployment in low-infrastructure
                                    environments
                                </p>
                                <h3>Expected Deliverables</h3>
                                <p>• AI-based energy demand forecasting module</p>
                                <p>• Hybrid microgrid optimization and control logic</p>
                                <p>• Simulation or prototype of microgrid operation</p>
                                <p>• Reliability and affordability impact analysis</p>
                                <p>• Technical documentation and demonstration</p>
                            </div>

                            {/* Problem Statement 2 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps42")}>
                                <h3>
                                    PS-4.2: Enterprise-Scale Carbon Footprint Intelligence and ESG
                                    Analytics Platform ▾
                                </h3>
                            </div>
                            <div
                                id="ps42"
                                className="ps-content"
                                style={{ display: openStates["ps42"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Organizations are increasingly required to measure, monitor,
                                    and reduce their carbon emissions while complying with
                                    evolving Environmental, Social, and Governance (ESG)
                                    regulations. Existing systems struggle with fragmented data
                                    sources, manual reporting, and lack of real-time actionable
                                    insights.
                                </p>
                                <p>
                                    Design a scalable carbon footprint intelligence platform that
                                    enables real-time emissions tracking, lifecycle assessment,
                                    ESG analytics, and regulatory compliance reporting across
                                    enterprise operations.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Enable real-time carbon emission monitoring</p>
                                <p>• Perform lifecycle-based emission assessments</p>
                                <p>• Support ESG reporting and regulatory compliance</p>
                                <p>
                                    • Provide actionable sustainability insights for
                                    decision-makers
                                </p>
                                <p>• Scale across departments, locations, and supply chains</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Carbon analytics and emission tracking engine</p>
                                <p>• ESG dashboards and compliance reports</p>
                                <p>• Lifecycle assessment module</p>
                                <p>• Decision-support insights for sustainability planning</p>
                                <p>• Platform prototype and technical documentation</p>
                            </div>

                            {/* Problem Statement 3 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps43")}>
                                <h3>PS-4.3: Autonomous AI-Robotic Waste Management System ▾</h3>
                            </div>
                            <div
                                id="ps43"
                                className="ps-content"
                                style={{ display: openStates["ps43"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Urban waste management systems face inefficiencies due to
                                    manual segregation, contamination of recyclable materials, and
                                    lack of real-time environmental impact assessment. These
                                    challenges lead to poor recycling outcomes and increased
                                    landfill usage.
                                </p>
                                <p>
                                    Design an autonomous AI-robotic waste management system
                                    capable of real-time waste classification, automated sorting,
                                    and optimization of recycling and disposal decisions while
                                    quantifying environmental and carbon footprint impacts.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Develop AI models for real-time waste classification</p>
                                <p>• Automate waste segregation using robotic systems</p>
                                <p>• Optimize recycling versus landfill decisions</p>
                                <p>• Quantify and visualize carbon footprint reduction</p>
                                <p>
                                    • Improve efficiency and sustainability of urban waste
                                    handling
                                </p>
                                <h3>Expected Deliverables</h3>
                                <p>• AI-based waste classification model</p>
                                <p>• Robotic sorting simulation or prototype</p>
                                <p>• Recycling optimization logic</p>
                                <p>• Carbon impact analytics dashboard</p>
                                <p>• System architecture and technical documentation</p>
                            </div>

                            {/* Problem Statement 4 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps44")}>
                                <h3>
                                    PS-4.4: AI-Based Renewable Energy Forecasting and Grid
                                    Optimization System ▾
                                </h3>
                            </div>
                            <div
                                id="ps44"
                                className="ps-content"
                                style={{ display: openStates["ps44"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    The rapid integration of renewable energy sources such as
                                    solar and wind has introduced significant uncertainty into
                                    power grid operations. Variability in weather patterns,
                                    fluctuating demand, and limited storage capacity pose
                                    challenges to grid stability, energy reliability, and carbon
                                    reduction goals. Traditional forecasting and control
                                    mechanisms are inadequate to handle these complexities in real
                                    time.
                                </p>
                                <p>
                                    Design and develop an AI-driven renewable energy forecasting
                                    and grid optimization system that integrates weather data,
                                    renewable generation data, and energy storage information to
                                    improve grid stability, optimize energy utilization, and
                                    minimize carbon emissions.
                                </p>
                                <h3>Objectives</h3>
                                <p>
                                    • Stochastic and non-linear weather patterns affecting
                                    renewable generation
                                </p>
                                <p>
                                    • Grid stability constraints under high renewable penetration
                                </p>
                                <p>• Energy storage optimization under demand uncertainty</p>
                                <p>
                                    • Carbon-aware decision-making aligned with regulatory
                                    policies
                                </p>
                                <p>• Scalability across regional and national grid levels</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Functional forecasting and optimization prototype</p>
                                <p>• Simulation results under varying grid scenarios</p>
                                <p>• Carbon reduction and efficiency analysis</p>
                                <p>• Technical documentation and demonstration video</p>
                            </div>

                            {/* Problem Statement 5 */}
                            <div className="ps-dropdown" onClick={() => togglePS("ps45")}>
                                <h3>
                                    PS-4.5: AI-Driven Waste-to-Energy Optimization System ▾
                                </h3>
                            </div>
                            <div
                                id="ps45"
                                className="ps-content"
                                style={{ display: openStates["ps45"] ? "block" : "none" }}
                            >
                                <h3>Problem Statement</h3>
                                <p>
                                    Waste-to-energy (WtE) plants face operational inefficiencies
                                    due to inconsistent waste composition and suboptimal process
                                    control. Intelligent characterization and optimization are
                                    required to improve energy recovery and support circular
                                    economy goals.
                                </p>
                                <p>
                                    Design an AI-driven waste-to-energy system that characterizes
                                    biomass feedstock, optimizes conversion processes, and
                                    maximizes energy output while minimizing environmental impact.
                                </p>
                                <h3>Objectives</h3>
                                <p>• Variability in waste composition and quality</p>
                                <p>• Process inefficiencies and energy losses</p>
                                <p>• Accurate prediction of energy yield</p>
                                <p>• Integration with circular economy objectives</p>
                                <h3>Expected Deliverables</h3>
                                <p>• Functional prototype or simulation</p>
                                <p>• Biomass classification and optimization results</p>
                                <p>• Energy efficiency and sustainability report</p>
                                <p>• Documentation and demo video</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Theme 5 Details */}
            <section id="theme5" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Guidelines for Open Innovation Hackathon</h2>
                            <h3>Problem Statement:</h3>
                            <p>
                                • Teams must clearly define a real-world problem they aim to
                                solve.
                            </p>
                            <p>
                                • The problem statement may be from any industry or sector, but it must be original and not mentioned above.
                            </p>
                            <p>
                                • The problem should demonstrate relevance, urgency, or
                                potential future impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
);
}

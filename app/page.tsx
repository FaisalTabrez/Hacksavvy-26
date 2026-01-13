import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Themes from "@/components/Themes";
import About from "@/components/About";
import Leaders from "@/components/Leaders";
import Guidelines from "@/components/Guidelines";
import Schedule from "@/components/Schedule";
import Team from "@/components/Team";
import Projects from "@/components/Projects";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Themes />
      <About />
      <Leaders />
      <Guidelines />
      <Schedule />
      <Team />
      <FAQ />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

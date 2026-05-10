import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CrimeBoard from "@/components/CrimeBoard";
import CaseFiles from "@/components/CaseFiles";
import Skills from "@/components/Skills";
import StatusPage from "@/components/StatusPage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CrimeBoard />
      <CaseFiles />
      <Skills />
      <StatusPage />
      <Contact />
      <Footer />
      <Terminal />
    </main>
  );
}

import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Lectures from "@/components/Lectures";
import TrackRecord from "@/components/TrackRecord";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LenisProvider>
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Lectures />
        <TrackRecord />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  );
}

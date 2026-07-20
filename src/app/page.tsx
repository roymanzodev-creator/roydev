import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

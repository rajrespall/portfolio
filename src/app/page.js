"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      
      <main>
        <Hero />
        <ProjectsSection />
        <TechStackSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
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
  const [theme, setTheme] = useState("9009");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_theme") || "9009";
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } catch (e) {
      // Ignore local storage error
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem("portfolio_theme", newTheme);
    } catch (e) {
      // Ignore local storage error
    }
  };

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
        currentTheme={theme}
        onSelectTheme={handleThemeChange}
      />
    </div>
  );
}

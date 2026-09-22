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
import SnakeGame from "@/components/SnakeGame";
import Game2048 from "@/components/Game2048";

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

        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4rem',
          padding: '4rem 0'
        }}>
          <div className="container" style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              fontSize: '1.5rem',
              letterSpacing: '0.1em'
            }}>
              MINI_GAMES
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem'
            }}>
              <SnakeGame />
              <Game2048 />
            </div>
          </div>
        </section>

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

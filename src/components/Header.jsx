"use client";

import { useState } from "react";
import styles from "./Header.module.css";

export default function Header({ onOpenCommandPalette }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Top left empty slot */}
        <div className={styles.leftSlot} />

        {/* Clean minimal navigation */}
        <nav className={styles.nav} aria-label="Main Navigation">
          <a href="#works" className={styles.navLink}>Works</a>
          <a href="#stack" className={styles.navLink}>Stack</a>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cmdTrigger}
            onClick={onOpenCommandPalette}
            aria-label="Open Command Menu"
          >
            <span>Search</span>
            <kbd className={styles.kbd}>⌘K</kbd>
          </button>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}>
        <a href="#works" className={styles.mobileNavLink} onClick={closeMobileMenu}>Works</a>
        <a href="#stack" className={styles.mobileNavLink} onClick={closeMobileMenu}>Stack</a>
        <a href="#about" className={styles.mobileNavLink} onClick={closeMobileMenu}>About</a>
        <a href="#contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>Contact</a>
      </div>
    </header>
  );
}

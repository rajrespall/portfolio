"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CommandPalette.module.css";

export default function CommandPalette({ isOpen, onClose, currentTheme = "9009", onSelectTheme }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateTo = (hash) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText("rajeshtecsonrespall@gmail.com");
    }
    onClose();
  };

  const setThemeMode = (mode) => {
    if (onSelectTheme) {
      onSelectTheme(mode);
    } else {
      document.documentElement.setAttribute("data-theme", mode);
      try {
        localStorage.setItem("portfolio_theme", mode);
      } catch (e) {}
    }
    onClose();
  };

  const openGithub = () => {
    window.open("https://github.com/rajrespall", "_blank");
    onClose();
  };

  const openLinkedin = () => {
    window.open("https://www.linkedin.com/in/rajesh-respall-701a67367?utm_source=share_via&utm_content=profile&utm_medium=member_android", "_blank");
    onClose();
  };

  const openFacebook = () => {
    window.open("https://www.facebook.com/rajesh.tecsonrespall", "_blank");
    onClose();
  };

  const allItems = [
    { type: "nav", label: "01 / Selected Works (GitHub Repos)", hash: "#works", badge: "Navigation" },
    { type: "nav", label: "02 / Stack & Capabilities", hash: "#stack", badge: "Navigation" },
    { type: "nav", label: "03 / Philosophy & Trajectory", hash: "#about", badge: "Navigation" },
    { type: "nav", label: "04 / Inquiries & Contact", hash: "#contact", badge: "Navigation" },
    { type: "action", label: "Open GitHub Profile (github.com/rajrespall)", action: openGithub, badge: "External" },
    { type: "action", label: "Open LinkedIn Profile", action: openLinkedin, badge: "External" },
    { type: "action", label: "Open Facebook Profile", action: openFacebook, badge: "External" },
    { type: "action", label: "Copy Direct Email (rajeshtecsonrespall@gmail.com)", action: copyEmail, badge: "Action" },
    { type: "theme", label: "Palette: 9009 Retro Keycap (Default Light)", mode: "9009", badge: currentTheme === "9009" ? "Active" : "Theme" },
    { type: "theme", label: "Palette: Stealth Matte (Dark)", mode: "dark", badge: currentTheme === "dark" || currentTheme === "stealth" ? "Active" : "Theme" },
  ];

  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Type command, palette, or search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className={styles.escKbd}>ESC</kbd>
        </div>

        <div className={styles.list}>
          <div className={styles.groupLabel}>Quick Commands & Palettes</div>
          {filteredItems.length === 0 ? (
            <div style={{ padding: "20px", color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center" }}>
              No matching commands
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className={styles.item}
                onClick={() => {
                  if (item.type === "nav") navigateTo(item.hash);
                  if (item.type === "action") item.action();
                  if (item.type === "theme") setThemeMode(item.mode);
                }}
              >
                <div className={styles.itemLeft}>
                  <span>{item.label}</span>
                </div>
                <span className={styles.itemBadge}>{item.badge}</span>
              </button>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <span>{currentTheme === "9009" ? "9009 vintage console" : "stealth navigation console"}</span>
          <div className={styles.footerDots}>
            <span className={styles.footerDot} style={{ background: "var(--theme-dot-1)" }} />
            <span className={styles.footerDot} style={{ background: "var(--theme-dot-2)" }} />
            <span className={styles.footerDot} style={{ background: "var(--theme-dot-3)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

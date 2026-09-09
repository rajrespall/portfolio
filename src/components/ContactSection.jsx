"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const email = "architect@stealth.io";

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.sectionIndex}>04 / Inquiries & Contact</span>
          <h2 className={styles.sectionTitle}>Initiate Contact</h2>
        </div>

        <div className={styles.layout}>
          {/* Information & Direct Channels */}
          <div className={styles.infoCol}>
            <p className={styles.infoText}>
              Available for select principal architecture advisory, mission-critical systems engineering,
              and design system consulting.
            </p>

            {/* Interactive Email Copy Card */}
            <div
              className={styles.emailCard}
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              aria-label="Click to copy email"
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCopyEmail(); }}
            >
              <div className={styles.emailContent}>
                <span className={styles.emailLabel}>Direct Dispatch</span>
                <span className={styles.emailAddress}>{email}</span>
              </div>
              <span className={styles.copyBadge}>
                {copied ? "Copied ✓" : "Copy"}
              </span>
            </div>

            {/* Minimal Social & Verification Channels */}
            <div className={styles.socialList}>
              <a
                href="https://github.com/rajrespall"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span>github.com/rajrespall</span>
                <span className={styles.socialArrow}>→</span>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span>x.com/stealth_arch</span>
                <span className={styles.socialArrow}>→</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span>linkedin.com/in/stealth</span>
                <span className={styles.socialArrow}>→</span>
              </a>

              <div className={styles.socialLink} style={{ color: "var(--text-muted)", cursor: "default" }}>
                <span>PGP: 4A8F B012 99E2 71C4</span>
              </div>
            </div>
          </div>

          {/* Minimalist Message Console */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {submitted ? (
              <div className={styles.successMessage}>
                Transmission received. Your message has been logged. Response time is typically within 24 hours.
              </div>
            ) : (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-name" className={styles.label}>Identity / Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className={styles.input}
                    placeholder="Ada Lovelace"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-email" className={styles.label}>Electronic Mail</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className={styles.input}
                    placeholder="ada@domain.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-message" className={styles.label}>Message / Scope</label>
                  <textarea
                    id="contact-message"
                    required
                    className={styles.textarea}
                    placeholder="Brief outline of architecture or advisory request..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span>Send Message</span>
                  <span>→</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const email = "rajeshtecsonrespall@gmail.com";

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
              Available for internal systems development, full-stack web applications,
              and software engineering opportunities.
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

            {/* Minimal Social Channels */}
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
                href="https://www.linkedin.com/in/rajesh-respall-701a67367?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span>linkedin.com/in/rajesh-respall</span>
                <span className={styles.socialArrow}>→</span>
              </a>

              <a
                href="https://www.facebook.com/rajesh.tecsonrespall"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span>facebook.com/rajesh.tecsonrespall</span>
                <span className={styles.socialArrow}>→</span>
              </a>
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

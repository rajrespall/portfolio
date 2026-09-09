"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.bottomRow}>
          <span>© {new Date().getFullYear()} Rajesh Respall. Built with React & Next.js.</span>

          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

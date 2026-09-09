import styles from "./Hero.module.css";

export default function Hero() {
  const metrics = [
    { value: "11", label: "Open source GitHub repositories" },
    { value: "MERN / React", label: "Primary interface stack" },
    { value: "Full-Stack", label: "Systems & Web Architecture" },
    { value: "< 15ms", label: "Interface latency budget" },
  ];

  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        {/* Meta details: discreet and clean */}
        <div className={styles.metaRow}>
          <span className={styles.disciplineTag}>Full-Stack Developer & Software Engineer</span>
          <span className={styles.location}>Remote / Available</span>
        </div>

        {/* Minimalist headline */}
        <h1 className={styles.title}>
          Building robust web platforms, internal systems, and{" "}
          <span className={styles.titleAccent}>software applications.</span>
        </h1>

        {/* Description */}
        <p className={styles.description}>
          Internal System Developer specializing in full-stack web architectures and custom
          software applications. Focused on engineering dependable, user-centric solutions that
          streamline operations and drive workflow productivity.
        </p>

        {/* Action Triggers */}
        <div className={styles.actions}>
          <a href="#works" className={styles.primaryBtn}>
            <span>Explore Works</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M12 4v14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            <span>Get in touch</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Minimalist metrics */}
        <div className={styles.metricsGrid}>
          {metrics.map((item, idx) => (
            <div key={idx} className={styles.metricItem}>
              <span className={styles.metricValue}>{item.value}</span>
              <span className={styles.metricLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

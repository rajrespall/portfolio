import styles from "./AboutSection.module.css";

const TIMELINE = [
  {
    period: "July 2026 — Present",
    role: "Internal System Developer",
    company: "Omon Group Inc.",
    description: "Developed and engineered several internal systems, robust web platforms, and tailored software applications to power organizational workflows and core operational infrastructure.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.sectionIndex}>03 / About & Trajectory</span>
          <h2 className={styles.sectionTitle}>Philosophy & Background</h2>
        </div>

        <div className={styles.layout}>
          {/* Philosophy Column */}
          <div className={styles.philosophyBlock}>
            <h3 className={styles.subHeading}>Philosophy of Subtraction</h3>
            <p className={styles.paragraph}>
              True minimalism is not merely the absence of ornament; it is the presence
              of absolute intentionality. In software architecture and user experience,
              every extra abstraction, dependency, or visual element taxes comprehension and resilience.
            </p>
            <p className={styles.paragraph}>
              I believe in building software that operates quietly in the background—resilient,
              deterministic, and uncompromising in execution. My engineering approach treats
              clarity and performance as primary design requirements rather than afterthoughts.
            </p>

            <div className={styles.quoteBox}>
              "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
            </div>
          </div>

          {/* Experience Timeline Column */}
          <div>
            <h3 className={`${styles.subHeading} ${styles.mobileMargin}`} style={{ marginBottom: "24px" }}>
              Trajectory
            </h3>
            <div className={styles.timeline}>
              {TIMELINE.map((item, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineNode} />
                  <span className={styles.timelinePeriod}>{item.period}</span>
                  <div className={styles.timelineRole}>{item.role}</div>
                  <div className={styles.timelineCompany}>{item.company}</div>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

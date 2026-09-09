import styles from "./TechStackSection.module.css";

const STACK_DOMAINS = [
  {
    index: "01",
    title: "Full-Stack & Languages",
    items: [
      { name: "JavaScript (ES6+)", context: "Async patterns, event loops, DOM APIs, React internals" },
      { name: "PHP & Laravel", context: "MVC structure, Eloquent ORM, auth middleware, routing" },
      { name: "Node.js & Express", context: "RESTful microservices, JWT authentication, pipeline middleware" },
      { name: "Python", context: "System file monitors, automation daemons, process watching" },
      { name: "Motoko", context: "Internet Computer smart contracts, canister architecture" },
    ],
  },
  {
    index: "02",
    title: "Frontend & UI Engineering",
    items: [
      { name: "React & Next.js", context: "Component lifecycle, custom hooks, SPA architecture, SSR" },
      { name: "Interactive Game Engines", context: "Memory cards, puzzle drag-and-drop, audio matching" },
      { name: "HTML5 Canvas & Web Audio", context: "Dynamic digital coloring, sound synthesis & effects" },
      { name: "CSS Architecture", context: "Vanilla CSS, CSS modules, design tokens, modern dark mode" },
      { name: "Bootstrap & Responsive UI", context: "Mobile-first layouts, semantic markup, cross-browser" },
    ],
  },
  {
    index: "03",
    title: "Backend, Data & Cloud",
    items: [
      { name: "MongoDB & Mongoose", context: "Document schema design, indexing, MERN stack integration" },
      { name: "MySQL & Relational DBs", context: "Normalized schemas, migrations, foreign key constraints" },
      { name: "RESTful API Design", context: "Strict input validation, error handling, CORS headers" },
      { name: "Authentication & Security", context: "Bcrypt hashing, token sessions, role-based permissions" },
      { name: "Git & Version Control", context: "Multi-repo management, clean commits, GitHub workflows" },
    ],
  },
  {
    index: "04",
    title: "Engineering Disciplines",
    items: [
      { name: "Internal Systems Architecture", context: "Tailored business applications & operational tooling" },
      { name: "End-to-End MERN Delivery", context: "Full lifecycle e-commerce & interactive educational suites" },
      { name: "Automated System Monitoring", context: "Event-driven directory surveillance & real-time alerts" },
      { name: "Decentralized Protocols", context: "Web3 canister state execution on blockchain runtimes" },
      { name: "Clean & Maintainable Code", context: "Modular separation of concerns, DRY patterns, reliability" },
    ],
  },
];

export default function TechStackSection() {
  return (
    <section id="stack" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.sectionIndex}>02 / Stack & Capabilities</span>
          <h2 className={styles.sectionTitle}>Technical Architecture & Competencies</h2>
        </div>

        <div className={styles.grid}>
          {STACK_DOMAINS.map((domain) => (
            <div key={domain.index} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{domain.title}</h3>
                <span className={styles.cardIndex}>{domain.index}</span>
              </div>

              <div className={styles.itemList}>
                {domain.items.map((item) => (
                  <div key={item.name} className={styles.itemRow}>
                    <div className={styles.itemName}>
                      <span className={styles.dotIndicator} />
                      <span>{item.name}</span>
                    </div>
                    <span className={styles.itemContext}>{item.context}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

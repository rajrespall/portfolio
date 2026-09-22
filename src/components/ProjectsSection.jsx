"use client";

import { useState, useEffect } from "react";
import styles from "./ProjectsSection.module.css";

const LANG_COLORS = {
  JavaScript: "#c9b037",
  TypeScript: "#4f759b",
  PHP: "#5f6c8d",
  Motoko: "#498ba3",
  HTML: "#a35d47",
  Python: "#457297",
  Rust: "#8a5843",
  Go: "#3c869b",
  Default: "#586173",
};

function categorizeRepo(repo) {
  const name = (repo.name || "").toLowerCase();
  const lang = (repo.language || "").toLowerCase();
  if (lang === "motoko" || name.includes("blockchain")) return "Blockchain";
  if (lang === "php" || name.includes("laravel")) return "Backend";
  if (name.includes("mern")) return "Full-Stack";
  if (name.includes("react") || lang === "javascript" || lang === "typescript") return "Frontend";
  return "Engineering";
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [cloneCopied, setCloneCopied] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        setError(null);

        // Check for cached data first
        const cached = localStorage.getItem("portfolio_repos");
        const cacheTimestamp = localStorage.getItem("portfolio_repos_timestamp");
        const ONE_DAY = 24 * 60 * 60 * 1000;

        if (cached && cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < ONE_DAY) {
          setRepos(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch("https://api.github.com/users/rajrespall/repos?sort=updated&per_page=100", {
          headers: { Accept: "application/vnd.github.v3+json" },
        });

        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          }
          throw new Error(`GitHub API request returned status ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped = data
            .filter((r) => !r.fork || r.stargazers_count > 0)
            .map((r) => ({
              id: r.id,
              name: r.name,
              description: r.description || "Software repository on GitHub.",
              language: r.language || "Code",
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              updatedAt: r.updated_at,
              url: r.html_url,
              topics: r.topics || [],
              category: categorizeRepo(r),
              defaultBranch: r.default_branch || "main",
            }));

          setRepos(mapped);
          // Cache the result
          localStorage.setItem("portfolio_repos", JSON.stringify(mapped));
          localStorage.setItem("portfolio_repos_timestamp", Date.now().toString());
        }
      } catch (err) {
        console.error("Failed to load GitHub repositories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const categories = ["All", "Full-Stack", "Frontend", "Backend", "Blockchain"];

  const filteredProjects = activeCategory === "All"
    ? repos
    : repos.filter((p) => p.category === activeCategory);

  const handleCopyClone = (cmd) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(cmd);
      setCloneCopied(true);
      setTimeout(() => setCloneCopied(false), 2000);
    }
  };

  return (
    <section id="works" className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.sectionTitleGroup}>
            <div className={styles.metaStatusRow}>
              <span className={styles.sectionIndex}>01 / Selected Repositories</span>
              <span className={styles.syncBadge}>
                <span className={`${styles.syncDot} ${styles.live}`} />
                <span>github.com/rajrespall // {repos.length} repos</span>
              </span>
            </div>
            <h2 className={styles.sectionTitle}>Open Source & Systems</h2>
          </div>

          <div className={styles.filterGroup}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className={styles.grid}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.skeletonCard} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && repos.length === 0 && (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
            Unable to reach GitHub API directly ({error}). Please check your connection or GitHub API limits.
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && (
          <div className={styles.grid}>
            {filteredProjects.map((project) => {
              const langColor = LANG_COLORS[project.language] || LANG_COLORS.Default;
              const formattedDate = project.updatedAt
                ? new Date(project.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                : "Active";

              return (
                <article key={project.id || project.name} className={styles.card}>
                  <div className={styles.cardMeta}>
                    <div className={styles.langBadge}>
                      <span
                        className={styles.langDot}
                        style={{ backgroundColor: langColor }}
                      />
                      <span>{project.language}</span>
                    </div>
                    <span className={styles.cardYear}>{formattedDate}</span>
                  </div>

                  <h3 className={styles.cardTitle}>
                    <span>{project.name}</span>
                  </h3>

                  <p className={styles.cardSummary}>{project.description}</p>

                  {/* Telemetry row */}
                  <div className={styles.statsRow}>
                    <span className={styles.statItem}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className={styles.statValue}>{project.stars || 0}</span>
                    </span>

                    <span className={styles.statItem}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="6" y1="3" x2="6" y2="15" />
                        <circle cx="18" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <path d="M18 9a9 9 0 0 1-9 9" />
                      </svg>
                      <span className={styles.statValue}>{project.forks || 0}</span>
                    </span>

                    <span className={styles.statItem}>
                      <span style={{ color: "var(--stealth-accent)" }}>//</span>
                      <span>{project.category}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  {project.topics && project.topics.length > 0 && (
                    <div className={styles.tagsRow}>
                      {project.topics.slice(0, 4).map((tag) => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.detailTrigger}
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>Inspect Repository</span>
                      <span>→</span>
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <span>github</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Repository Detail Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className={styles.modalHeader}>
              <span className={styles.modalCategory}>
                {selectedProject.category} // {selectedProject.language}
              </span>
              <h3 className={styles.modalTitle}>{selectedProject.name}</h3>
              <p className={styles.modalText}>{selectedProject.description}</p>
            </div>

            {/* Quick Clone Terminal Box */}
            <div className={styles.modalSection}>
              <h4 className={styles.modalSectionHeading}>Clone Repository</h4>
              <div className={styles.cloneBox}>
                <code className={styles.cloneText}>
                  git clone {selectedProject.url}.git
                </code>
                <button
                  type="button"
                  className={styles.cloneBtn}
                  onClick={() => handleCopyClone(`git clone ${selectedProject.url}.git`)}
                >
                  {cloneCopied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className={styles.modalSection}>
              <h4 className={styles.modalSectionHeading}>Repository Metadata</h4>
              <ul className={styles.modalSpecsList}>
                <li className={styles.modalSpecItem}>
                  <span className={styles.modalSpecKey}>Language</span>
                  <span className={styles.modalSpecVal}>{selectedProject.language}</span>
                </li>
                <li className={styles.modalSpecItem}>
                  <span className={styles.modalSpecKey}>Stars / Watchers</span>
                  <span className={styles.modalSpecVal}>{selectedProject.stars || 0}</span>
                </li>
                <li className={styles.modalSpecItem}>
                  <span className={styles.modalSpecKey}>Forks</span>
                  <span className={styles.modalSpecVal}>{selectedProject.forks || 0}</span>
                </li>
                <li className={styles.modalSpecItem}>
                  <span className={styles.modalSpecKey}>Default Branch</span>
                  <span className={styles.modalSpecVal}>{selectedProject.defaultBranch || "main"}</span>
                </li>
                <li className={styles.modalSpecItem}>
                  <span className={styles.modalSpecKey}>Origin URL</span>
                  <span className={styles.modalSpecVal}>github.com/rajrespall/{selectedProject.name}</span>
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className={styles.modalActions}>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalActionBtn}
              >
                <span>Open in GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

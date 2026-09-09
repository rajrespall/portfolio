import { NextResponse } from "next/server";

// Fallback repositories in case of GitHub API rate limit (403)
const FALLBACK_REPOS = [
  {
    id: 1,
    name: "sip-and-scripts-mern",
    description: "Modern e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) featuring secure authentication, cart workflows, and payment integration.",
    language: "JavaScript",
    stars: 3,
    forks: 1,
    updatedAt: "2025-03-01T07:21:30Z",
    url: "https://github.com/rajrespall/sip-and-scripts-mern",
    topics: ["mern", "ecommerce", "react", "node"],
    category: "Full-Stack",
  },
  {
    id: 2,
    name: "wonderland-mern",
    description: "Interactive educational game suite & learning platform powered by MERN architecture and modular React components.",
    language: "JavaScript",
    stars: 2,
    forks: 1,
    updatedAt: "2025-06-20T06:28:49Z",
    url: "https://github.com/rajrespall/wonderland-mern",
    topics: ["mern", "interactive", "react"],
    category: "Full-Stack",
  },
  {
    id: 3,
    name: "wondercards-react",
    description: "Memory and cognitive card matching game component engineered for high-performance React client-side state management.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updatedAt: "2025-03-27T02:55:57Z",
    url: "https://github.com/rajrespall/wondercards-react",
    topics: ["react", "game", "ui"],
    category: "Frontend",
  },
  {
    id: 4,
    name: "wondercolor-react",
    description: "Interactive digital canvas and coloring application featuring responsive touch/mouse event handling in React.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updatedAt: "2025-03-27T02:55:42Z",
    url: "https://github.com/rajrespall/wondercolor-react",
    topics: ["react", "canvas"],
    category: "Frontend",
  },
  {
    id: 5,
    name: "wondermatch-react",
    description: "Audio-visual sensory matching game integrating HTML5 Web Audio and dynamic image asset synchronization.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updatedAt: "2025-03-27T02:55:31Z",
    url: "https://github.com/rajrespall/wondermatch-react",
    topics: ["react", "audio"],
    category: "Frontend",
  },
  {
    id: 6,
    name: "wonderpuz-react",
    description: "Jigsaw puzzle engine implementing drag-and-drop grid snapping and state verification in React.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updatedAt: "2025-03-27T02:56:05Z",
    url: "https://github.com/rajrespall/wonderpuz-react",
    topics: ["react", "puzzle"],
    category: "Frontend",
  },
  {
    id: 7,
    name: "bloom-laravel",
    description: "Robust enterprise backend service featuring authentication, multi-layered middleware, and relational database schema design.",
    language: "PHP",
    stars: 0,
    forks: 0,
    updatedAt: "2025-03-01T08:28:48Z",
    url: "https://github.com/rajrespall/bloom-laravel",
    topics: ["laravel", "php", "backend"],
    category: "Backend",
  },
  {
    id: 8,
    name: "eshop_blockchain",
    description: "Decentralized e-commerce smart contract protocol implemented in Motoko on the Internet Computer (ICP) ecosystem.",
    language: "Motoko",
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-23T14:20:38Z",
    url: "https://github.com/rajrespall/eshop_blockchain",
    topics: ["blockchain", "motoko", "icp"],
    category: "Blockchain",
  },
  {
    id: 9,
    name: "file-monitoring-python",
    description: "Automated file system monitoring daemon and directory watcher with real-time change event notifications.",
    language: "JavaScript",
    stars: 1,
    forks: 1,
    updatedAt: "2024-12-07T03:35:50Z",
    url: "https://github.com/rajrespall/file-monitoring-python",
    topics: ["automation", "monitoring"],
    category: "Tooling",
  },
  {
    id: 10,
    name: "ParishConnect-laravel",
    description: "Community and member engagement portal providing record management, event scheduling, and administrative dashboards.",
    language: "PHP",
    stars: 0,
    forks: 0,
    updatedAt: "2025-03-01T08:29:10Z",
    url: "https://github.com/rajrespall/ParishConnect-laravel",
    topics: ["laravel", "portal"],
    category: "Backend",
  },
];

function categorizeRepo(repo) {
  const name = repo.name.toLowerCase();
  const lang = (repo.language || "").toLowerCase();
  if (lang === "motoko" || name.includes("blockchain")) return "Blockchain";
  if (lang === "php" || name.includes("laravel")) return "Backend";
  if (name.includes("mern")) return "Full-Stack";
  if (name.includes("react") || lang === "javascript" || lang === "typescript") return "Frontend";
  return "Engineering";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "rajrespall";

  try {
    const headers = {
      "User-Agent": "StealthPortfolioApp/1.0",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      {
        headers,
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, falling back to curated data`);
      return NextResponse.json({
        source: "fallback",
        username,
        repos: FALLBACK_REPOS,
      });
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({
        source: "fallback",
        username,
        repos: FALLBACK_REPOS,
      });
    }

    // Filter out forks or keep all non-empty repos, sorted by recent activity
    const repos = data
      .filter((r) => !r.fork || r.stargazers_count > 0)
      .map((r) => {
        // Provide intelligent fallback descriptions if GitHub repo description is empty
        const defaultDescriptions = {
          eshop_blockchain: "Decentralized e-commerce smart contracts written in Motoko on the Internet Computer network.",
          "file-monitoring-python": "Real-time automated file system observation daemon with event dispatching.",
          "ParishConnect-laravel": "Community management portal and records database built with Laravel & MySQL.",
          "School-Web-Bootstrap": "Clean, responsive educational web portal with modern semantic markup.",
          "wonderland-mern": "Modular educational learning platform and interactive game suite built with MERN.",
        };

        const category = categorizeRepo(r);

        return {
          id: r.id,
          name: r.name,
          description: r.description || defaultDescriptions[r.name] || "Engineered software repository on GitHub.",
          language: r.language || "Code",
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
          url: r.html_url,
          homepage: r.homepage,
          topics: r.topics || [],
          category,
          cloneUrl: r.clone_url,
          defaultBranch: r.default_branch || "main",
        };
      });

    return NextResponse.json({
      source: "live",
      username,
      repos: repos.length > 0 ? repos : FALLBACK_REPOS,
    });
  } catch (err) {
    console.error("Error fetching GitHub repositories:", err);
    return NextResponse.json({
      source: "fallback",
      username,
      repos: FALLBACK_REPOS,
    });
  }
}

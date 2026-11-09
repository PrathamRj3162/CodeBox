"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, ExternalLink, Clock, Layers } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "retro-arcade",
    title: "Retro Arcade Game Engine",
    tagline: "2D Canvas Physics & Sprite Animator",
    description:
      "Build a classic 2D retro arcade platformer engine from the ground up using HTML5 Canvas, collision detection math, sprite-sheet animation, and retro chiptune audio synthesized in the browser.",
    difficulty: "Intermediate",
    duration: "4 - 6 hours",
    technologies: ["JavaScript", "HTML5 Canvas", "Web Audio API", "Physics Math"],
    image: "/game.png",
  },
  {
    id: "collaborative-editor",
    title: "Real-Time Code Collaboration Studio",
    tagline: "Multi-User WebSocket Coding Sandbox",
    description:
      "Engineer a live multi-cursor code editor supporting simultaneous peer editing, operational transformations, custom themes, syntax highlighting, and an automated verification runner.",
    difficulty: "Advanced",
    duration: "8 - 10 hours",
    technologies: ["Next.js", "WebSockets", "Monaco Editor", "Tailwind CSS"],
    image: "/machine.webp",
  },
  {
    id: "algo-visualizer",
    title: "Algorithm Visualizer Engine",
    tagline: "Interactive Graph & Sort Visualizer",
    description:
      "Design an educational interactive visualization platform for quicksort, Dijkstra's algorithm, BFS/DFS, and dynamic programming with step-by-step playback controls and speed throttles.",
    difficulty: "Beginner",
    duration: "3 - 4 hours",
    technologies: ["React", "TypeScript", "Data Structures", "Tailwind CSS"],
    image: "/tree.png",
  },
  {
    id: "saas-starter",
    title: "Full-Stack Developer Learning Hub",
    tagline: "Gamified Coding Curriculum Platform",
    description:
      "Architect a scalable learning platform featuring course progression trees, user authentication, XP rewards, database persistence with Drizzle ORM, and automated test-case evaluation.",
    difficulty: "Advanced",
    duration: "10 - 12 hours",
    technologies: ["Next.js 15", "Clerk Auth", "PostgreSQL", "Drizzle ORM"],
    image: "/logo.png",
  },
  {
    id: "markdown-docs",
    title: "Modern Documentation Platform",
    tagline: "Fast Static Docs with Full-Text Search",
    description:
      "Construct a blazingly fast documentation site with automatic table of contents generation, code snippet copy buttons, search indexing, and dark mode theming.",
    difficulty: "Beginner",
    duration: "2 - 3 hours",
    technologies: ["Next.js", "Markdown", "Search Indexing", "Lucide Icons"],
    image: "/books.png",
  },
  {
    id: "eval-sandbox",
    title: "Isolated Code Sandbox Runner",
    tagline: "Safe Script Execution & Verification",
    description:
      "Develop a secure client-side sandbox execution environment that runs user code submissions against automated unit tests and assertions with memory and execution timeout guards.",
    difficulty: "Intermediate",
    duration: "5 - 7 hours",
    technologies: ["TypeScript", "Vitest", "Sandbox Isolation", "AST Analysis"],
    image: "/start-up.png",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");

  const filteredProjects =
    filter === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.difficulty === filter);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-game text-4xl sm:text-6xl text-yellow-400 tracking-wider">
          Guided Projects
        </h1>
        <p className="font-game text-lg sm:text-2xl text-gray-300 mt-3 max-w-3xl mx-auto">
          Take your coding skills to production. Build complete, portfolio-ready
          applications with milestone-by-milestone guided architecture.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`font-game text-lg px-4 py-1.5 rounded-lg border-2 border-black transition-all ${
                filter === level
                  ? "bg-yellow-400 text-black shadow-[3px_3px_0_0_#000]"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="border-4 border-black rounded-2xl bg-zinc-900 p-6 flex flex-col justify-between shadow-[6px_6px_0_0_#000] hover:translate-y-[-2px] transition-transform"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span
                  className={`font-game text-sm px-3 py-1 rounded-md border border-black ${
                    project.difficulty === "Beginner"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : project.difficulty === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  }`}
                >
                  {project.difficulty}
                </span>
              </div>

              <h3 className="font-game text-2xl text-white mb-1">
                {project.title}
              </h3>
              <p className="font-game text-sm text-yellow-400/90 mb-3">
                {project.tagline}
              </p>
              <p className="font-sans text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] bg-zinc-800 text-neutral-300 px-2 py-0.5 rounded border border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                <span className="flex items-center gap-1 font-game text-sm">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  {project.duration}
                </span>
                <span className="flex items-center gap-1 font-game text-sm text-neutral-300">
                  <Layers className="w-4 h-4 text-yellow-400" />
                  Milestone Lab
                </span>
              </div>

              <Link href="/courses">
                <Button
                  variant="pixel"
                  className="w-full font-game text-lg py-2.5"
                >
                  Start Lab
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

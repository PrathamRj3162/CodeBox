export interface ExerciseContent {
  content: string;
  task: string;
  hint: string;
  starterCode: Record<string, string>;
  regex: string;
  output: string;
  hintXp: number;
}

export interface ExerciseItem {
  name: string;
  slug: string;
  xp: number;
  difficulty: string;
  exercisesContent?: ExerciseContent;
}

export interface ChapterItem {
  id: number;
  chapterId: number;
  courseId: number;
  name: string;
  desc: string;
  exercises: ExerciseItem[];
}

export interface CourseItem {
  id: number;
  CourseId: number;
  title: string;
  desc: string;
  bannerImage: string;
  level: string;
  tags: string;
  editorType: string;
  chapters: ChapterItem[];
}

export const FALLBACK_COURSES: CourseItem[] = [
  {
    id: 4,
    CourseId: 4,
    title: "React Realm: Mastering Hooks",
    desc: "Move beyond the basics and unlock the power of modern React using hooks to manage state, side effects, and lifecycle.",
    bannerImage: "/course-banner.gif",
    level: "Intermediate",
    tags: "React, Hooks, Frontend",
    editorType: "react",
    chapters: [
      {
        id: 1,
        chapterId: 1,
        courseId: 4,
        name: "Hooks Awakening",
        desc: "Learn why hooks were introduced and how they transform modern React function components.",
        exercises: [
          {
            name: "Why Hooks Exist",
            slug: "why-hooks-exist",
            xp: 25,
            difficulty: "easy",
            exercisesContent: {
              content:
                "<div style='font-family:sans-serif;line-height:1.6;color:#e4e4e7;padding:16px;'><h3 style='color:#facc15;font-size:18px;'>Welcome to the React Realm!</h3><p>Before hooks were introduced in React 16.8, developers had to use class components for state and lifecycle methods.</p><p>Hooks allow you to use state and other React features inside function components without writing a class.</p><p>In this exercise, create a simple component that explains the main advantage of hooks.</p></div>",
              task:
                "<div style='font-family:sans-serif;padding:8px;'><p>1. Inside <code>HookReason</code>, render a paragraph <code>&lt;p&gt;Hooks let function components use state&lt;/p&gt;</code>.</p><p>2. Render <code>&lt;HookReason /&gt;</code> inside <code>App</code>.</p></div>",
              hint:
                "<div style='font-family:sans-serif;padding:8px;'><p>Make sure the text matches exactly: <code>Hooks let function components use state</code></p></div>",
              starterCode: {
                "/App.jsx": `function HookReason() {
  return (
    <div>
      <p>Hooks let function components use state</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>React Hooks Awakening</h2>
      <HookReason />
    </div>
  );
}`,
              },
              regex: "<p>\\s*Hooks let function components use state\\s*</p>",
              output: "<p>Hooks let function components use state</p>",
              hintXp: 25,
            },
          },
          {
            name: "Rules of Hooks Trial",
            slug: "rules-of-hooks-trial",
            xp: 30,
            difficulty: "medium",
            exercisesContent: {
              content:
                "<div style='font-family:sans-serif;line-height:1.6;color:#e4e4e7;padding:16px;'><h3 style='color:#facc15;font-size:18px;'>The Two Golden Rules of Hooks</h3><p>1. Only call hooks at the <strong>top level</strong> of your function component (never in loops, conditions, or nested functions).</p><p>2. Only call hooks from <strong>React function components</strong> or custom hooks.</p></div>",
              task:
                "<div style='font-family:sans-serif;padding:8px;'><p>Render a paragraph with <code>&lt;p&gt;Hooks follow strict rules&lt;/p&gt;</code> inside <code>RuleCheck</code>.</p></div>",
              hint:
                "<div style='font-family:sans-serif;padding:8px;'><p>Ensure your component renders the exact text: <code>Hooks follow strict rules</code></p></div>",
              starterCode: {
                "/App.jsx": `function RuleCheck() {
  return (
    <div>
      <p>Hooks follow strict rules</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Hook Rules Test</h2>
      <RuleCheck />
    </div>
  );
}`,
              },
              regex: "<p>\\s*Hooks follow strict rules\\s*</p>",
              output: "<p>Hooks follow strict rules</p>",
              hintXp: 30,
            },
          },
          {
            name: "useEffect Introduction",
            slug: "useeffect-introduction",
            xp: 35,
            difficulty: "medium",
            exercisesContent: {
              content:
                "<div style='font-family:sans-serif;line-height:1.6;color:#e4e4e7;padding:16px;'><h3 style='color:#facc15;font-size:18px;'>Handling Side Effects</h3><p>The <code>useEffect</code> hook lets you synchronize a component with external systems (APIs, DOM, timers).</p></div>",
              task:
                "<div style='font-family:sans-serif;padding:8px;'><p>Import <code>useEffect</code> and render <code>&lt;p&gt;Effect Initialized&lt;/p&gt;</code>.</p></div>",
              hint:
                "<div style='font-family:sans-serif;padding:8px;'><p>Call <code>useEffect(() => {}, [])</code> and render the text.</p></div>",
              starterCode: {
                "/App.jsx": `import { useEffect } from "react";

function EffectIntro() {
  useEffect(() => {
    console.log("Effect activated");
  }, []);

  return (
    <div>
      <p>Effect Initialized</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <EffectIntro />
    </div>
  );
}`,
              },
              regex: "<p>\\s*Effect Initialized\\s*</p>",
              output: "<p>Effect Initialized</p>",
              hintXp: 35,
            },
          },
        ],
      },
      {
        id: 2,
        chapterId: 2,
        courseId: 4,
        name: "State & Reducers",
        desc: "Learn complex state management patterns using useReducer.",
        exercises: [
          {
            name: "State as a System",
            slug: "state-as-a-system",
            xp: 30,
            difficulty: "medium",
            exercisesContent: {
              content:
                "<div style='font-family:sans-serif;padding:16px;color:#e4e4e7;'><h3 style='color:#facc15;'>State Management</h3><p>When components grow complex, multiple useState calls become hard to coordinate.</p></div>",
              task:
                "<div style='font-family:sans-serif;padding:8px;'><p>Create a state counter and display <code>&lt;p&gt;Count: 0&lt;/p&gt;</code>.</p></div>",
              hint:
                "<div style='font-family:sans-serif;padding:8px;'><p>Use useState(0) and display Count: 0.</p></div>",
              starterCode: {
                "/App.jsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 16px', background: '#eab308', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Increment</button>
    </div>
  );
}`,
              },
              regex: "Count:\\s*0",
              output: "<p>Count: 0</p>",
              hintXp: 30,
            },
          },
        ],
      },
    ],
  },
  {
    id: 1,
    CourseId: 1,
    title: "Web Foundations: HTML & CSS",
    desc: "Build modern, accessible web pages from scratch with semantic HTML5 and modern CSS layouts.",
    bannerImage: "/Hero.gif",
    level: "Beginner",
    tags: "HTML, CSS, Web",
    editorType: "html",
    chapters: [
      {
        id: 1,
        chapterId: 1,
        courseId: 1,
        name: "HTML5 Elements",
        desc: "Semantic elements and accessible document structures.",
        exercises: [
          {
            name: "Semantic Tags",
            slug: "semantic-tags",
            xp: 20,
            difficulty: "easy",
            exercisesContent: {
              content:
                "<div style='font-family:sans-serif;padding:16px;color:#e4e4e7;'><h3 style='color:#facc15;'>Semantic HTML</h3><p>Semantic tags describe their meaning to both browser and developer.</p></div>",
              task: "<p>Write a header element containing an h1 with <code>CodeBox Platform</code>.</p>",
              hint: "<p>Use &lt;header&gt;&lt;h1&gt;CodeBox Platform&lt;/h1&gt;&lt;/header&gt;</p>",
              starterCode: {
                "/index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>Web Foundations</title>
  </head>
  <body style="font-family: sans-serif; padding: 20px; background: #18181b; color: #fff;">
    <header>
      <h1>CodeBox Platform</h1>
    </header>
  </body>
</html>`,
              },
              regex: "<h1>\\s*CodeBox Platform\\s*</h1>",
              output: "<h1>CodeBox Platform</h1>",
              hintXp: 20,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    CourseId: 2,
    title: "JavaScript Engine: Core Logic",
    desc: "Understand JavaScript execution context, closures, promises, event loop, and DOM manipulation.",
    bannerImage: "/Hero2.gif",
    level: "Beginner",
    tags: "JavaScript, ES6, Logic",
    editorType: "js",
    chapters: [
      {
        id: 1,
        chapterId: 1,
        courseId: 2,
        name: "Variables & Scopes",
        desc: "Scope chains, let, const, and closures.",
        exercises: [
          {
            name: "Scope Mastery",
            slug: "scope-mastery",
            xp: 25,
            difficulty: "easy",
            exercisesContent: {
              content:
                "<div style='font-family:sans-serif;padding:16px;color:#e4e4e7;'><h3 style='color:#facc15;'>Block Scope vs Function Scope</h3><p>Understand how let and const behave in modern JS.</p></div>",
              task: "<p>Log 'Hello CodeBox' to the console.</p>",
              hint: "<p>console.log('Hello CodeBox')</p>",
              starterCode: {
                "/index.js": `const greeting = "Hello CodeBox";
console.log(greeting);
document.body.innerHTML = "<h2>" + greeting + "</h2>";`,
              },
              regex: "Hello CodeBox",
              output: "Hello CodeBox",
              hintXp: 25,
            },
          },
        ],
      },
    ],
  },
];

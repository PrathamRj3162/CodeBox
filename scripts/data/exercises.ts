// Seed data for the exercise table.
// Moved verbatim from the old app/api/admin/save-exercises route.

export const EXERCISE_SEED = [
  {
    "courseId": 4,
    "exerciseId": "why-hooks-exist",
    "exerciseName": "Why Hooks Exist",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have crossed into the deeper layers of the React Realm.</p><p style='margin-bottom:8px;'>Before hooks existed, React relied on class components for state and lifecycle logic.</p><p style='margin-bottom:8px;'>This often caused complex code, duplicated logic, and harder maintenance.</p><p style='margin-bottom:8px;'>Hooks were introduced to solve these problems.</p><p style='margin-bottom:8px;'>They allow function components to use state, side effects, and lifecycle behavior.</p><p style='margin-bottom:8px;'>Hooks make logic reusable without changing component structure.</p><p style='margin-bottom:8px;'>They reduce the need for classes in modern React applications.</p><p style='margin-bottom:8px;'>With hooks, related logic can live together instead of being split.</p><p style='margin-bottom:8px;'>This leads to cleaner, more readable components.</p><p style='margin-bottom:8px;'>Hooks encourage composability and predictable data flow.</p><p style='margin-bottom:8px;'>Understanding why hooks exist is critical before using them.</p><p style='margin-bottom:8px;'>This knowledge forms the foundation of intermediate React mastery.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to recognize the purpose of hooks.</p><p>Create a function component named <strong>HookReason</strong>.</p><p>Inside it, render a paragraph using <code>&lt;p&gt;</code> with the text <strong>Hooks let function components use state</strong>.</p><p>Render the <strong>HookReason</strong> component inside <strong>App</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Hooks are not required yet.</p><p>This task focuses only on understanding their purpose.</p></body>",
      "starterCode": {
        "/App.jsx": "function HookReason() {\n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      \n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Hooks let function components use state\\s*</p>",
      "output": "<p>Hooks let function components use state</p>",
      "hintXp": 30
    }
  }
,
  {
    "courseId": 4,
    "exerciseId": "rules-of-hooks-trial",
    "exerciseName": "Rules of Hooks Trial",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Power in the React Realm comes with strict rules.</p><p style='margin-bottom:8px;'>Hooks may look like simple functions, but they must be used correctly.</p><p style='margin-bottom:8px;'>React enforces rules to keep hooks predictable and stable.</p><p style='margin-bottom:8px;'>Hooks must be called at the top level of a component.</p><p style='margin-bottom:8px;'>They must never be called inside loops, conditions, or nested functions.</p><p style='margin-bottom:8px;'>Hooks must only be called from React function components.</p><p style='margin-bottom:8px;'>They can also be called from custom hooks.</p><p style='margin-bottom:8px;'>Breaking these rules causes unexpected behavior.</p><p style='margin-bottom:8px;'>React relies on call order to track hook state.</p><p style='margin-bottom:8px;'>Consistent hook usage ensures reliable rendering.</p><p style='margin-bottom:8px;'>This trial ensures you respect the laws of hooks.</p><p style='margin-bottom:8px;'>Follow the rules and the realm remains stable.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to follow the rules of hooks.</p><p>Create a component named <strong>RuleCheck</strong>.</p><p>Inside it, render a paragraph using <code>&lt;p&gt;</code> with the text <strong>Hooks follow strict rules</strong>.</p><p>Do not place hooks inside conditions or loops.</p><p>Render the <strong>RuleCheck</strong> component inside <strong>App</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>This exercise checks understanding, not hook usage.</p><p>Focus on structure and placement.</p></body>",
      "starterCode": {
        "/App.jsx": "function RuleCheck() {\n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      \n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Hooks follow strict rules\\s*</p>",
      "output": "<p>Hooks follow strict rules</p>",
      "hintXp": 30
    }
  }
,
  {
    "courseId": 4,
    "exerciseId": "useeffect-introduction",
    "exerciseName": "useEffect Introduction",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>As your components grow, they must react to the outside world.</p><p style='margin-bottom:8px;'>Some actions cannot happen during rendering.</p><p style='margin-bottom:8px;'>Fetching data, setting timers, and subscribing to events are side effects.</p><p style='margin-bottom:8px;'>React provides the <code>useEffect</code> hook to handle these effects.</p><p style='margin-bottom:8px;'>Effects run after the component renders.</p><p style='margin-bottom:8px;'>This keeps rendering pure and predictable.</p><p style='margin-bottom:8px;'>The effect function contains the side-effect logic.</p><p style='margin-bottom:8px;'>You can control when effects run using dependencies.</p><p style='margin-bottom:8px;'>Without dependencies, effects run after every render.</p><p style='margin-bottom:8px;'>Understanding <code>useEffect</code> is essential for real applications.</p><p style='margin-bottom:8px;'>This lesson introduces its purpose before deeper use.</p><p style='margin-bottom:8px;'>Prepare to control side effects safely.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to introduce <code>useEffect</code>.</p><p>Create a component named <strong>EffectIntro</strong>.</p><p>Inside it, use <code>useEffect</code> to log <strong>Effect activated</strong> to the console.</p><p>Also render a paragraph with the text <strong>Effect Initialized</strong>.</p><p>Render the <strong>EffectIntro</strong> component inside <strong>App</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Import <code>useEffect</code> from React.</p><p>An empty dependency array runs the effect once.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useEffect } from \"react\";\n\nfunction EffectIntro() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      \n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Effect Initialized\\s*</p>",
      "output": "<p>Effect Initialized</p>",
      "hintXp": 35
    }
  }
,
  {
    "courseId": 4,
    "exerciseId": "effect-dependencies-arena",
    "exerciseName": "Effect Dependencies Arena",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>The arena tests control, not raw power.</p><p style='margin-bottom:8px;'>An effect that runs too often can weaken performance.</p><p style='margin-bottom:8px;'>React uses a dependency array to control effect execution.</p><p style='margin-bottom:8px;'>Dependencies tell React when an effect should re-run.</p><p style='margin-bottom:8px;'>An empty array runs the effect only once.</p><p style='margin-bottom:8px;'>Adding variables makes the effect react to change.</p><p style='margin-bottom:8px;'>Incorrect dependencies cause stale data or infinite loops.</p><p style='margin-bottom:8px;'>Correct dependencies keep logic predictable.</p><p style='margin-bottom:8px;'>This arena sharpens your awareness of effect timing.</p><p style='margin-bottom:8px;'>Control the flow and remain stable.</p><p style='margin-bottom:8px;'>Mastery comes from restraint.</p><p style='margin-bottom:8px;'>Step carefully inside the arena.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to control when an effect runs.</p><p>Create a state variable named <strong>count</strong> starting at <strong>0</strong>.</p><p>Use <code>useEffect</code> so it logs <strong>Count changed</strong> whenever <strong>count</strong> updates.</p><p>Render a paragraph showing <strong>Count: 0</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add <code>count</code> inside the dependency array.</p><p>Use <code>useState</code> to create state.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useEffect, useState } from \"react\";\n\nfunction EffectArena() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <EffectArena />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Count:\\s*0\\s*</p>",
      "output": "<p>Count: 0</p>",
      "hintXp": 40
    }
  }
,
    {
    "courseId": 4,
    "exerciseId": "cleanup-ritual",
    "exerciseName": "Cleanup Ritual",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Not all side effects last forever.</p><p style='margin-bottom:8px;'>Some effects create subscriptions, timers, or listeners.</p><p style='margin-bottom:8px;'>If left unmanaged, these effects cause memory leaks.</p><p style='margin-bottom:8px;'>React provides a cleanup mechanism inside <code>useEffect</code>.</p><p style='margin-bottom:8px;'>The cleanup function runs before the effect re-runs.</p><p style='margin-bottom:8px;'>It also runs when the component unmounts.</p><p style='margin-bottom:8px;'>Cleanup keeps the React Realm stable and efficient.</p><p style='margin-bottom:8px;'>Without cleanup, old effects linger in the shadows.</p><p style='margin-bottom:8px;'>This ritual teaches responsibility and balance.</p><p style='margin-bottom:8px;'>Every effect you create must be cleaned when needed.</p><p style='margin-bottom:8px;'>Respect the lifecycle and restore order.</p><p style='margin-bottom:8px;'>Complete the ritual to continue forward.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to perform a cleanup ritual.</p><p>Use <code>useEffect</code> to start an interval.</p><p>The interval should log <strong>Tick</strong> every second.</p><p>Return a cleanup function that clears the interval.</p><p>Render a paragraph with the text <strong>Cleanup Active</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Return a function from <code>useEffect</code>.</p><p>Use <code>clearInterval</code> inside cleanup.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useEffect } from \"react\";\n\nfunction CleanupRitual() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <CleanupRitual />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Cleanup Active\\s*</p>",
      "output": "<p>Cleanup Active</p>",
      "hintXp": 40
    }
}
,
  {
    "courseId": 4,
    "exerciseId": "hooks-master-check",
    "exerciseName": "Hooks Master Check",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have learned why hooks exist and the rules that govern them.</p><p style='margin-bottom:8px;'>You explored side effects and learned how to control them.</p><p style='margin-bottom:8px;'>You managed dependencies and performed cleanup rituals.</p><p style='margin-bottom:8px;'>Now comes the final trial of this chapter.</p><p style='margin-bottom:8px;'>This challenge confirms your understanding of hooks usage.</p><p style='margin-bottom:8px;'>Balance, correctness, and clarity are required.</p><p style='margin-bottom:8px;'>A true React explorer uses hooks responsibly.</p><p style='margin-bottom:8px;'>This master check ties all lessons together.</p><p style='margin-bottom:8px;'>Focus on structure rather than complexity.</p><p style='margin-bottom:8px;'>Prove you are ready to move forward.</p><p style='margin-bottom:8px;'>Complete this and unlock the next chapter.</p><p style='margin-bottom:8px;'>The realm acknowledges your progress.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to combine basic hook knowledge.</p><p>Create a component named <strong>HookSummary</strong>.</p><p>Inside it, use <code>useState</code> to create a state variable <strong>active</strong> with initial value <strong>true</strong>.</p><p>Use <code>useEffect</code> to log <strong>Hook Ready</strong> once when the component mounts.</p><p>Render a paragraph with the text <strong>Hooks Mastered</strong>.</p><p>Render the <strong>HookSummary</strong> component inside <strong>App</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use an empty dependency array to run the effect once.</p><p>The state value does not need to change.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useEffect, useState } from \"react\";\n\nfunction HookSummary() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <HookSummary />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Hooks Mastered\\s*</p>",
      "output": "<p>Hooks Mastered</p>",
      "hintXp": 35
    }
}
,
  {
    "courseId": 4,
    "exerciseId": "state-as-a-system",
    "exerciseName": "State as a System",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>As applications grow, state becomes more than a single value.</p><p style='margin-bottom:8px;'>State represents the living data of your interface.</p><p style='margin-bottom:8px;'>Treating state as a system means thinking about how pieces relate.</p><p style='margin-bottom:8px;'>Scattered state leads to bugs and confusion.</p><p style='margin-bottom:8px;'>Organized state leads to clarity and predictability.</p><p style='margin-bottom:8px;'>React encourages structuring state intentionally.</p><p style='margin-bottom:8px;'>Related values often belong together.</p><p style='margin-bottom:8px;'>Updates should describe what happened, not how.</p><p style='margin-bottom:8px;'>This mindset prepares you for advanced patterns.</p><p style='margin-bottom:8px;'>Understanding state as a system is a key intermediate skill.</p><p style='margin-bottom:8px;'>This lesson focuses on structure, not complexity.</p><p style='margin-bottom:8px;'>Build systems, not scattered pieces.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to think of state as a unit.</p><p>Create a component named <strong>SystemState</strong>.</p><p>Use <code>useState</code> to store an object with two properties: <strong>count</strong> set to <strong>0</strong> and <strong>status</strong> set to <strong>idle</strong>.</p><p>Render a paragraph showing <strong>Count: 0</strong> and another showing <strong>Status: idle</strong>.</p><p>Render the <strong>SystemState</strong> component inside <strong>App</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>You can store objects in state.</p><p>Use one <code>useState</code> call with an object.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useState } from \"react\";\n\nfunction SystemState() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <SystemState />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Count:\\s*0\\s*</p>[\\s\\S]*<p>\\s*Status:\\s*idle\\s*</p>",
      "output": "<p>Count: 0</p><p>Status: idle</p>",
      "hintXp": 35
    }
  }
,
  {
    "courseId": 4,
    "exerciseId": "usereducer-awakening",
    "exerciseName": "useReducer Awakening",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>As state grows more complex, simple updates become fragile.</p><p style='margin-bottom:8px;'>React offers <code>useReducer</code> to manage complex state transitions.</p><p style='margin-bottom:8px;'>Instead of setting values directly, actions describe what happened.</p><p style='margin-bottom:8px;'>A reducer decides how state changes in response to actions.</p><p style='margin-bottom:8px;'>This pattern creates predictable and testable updates.</p><p style='margin-bottom:8px;'>Reducers centralize state logic in one place.</p><p style='margin-bottom:8px;'>They are ideal when many updates affect the same state.</p><p style='margin-bottom:8px;'>This awakening introduces a more disciplined approach.</p><p style='margin-bottom:8px;'>You now move from scattered updates to intentional transitions.</p><p style='margin-bottom:8px;'>Mastering <code>useReducer</code> unlocks scalable patterns.</p><p style='margin-bottom:8px;'>Prepare to control change with precision.</p><p style='margin-bottom:8px;'>The awakening begins now.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to awaken <code>useReducer</code>.</p><p>Create a reducer that handles one action type: <strong>increment</strong>.</p><p>The initial state should be <strong>{ count: 0 }</strong>.</p><p>Dispatch the <strong>increment</strong> action once.</p><p>Render a paragraph showing <strong>Count: 1</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>A reducer receives <code>(state, action)</code>.</p><p>Return a new state object.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useReducer } from \"react\";\n\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction ReducerAwakening() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <ReducerAwakening />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Count:\\s*1\\s*</p>",
      "output": "<p>Count: 1</p>",
      "hintXp": 40
    }
  }
,
  {
    "courseId": 4,
    "exerciseId": "actions-and-reducers",
    "exerciseName": "Actions & Reducers",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Reducers gain true power when actions carry intent.</p><p style='margin-bottom:8px;'>An action describes what happened, not how state changes.</p><p style='margin-bottom:8px;'>Reducers interpret actions and produce the next state.</p><p style='margin-bottom:8px;'>This separation keeps logic predictable.</p><p style='margin-bottom:8px;'>Actions are plain objects with a type field.</p><p style='margin-bottom:8px;'>They may also include additional data.</p><p style='margin-bottom:8px;'>Reducers must always return a new state.</p><p style='margin-bottom:8px;'>They must never mutate the existing state.</p><p style='margin-bottom:8px;'>Clear action naming improves readability.</p><p style='margin-bottom:8px;'>This trial strengthens disciplined state transitions.</p><p style='margin-bottom:8px;'>Think in actions, not assignments.</p><p style='margin-bottom:8px;'>Let reducers decide the outcome.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to handle multiple actions.</p><p>Create two action types: <strong>increment</strong> and <strong>decrement</strong>.</p><p>The initial state should be <strong>{ count: 1 }</strong>.</p><p>Dispatch the <strong>decrement</strong> action once.</p><p>Render a paragraph showing <strong>Count: 0</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use a switch statement inside the reducer.</p><p>Return a new state object for each action.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useReducer } from \"react\";\n\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction ActionsAndReducers() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <ActionsAndReducers />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Count:\\s*0\\s*</p>",
      "output": "<p>Count: 0</p>",
      "hintXp": 40
    }
}
,
  {
    "courseId": 4,
    "exerciseId": "reducer-vs-usestate",
    "exerciseName": "Reducer vs useState",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>With multiple tools comes the need for judgment.</p><p style='margin-bottom:8px;'><code>useState</code> is simple and perfect for isolated values.</p><p style='margin-bottom:8px;'><code>useReducer</code> shines when state logic becomes complex.</p><p style='margin-bottom:8px;'>Choosing the right tool keeps components readable.</p><p style='margin-bottom:8px;'>Overusing reducers can add unnecessary complexity.</p><p style='margin-bottom:8px;'>Overusing state setters can scatter logic.</p><p style='margin-bottom:8px;'>The key is understanding when complexity demands structure.</p><p style='margin-bottom:8px;'>This comparison builds architectural instinct.</p><p style='margin-bottom:8px;'>Experienced React developers choose intentionally.</p><p style='margin-bottom:8px;'>This trial sharpens your decision-making.</p><p style='margin-bottom:8px;'>Balance simplicity with scalability.</p><p style='margin-bottom:8px;'>Choose wisely, architect.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to compare approaches.</p><p>Create a component named <strong>StateComparison</strong>.</p><p>Use <code>useState</code> to store a value <strong>mode</strong> with initial value <strong>simple</strong>.</p><p>Render a paragraph showing <strong>Mode: simple</strong>.</p><p>This exercise confirms understanding of when simple state is enough.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Not every problem needs a reducer.</p><p>Use <code>useState</code> directly.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useState } from \"react\";\n\nfunction StateComparison() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <StateComparison />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Mode:\\s*simple\\s*</p>",
      "output": "<p>Mode: simple</p>",
      "hintXp": 35
    }
}
,
  {
    "courseId": 4,
    "exerciseId": "complex-state-trial",
    "exerciseName": "Complex State Trial",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>The realm now tests your ability to manage complexity.</p><p style='margin-bottom:8px;'>Complex state involves multiple related values.</p><p style='margin-bottom:8px;'>Managing them independently leads to fragile logic.</p><p style='margin-bottom:8px;'>Reducers help centralize and control these transitions.</p><p style='margin-bottom:8px;'>Each action represents a meaningful event.</p><p style='margin-bottom:8px;'>State changes must remain predictable.</p><p style='margin-bottom:8px;'>This trial pushes you to think in systems.</p><p style='margin-bottom:8px;'>Your goal is clarity, not cleverness.</p><p style='margin-bottom:8px;'>Organized state leads to stable applications.</p><p style='margin-bottom:8px;'>Face the trial with discipline.</p><p style='margin-bottom:8px;'>Only structured thinking survives here.</p><p style='margin-bottom:8px;'>Prove your control over complex state.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to manage related state together.</p><p>Use <code>useReducer</code> to manage state with <strong>count</strong> and <strong>status</strong>.</p><p>Initial state should be <strong>{ count: 0, status: 'idle' }</strong>.</p><p>Handle one action type <strong>activate</strong> that sets <strong>status</strong> to <strong>active</strong>.</p><p>Dispatch the <strong>activate</strong> action once.</p><p>Render two paragraphs showing <strong>Count: 0</strong> and <strong>Status: active</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Return a new state object from the reducer.</p><p>Do not mutate the existing state.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useReducer } from \"react\";\n\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction ComplexStateTrial() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <ComplexStateTrial />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Count:\\s*0\\s*</p>[\\s\\S]*<p>\\s*Status:\\s*active\\s*</p>",
      "output": "<p>Count: 0</p><p>Status: active</p>",
      "hintXp": 45
    }
  }
,
  {
    "courseId": 4,
    "exerciseId": "state-mastery-check",
    "exerciseName": "State Mastery Check",
    "chapterId": 2,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have explored state as structure, not just storage.</p><p style='margin-bottom:8px;'>You learned when to use reducers and when to keep things simple.</p><p style='margin-bottom:8px;'>You handled actions, transitions, and complex state safely.</p><p style='margin-bottom:8px;'>This final trial confirms your understanding.</p><p style='margin-bottom:8px;'>The goal is clarity, not complexity.</p><p style='margin-bottom:8px;'>Every decision should feel intentional.</p><p style='margin-bottom:8px;'>A true React architect controls state calmly.</p><p style='margin-bottom:8px;'>This mastery check ties all lessons together.</p><p style='margin-bottom:8px;'>Focus on correctness and structure.</p><p style='margin-bottom:8px;'>Prove your readiness to advance.</p><p style='margin-bottom:8px;'>The realm acknowledges your growth.</p><p style='margin-bottom:8px;'>Prepare for the next challenge.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to demonstrate state mastery.</p><p>Create a component named <strong>StateMaster</strong>.</p><p>Use <code>useReducer</code> with initial state <strong>{ value: 5 }</strong>.</p><p>Handle one action type <strong>double</strong> that doubles the value.</p><p>Dispatch the <strong>double</strong> action once.</p><p>Render a paragraph showing <strong>Value: 10</strong>.</p><p>Render the <strong>StateMaster</strong> component inside <strong>App</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Return a new state object with <code>value * 2</code>.</p><p>Reducers must be pure functions.</p></body>",
      "starterCode": {
        "/App.jsx": "import { useReducer } from \"react\";\n\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction StateMaster() {\n  \n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <StateMaster />\n    </div>\n  );\n}"
      },
      "regex": "<p>\\s*Value:\\s*10\\s*</p>",
      "output": "<p>Value: 10</p>",
      "hintXp": 40
    }
  },
  {
  "courseId": 4,
  "chapterId": 3,
  "exerciseId": "why-context-exists",
  "exerciseName": "Why Context Exists",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Welcome to the realm of Context & Global Power.</p><p style='margin-bottom:8px;'>In React, passing props through multiple nested components is known as prop drilling.</p><p style='margin-bottom:8px;'>Prop drilling makes components tightly coupled and harder to refactor.</p><p style='margin-bottom:8px;'>React Context provides a way to pass data through the component tree without passing props manually at every level.</p><p style='margin-bottom:8px;'>It is ideal for global state like current user, theme, or localization settings.</p><p style='margin-bottom:8px;'>Mastering context helps keep component hierarchies clean and modular.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Your mission is to understand why Context exists.</p><p>Create a component named <strong>ContextReason</strong>.</p><p>Inside it, render a paragraph with <code>&lt;p&gt;</code> containing the text <strong>Context eliminates prop drilling</strong>.</p><p>Render the <strong>ContextReason</strong> component inside <strong>App</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a simple functional component that outputs the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "function ContextReason() {\n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <ContextReason />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Context eliminates prop drilling\\s*</p>",
    "output": "<p>Context eliminates prop drilling</p>",
    "hintXp": 25
  }
},
  {
  "courseId": 4,
  "chapterId": 3,
  "exerciseId": "create-the-context",
  "exerciseName": "Create the Context",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Every context begins with the <code>createContext</code> factory.</p><p style='margin-bottom:8px;'>Calling <code>createContext(defaultValue)</code> returns a context object with a Provider and Consumer.</p><p style='margin-bottom:8px;'>The default value is used only when a component reads context without a matching Provider above it in the tree.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Create a context named <strong>ThemeContext</strong> using <code>createContext('dark')</code>.</p><p>Create a component named <strong>ThemeDisplay</strong> that renders a paragraph with <strong>Theme: dark</strong>.</p><p>Render <strong>ThemeDisplay</strong> inside <strong>App</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Import <code>createContext</code> from \"react\".</p></body>",
    "starterCode": {
      "/App.jsx": "import { createContext } from \"react\";\n\n// Create ThemeContext here\n\nfunction ThemeDisplay() {\n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <ThemeDisplay />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Theme:\\s*dark\\s*</p>",
    "output": "<p>Theme: dark</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 3,
  "exerciseId": "provider-ritual",
  "exerciseName": "Provider Ritual",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>The Provider component delivers data to all descendant components.</p><p style='margin-bottom:8px;'>It accepts a <code>value</code> prop that is broadcast to every subscriber.</p><p style='margin-bottom:8px;'>Whenever the value prop changes, all child consumers re-render automatically.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Wrap <strong>ChildComponent</strong> inside <code>&lt;UserContext.Provider value=\"Alex\"&gt;</code>.</p><p>Inside <strong>ChildComponent</strong>, render a paragraph showing <strong>User: Alex</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>&lt;UserContext.Provider value=\"Alex\"&gt;</code> in App.</p></body>",
    "starterCode": {
      "/App.jsx": "import { createContext } from \"react\";\n\nconst UserContext = createContext(\"Guest\");\n\nfunction ChildComponent() {\n  return <p>User: Alex</p>;\n}\n\nexport default function App() {\n  return (\n    <div>\n      <ChildComponent />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*User:\\s*Alex\\s*</p>",
    "output": "<p>User: Alex</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 3,
  "exerciseId": "consume-the-power",
  "exerciseName": "Consume the Power",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>The <code>useContext</code> hook is the modern way to read context values in function components.</p><p style='margin-bottom:8px;'>It accepts the context object and returns the current context value.</p><p style='margin-bottom:8px;'>No callback functions or nested wrappers needed!</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>useContext(ScoreContext)</code> inside <strong>ScoreCard</strong>.</p><p>Render a paragraph with <strong>Current Score: 100</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Pass ScoreContext to <code>useContext(ScoreContext)</code>.</p></body>",
    "starterCode": {
      "/App.jsx": "import { createContext, useContext } from \"react\";\n\nconst ScoreContext = createContext(100);\n\nfunction ScoreCard() {\n  // Consume ScoreContext\n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <ScoreContext.Provider value={100}>\n      <ScoreCard />\n    </ScoreContext.Provider>\n  );\n}"
    },
    "regex": "<p>\\s*Current Score:\\s*100\\s*</p>",
    "output": "<p>Current Score: 100</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 3,
  "exerciseId": "avoid-prop-drilling",
  "exerciseName": "Avoid Prop Drilling",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Notice how intermediate components remain clean.</p><p style='margin-bottom:8px;'>Neither MiddleLayer nor Container need to know about authentication state.</p><p style='margin-bottom:8px;'>Only the leaf component reads the context!</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph inside <strong>LeafComponent</strong> with <strong>Auth Status: Verified</strong>.</p><p>Nest LeafComponent inside MiddleLayer, and MiddleLayer inside App.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>MiddleLayer passes nothing down directly.</p></body>",
    "starterCode": {
      "/App.jsx": "import { createContext, useContext } from \"react\";\n\nconst AuthContext = createContext(\"Verified\");\n\nfunction LeafComponent() {\n  const status = useContext(AuthContext);\n  return <p>Auth Status: {status}</p>;\n}\n\nfunction MiddleLayer() {\n  return <div><LeafComponent /></div>;\n}\n\nexport default function App() {\n  return (\n    <div>\n      <MiddleLayer />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Auth Status:\\s*Verified\\s*</p>",
    "output": "<p>Auth Status: Verified</p>",
    "hintXp": 40
  }
},
  {
  "courseId": 4,
  "chapterId": 3,
  "exerciseId": "context-master-check",
  "exerciseName": "Context Master Check",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Congratulations on reaching the Context trial finale.</p><p style='margin-bottom:8px;'>Combine context creation, provider wrapping, and useContext consumption in a single flow.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Provide value <strong>Pro Plan</strong> through <strong>PlanContext</strong>.</p><p>In <strong>PlanBadge</strong>, consume PlanContext and render <strong>Active Plan: Pro Plan</strong> in a paragraph.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Wrap PlanBadge in PlanContext.Provider value=\"Pro Plan\".</p></body>",
    "starterCode": {
      "/App.jsx": "import { createContext, useContext } from \"react\";\n\nconst PlanContext = createContext(\"Free Plan\");\n\nfunction PlanBadge() {\n  const plan = useContext(PlanContext);\n  return <p>Active Plan: {plan}</p>;\n}\n\nexport default function App() {\n  return (\n    <div>\n      <PlanBadge />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Active Plan:\\s*Pro Plan\\s*</p>",
    "output": "<p>Active Plan: Pro Plan</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 4,
  "exerciseId": "why-performance-matters",
  "exerciseName": "Why Performance Matters",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>React is fast by default, but excessive re-renders can slow down complex apps.</p><p style='margin-bottom:8px;'>Understanding when components re-render is the key to high-performance applications.</p><p style='margin-bottom:8px;'>Optimization should be deliberate, not premature.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Create a component named <strong>PerfRule</strong>.</p><p>Render a paragraph showing <strong>Re-renders should be deliberate</strong>.</p><p>Render <strong>PerfRule</strong> inside <strong>App</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Output the required paragraph within PerfRule.</p></body>",
    "starterCode": {
      "/App.jsx": "function PerfRule() {\n  return (\n    <div>\n      \n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <div>\n      <PerfRule />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Re-renders should be deliberate\\s*</p>",
    "output": "<p>Re-renders should be deliberate</p>",
    "hintXp": 25
  }
},
  {
  "courseId": 4,
  "chapterId": 4,
  "exerciseId": "memoization-basics",
  "exerciseName": "Memoization Basics",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'><code>React.memo</code> is a higher order component that memoizes the rendered output.</p><p style='margin-bottom:8px;'>If component props do not change, React skips rendering the component and reuses the last rendered result.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Wrap <strong>HeavyItem</strong> with <code>React.memo</code>.</p><p>Inside <strong>HeavyItem</strong>, render <strong>Item: Memoized</strong> in a paragraph.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>memo(function HeavyItem() { ... })</code>.</p></body>",
    "starterCode": {
      "/App.jsx": "import { memo } from \"react\";\n\nconst HeavyItem = memo(function HeavyItem() {\n  return <p>Item: Memoized</p>;\n});\n\nexport default function App() {\n  return (\n    <div>\n      <HeavyItem />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Item:\\s*Memoized\\s*</p>",
    "output": "<p>Item: Memoized</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 4,
  "exerciseId": "usememo-trial",
  "exerciseName": "useMemo Trial",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'><code>useMemo</code> caches the result of an expensive calculation between renders.</p><p style='margin-bottom:8px;'>It recomputes the memoized value only when one of the dependencies has changed.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>useMemo</code> to calculate double of 50.</p><p>Render a paragraph showing <strong>Calculated: 100</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p><code>const doubled = useMemo(() =&gt; 50 * 2, []);</code></p></body>",
    "starterCode": {
      "/App.jsx": "import { useMemo } from \"react\";\n\nfunction MemoCalculator() {\n  const result = useMemo(() => 50 * 2, []);\n  return <p>Calculated: {result}</p>;\n}\n\nexport default function App() {\n  return (\n    <div>\n      <MemoCalculator />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Calculated:\\s*100\\s*</p>",
    "output": "<p>Calculated: 100</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 4,
  "exerciseId": "usecallback-arena",
  "exerciseName": "useCallback Arena",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'><code>useCallback</code> caches a callback function definition between renders.</p><p style='margin-bottom:8px;'>This prevents unnecessary child re-renders when passing callbacks to optimized child components.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Create a callback with <code>useCallback</code> that returns <strong>Callback Ready</strong>.</p><p>Render a paragraph showing <strong>Status: Callback Ready</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>useCallback(() =&gt; \"Callback Ready\", [])</code>.</p></body>",
    "starterCode": {
      "/App.jsx": "import { useCallback } from \"react\";\n\nfunction CallbackArena() {\n  const getStatus = useCallback(() => \"Callback Ready\", []);\n  return <p>Status: {getStatus()}</p>;\n}\n\nexport default function App() {\n  return (\n    <div>\n      <CallbackArena />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Status:\\s*Callback Ready\\s*</p>",
    "output": "<p>Status: Callback Ready</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 4,
  "exerciseId": "prevent-unnecessary-renders",
  "exerciseName": "Prevent Unnecessary Renders",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Lifting state up is good, but lifting too high causes wide render cascades.</p><p style='margin-bottom:8px;'>Keep state as close as possible to the components that need it.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render <strong>Optimized Tree: Stable</strong> inside a paragraph in <strong>OptimizedView</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the exact string inside &lt;p&gt; tag.</p></body>",
    "starterCode": {
      "/App.jsx": "function OptimizedView() {\n  return <p>Optimized Tree: Stable</p>;\n}\n\nexport default function App() {\n  return (\n    <div>\n      <OptimizedView />\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Optimized Tree:\\s*Stable\\s*</p>",
    "output": "<p>Optimized Tree: Stable</p>",
    "hintXp": 40
  }
},
  {
  "courseId": 4,
  "chapterId": 4,
  "exerciseId": "performance-master-check",
  "exerciseName": "Performance Master Check",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have mastered React memoization and optimization techniques.</p><p style='margin-bottom:8px;'>Prove your understanding in this final checkpoint.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Performance Mastered: 60 FPS</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Output the text inside a &lt;p&gt; tag.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Performance Mastered: 60 FPS</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Performance Mastered:\\s*60 FPS\\s*</p>",
    "output": "<p>Performance Mastered: 60 FPS</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 5,
  "exerciseId": "understanding-side-effects",
  "exerciseName": "Understanding Side Effects",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>A side effect is anything that interacts with outside systems: API calls, timers, localStorage, or DOM mutations.</p><p style='margin-bottom:8px;'>React components must remain pure during the render phase.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph with <strong>Side effects belong in useEffect</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Return the required paragraph inside App.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Side effects belong in useEffect</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Side effects belong in useEffect\\s*</p>",
    "output": "<p>Side effects belong in useEffect</p>",
    "hintXp": 25
  }
},
  {
  "courseId": 4,
  "chapterId": 5,
  "exerciseId": "useeffect-deep-dive",
  "exerciseName": "useEffect Deep Dive",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>The dependency array controls effect execution.</p><p style='margin-bottom:8px;'>An empty array runs once on mount. Omitting it runs on every render. Listing variables runs when those variables change.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Effect Run Count: 1</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use an empty dependency array <code>[]</code>.</p></body>",
    "starterCode": {
      "/App.jsx": "import { useEffect, useState } from \"react\";\n\nexport default function App() {\n  const [count, setCount] = useState(1);\n  return (\n    <div>\n      <p>Effect Run Count: {count}</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Effect Run Count:\\s*1\\s*</p>",
    "output": "<p>Effect Run Count: 1</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 5,
  "exerciseId": "fetch-data-ritual",
  "exerciseName": "Fetch Data Ritual",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Fetching data inside an effect requires handling asynchronous Promises safely.</p><p style='margin-bottom:8px;'>Effects cannot be async themselves, but can define an async function inside.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph with <strong>Data Fetched: Success</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the target paragraph inside the component.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Data Fetched: Success</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Data Fetched:\\s*Success\\s*</p>",
    "output": "<p>Data Fetched: Success</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 5,
  "exerciseId": "loading-and-error-states",
  "exerciseName": "Loading & Error States",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Real async operations have three states: loading, success, and error.</p><p style='margin-bottom:8px;'>Always show appropriate feedback to users while data is in transit.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render two paragraphs: <strong>Loading: false</strong> and <strong>Error: none</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Display both state paragraphs in order.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Loading: false</p>\n      <p>Error: none</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Loading:\\s*false\\s*</p>[\\s\\S]*<p>\\s*Error:\\s*none\\s*</p>",
    "output": "<p>Loading: false</p><p>Error: none</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 5,
  "exerciseId": "avoid-infinite-loops",
  "exerciseName": "Avoid Infinite Loops",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Updating state inside an effect without proper dependencies creates an infinite re-render loop.</p><p style='margin-bottom:8px;'>Always check dependencies or use functional updates (<code>prev =&gt; prev + 1</code>).</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Safe Loop Status: Stable</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Safe Loop Status: Stable</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Safe Loop Status:\\s*Stable\\s*</p>",
    "output": "<p>Safe Loop Status: Stable</p>",
    "hintXp": 40
  }
},
  {
  "courseId": 4,
  "chapterId": 5,
  "exerciseId": "side-effects-master-check",
  "exerciseName": "Side Effects Master Check",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have mastered async lifecycle, cleanup, and dependencies.</p><p style='margin-bottom:8px;'>Conclude the side effects trials with this mastery test.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph with <strong>Side Effects Mastered: Complete</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Side Effects Mastered: Complete</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Side Effects Mastered:\\s*Complete\\s*</p>",
    "output": "<p>Side Effects Mastered: Complete</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 6,
  "exerciseId": "why-refs-exist",
  "exerciseName": "Why Refs Exist",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Refs provide a way to access DOM nodes directly and store mutable values that do not trigger re-renders.</p><p style='margin-bottom:8px;'>Use state for values that affect visual rendering; use refs for imperative operations.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph with <strong>Refs do not trigger re-renders</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Output the paragraph inside App.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Refs do not trigger re-renders</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Refs do not trigger re-renders\\s*</p>",
    "output": "<p>Refs do not trigger re-renders</p>",
    "hintXp": 25
  }
},
  {
  "courseId": 4,
  "chapterId": 6,
  "exerciseId": "useref-awakening",
  "exerciseName": "useRef Awakening",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'><code>useRef(initialValue)</code> returns an object with a <code>.current</code> property.</p><p style='margin-bottom:8px;'>This property persists across renders and can be mutated at any time.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Create a ref initialized to <strong>42</strong>.</p><p>Render a paragraph with <strong>Ref Value: 42</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Use <code>const myRef = useRef(42);</code></p></body>",
    "starterCode": {
      "/App.jsx": "import { useRef } from \"react\";\n\nexport default function App() {\n  const myRef = useRef(42);\n  return (\n    <div>\n      <p>Ref Value: {myRef.current}</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Ref Value:\\s*42\\s*</p>",
    "output": "<p>Ref Value: 42</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 6,
  "exerciseId": "dom-access-trial",
  "exerciseName": "DOM Access Trial",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Attach a ref to an HTML element with <code>ref={inputRef}</code> to access native DOM methods like <code>.focus()</code>.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render an input element with <strong>placeholder=\"Focus Target\"</strong> and a paragraph with <strong>DOM Access: Ready</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Add the input and paragraph inside App.</p></body>",
    "starterCode": {
      "/App.jsx": "import { useRef } from \"react\";\n\nexport default function App() {\n  const inputRef = useRef(null);\n  return (\n    <div>\n      <input ref={inputRef} placeholder=\"Focus Target\" />\n      <p>DOM Access: Ready</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*DOM Access:\\s*Ready\\s*</p>",
    "output": "<p>DOM Access: Ready</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 6,
  "exerciseId": "persist-values-with-refs",
  "exerciseName": "Persist Values with Refs",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Refs are ideal for storing timer IDs, previous props, or render counts without triggering cascade renders.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Timer ID: Active</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Timer ID: Active</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Timer ID:\\s*Active\\s*</p>",
    "output": "<p>Timer ID: Active</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 6,
  "exerciseId": "imperative-handle-ritual",
  "exerciseName": "Imperative Handle Ritual",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'><code>useImperativeHandle</code> customizes the ref handle exposed by a child component to its parent.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Handle: Custom API Exposed</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required text in a paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Handle: Custom API Exposed</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Handle:\\s*Custom API Exposed\\s*</p>",
    "output": "<p>Handle: Custom API Exposed</p>",
    "hintXp": 40
  }
},
  {
  "courseId": 4,
  "chapterId": 6,
  "exerciseId": "refs-master-check",
  "exerciseName": "Refs Master Check",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have mastered direct DOM access and mutable non-rendering values with useRef.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Refs Mastery: Confirmed</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Refs Mastery: Confirmed</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Refs Mastery:\\s*Confirmed\\s*</p>",
    "output": "<p>Refs Mastery: Confirmed</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 7,
  "exerciseId": "why-routing-matters",
  "exerciseName": "Why Routing Matters",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Client-side routing allows single-page applications to navigate between views without full page reloads.</p><p style='margin-bottom:8px;'>URLs keep the browser history, bookmarking, and link sharing intact.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>SPA navigation preserves state</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the target paragraph inside App.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>SPA navigation preserves state</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*SPA navigation preserves state\\s*</p>",
    "output": "<p>SPA navigation preserves state</p>",
    "hintXp": 25
  }
},
  {
  "courseId": 4,
  "chapterId": 7,
  "exerciseId": "router-setup-ritual",
  "exerciseName": "Router Setup Ritual",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>A router wraps your application and maps URL paths to component trees.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Current Route: /home</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Current Route: /home</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Current Route:\\s*\\/home\\s*</p>",
    "output": "<p>Current Route: /home</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 7,
  "exerciseId": "route-parameters-trial",
  "exerciseName": "Route Parameters Trial",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Dynamic route segments (like <code>/courses/:id</code>) allow extracting parameters from the URL path.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Viewing Course ID: 4</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Viewing Course ID: 4</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Viewing Course ID:\\s*4\\s*</p>",
    "output": "<p>Viewing Course ID: 4</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 7,
  "exerciseId": "navigation-links-quest",
  "exerciseName": "Navigation Links Quest",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Using Link components prevents the browser from making a full HTTP request for every navigation action.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render an anchor tag or button showing <strong>Go to Dashboard</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a link with the exact text.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <a href=\"/dashboard\">Go to Dashboard</a>\n    </div>\n  );\n}"
    },
    "regex": "Go to Dashboard",
    "output": "<a href=\"/dashboard\">Go to Dashboard</a>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 7,
  "exerciseId": "protected-routes-arena",
  "exerciseName": "Protected Routes Arena",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Protected routes verify authentication or subscription tier before rendering restricted screens.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Access: Protected Content Unlocked</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Access: Protected Content Unlocked</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Access:\\s*Protected Content Unlocked\\s*</p>",
    "output": "<p>Access: Protected Content Unlocked</p>",
    "hintXp": 40
  }
},
  {
  "courseId": 4,
  "chapterId": 7,
  "exerciseId": "routing-master-check",
  "exerciseName": "Routing Master Check",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have traversed client routing, parameters, links, and route protection.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Navigation Mastered: Ready for Deploy</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the target text.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Navigation Mastered: Ready for Deploy</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Navigation Mastered:\\s*Ready for Deploy\\s*</p>",
    "output": "<p>Navigation Mastered: Ready for Deploy</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 8,
  "exerciseId": "folder-structure-wisdom",
  "exerciseName": "Folder Structure Wisdom",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Clean folder architecture separates UI components, custom hooks, utilities, and API integrations.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Architecture: Clean & Scalable</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Architecture: Clean & Scalable</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Architecture:\\s*Clean &amp; Scalable|Clean & Scalable\\s*</p>",
    "output": "<p>Architecture: Clean & Scalable</p>",
    "hintXp": 25
  }
},
  {
  "courseId": 4,
  "chapterId": 8,
  "exerciseId": "separation-of-concerns",
  "exerciseName": "Separation of Concerns",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Presentational components handle appearance; container components and hooks handle business logic.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Logic separated from presentation</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Logic separated from presentation</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Logic separated from presentation\\s*</p>",
    "output": "<p>Logic separated from presentation</p>",
    "hintXp": 30
  }
},
  {
  "courseId": 4,
  "chapterId": 8,
  "exerciseId": "custom-hooks-forge",
  "exerciseName": "Custom Hooks Forge",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Custom hooks let you extract component logic into reusable functions.</p><p style='margin-bottom:8px;'>Any function starting with <code>use</code> that calls other hooks is a custom hook.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Create a custom hook named <code>useCounter</code> and render a paragraph showing <strong>Count: 1</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Define <code>function useCounter() { return 1; }</code></p></body>",
    "starterCode": {
      "/App.jsx": "function useCounter() {\n  return 1;\n}\n\nexport default function App() {\n  const count = useCounter();\n  return (\n    <div>\n      <p>Count: {count}</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Count:\\s*1\\s*</p>",
    "output": "<p>Count: 1</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 8,
  "exerciseId": "error-boundaries-trial",
  "exerciseName": "Error Boundaries Trial",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Error boundaries catch JavaScript errors anywhere in their child component tree, log them, and display fallback UI.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Error Boundary: Protected UI</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Error Boundary: Protected UI</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Error Boundary:\\s*Protected UI\\s*</p>",
    "output": "<p>Error Boundary: Protected UI</p>",
    "hintXp": 35
  }
},
  {
  "courseId": 4,
  "chapterId": 8,
  "exerciseId": "reusable-patterns-quest",
  "exerciseName": "Reusable Patterns Quest",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>Compound components, render props, and slot patterns create flexible, composable component systems.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>Pattern: Compound Components</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the required paragraph.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>Pattern: Compound Components</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*Pattern:\\s*Compound Components\\s*</p>",
    "output": "<p>Pattern: Compound Components</p>",
    "hintXp": 40
  }
},
  {
  "courseId": 4,
  "chapterId": 8,
  "exerciseId": "react-architect-graduation",
  "exerciseName": "React Architect Graduation",
  "exercisesContent": {
    "content": "<body style='font-family:Arial,sans-serif;line-height:1.6;background-color:#0f0f0f;padding:20px;'><p style='margin-bottom:8px;'>You have traversed every chapter in CodeBox: from hooks and state reducers to context, performance, side effects, refs, routing, and scalable architecture.</p><p style='margin-bottom:8px;'>You are now an officially certified React Architect.</p></body>",
    "task": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render a paragraph showing <strong>React Realm Conquered: Full Architect Certified</strong>.</p></body>",
    "hint": "<body style='font-family:Arial,sans-serif;padding:10px;'><p>Render the graduation victory text.</p></body>",
    "starterCode": {
      "/App.jsx": "export default function App() {\n  return (\n    <div>\n      <p>React Realm Conquered: Full Architect Certified</p>\n    </div>\n  );\n}"
    },
    "regex": "<p>\\s*React Realm Conquered:\\s*Full Architect Certified\\s*</p>",
    "output": "<p>React Realm Conquered: Full Architect Certified</p>",
    "hintXp": 45
  }
}
];

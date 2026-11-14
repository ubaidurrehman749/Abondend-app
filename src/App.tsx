import { useState } from "react";
import { useAnswers } from "./state/AnswersContext.tsx";

type Dest = "moon" | "mars";

const DESTINATIONS: Record<Dest, { title: string; text: string }> = {
  moon: {
    title: "The Moon",
    text: "NASA sent crews and robots to the Moon to learn how it formed and how to explore far from home. Some of that hardware is still there.",
  },
  mars: {
    title: "Mars",
    text: "NASA sent rovers and a helicopter to Mars to ask if it was once a watery world. Each machine added a piece to the puzzle.",
  },
};

export default function App() {
  const [dest, setDest] = useState<Dest | null>(null);
  const { answers } = useAnswers();
  const entries = Object.entries(answers);

  function choose(d: Dest) {
    setDest(d);
    document.getElementById("destination")?.scrollIntoView();
  }

  return (
    <main className="scroller">
      <section className="scene" id="landing">
        <h1>The mission ended. The questions didn't.</h1>
        <p>Some missions end. Their discoveries never do.</p>
        <div>
          <button onClick={() => choose("moon")}>Explore the Moon</button>
          <button onClick={() => choose("mars")}>Explore Mars</button>
        </div>
      </section>

      <section className="scene" id="destination">
        {dest ? (
          <>
            <h1>{DESTINATIONS[dest].title}</h1>
            <p>{DESTINATIONS[dest].text}</p>
            <button onClick={() => setDest(dest === "moon" ? "mars" : "moon")}>
              Visit {dest === "moon" ? "Mars" : "the Moon"} instead
            </button>
          </>
        ) : (
          <>
            <h1>Choose your destination</h1>
            <p>Pick the Moon or Mars on the first screen.</p>
          </>
        )}
      </section>

      <section className="scene" id="closing">
        <h1>Your questions for the future</h1>
        {entries.length === 0 ? (
          <p>No questions yet. Explore an object and send your question into the future.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {entries.map(([id, a]) => (
              <li key={id}>
                <strong>{id}</strong>: {a.choice}
              </li>
            ))}
          </ul>
        )}
        <p>A mission may end. A machine may fall silent. But every discovery creates another question.</p>
        <p>Remember the machines. Celebrate the discoveries. Question the unknown.</p>
      </section>
    </main>
  );
}

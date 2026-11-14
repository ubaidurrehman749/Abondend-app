export default function App() {
  return (
    <main className="scroller">
      <section className="scene" id="landing">
        <h1>The mission ended. The questions didn't.</h1>
        <p>Some missions end. Their discoveries never do.</p>
        <div>
          <a href="#destination"><button>Explore the Moon</button></a>
          <a href="#destination"><button>Explore Mars</button></a>
        </div>
      </section>

      <section className="scene" id="destination">
        <h1>Choose your destination</h1>
        <p>Scene 2 (placeholder)</p>
      </section>

      <section className="scene" id="closing">
        <h1>Your questions for the future</h1>
        <p>Scene 3 (placeholder)</p>
      </section>
    </main>
  );
}

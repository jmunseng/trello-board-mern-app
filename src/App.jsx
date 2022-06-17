function App() {
  return (
    <div className="trello-master">
      <nav className="nav app">App Bar</nav>
      <h1 className="navbar board">Board Bar</h1>
      <div className="board-columns">
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png"
                alt="img1"
              />
              Design & Research
            </li>
            <li>second</li>
            <li>third</li>
            <li>second</li>
            <li>third</li>
            <li>second</li>
            <li>third</li>
            <li>second</li>
            <li>third</li>
            <li>second</li>
            <li>third</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png"
                alt="img1"
              />
              Design & Research
            </li>
            <li>second</li>
          </ul>
          <footer>Add another card</footer>
        </div>
      </div>
    </div>
  );
}

export default App;

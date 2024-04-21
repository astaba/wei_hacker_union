import React from "react"

const title = "React";

function App() {
  return (
    React.createElement(
      "div",
      null,
      React.createElement("h1", null, `Hello ${title}!`)
    )
  );
}

export default App;

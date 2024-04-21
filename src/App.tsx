import { list } from "./constants/mock_data.ts";

function App() {
  return (
    <div>
      <h1>My hacker stories</h1>
      <label htmlFor="search">Search: </label>&nbsp;
      <input id="search" type="text" />
      <hr />
      <ul>
        {list.map((item) => (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

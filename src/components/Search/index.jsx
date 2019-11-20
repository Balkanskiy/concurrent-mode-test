import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import axios from "axios";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const fetchTodos = createResource(async path => {
  const [todos] = await Promise.all([
    axios.get(path).then(resp => resp.data),
    sleep(3000)
  ]);
  return todos;
});

function Search() {
  const todos = fetchTodos.read("https://jsonplaceholder.typicode.com/todos");
  return (
    <div>
      <h1>Todos</h1>
      <div className="todos">
        {todos.map(todo => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Search;

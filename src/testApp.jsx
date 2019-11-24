import React, { Suspense } from "react";
import axios from "axios";
import cn from "classnames";
import { unstable_createResource as createResource } from "react-cache";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetcher = createResource(async path => {
  const [todos] = await Promise.all([
    axios.get(path).then(resp => resp.data),
    sleep(1000)
  ]);
  return todos;
});

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </div>
  );
}

class AsyncComponent extends React.Component {
  render() {
    const todos = fetcher.read("https://jsonplaceholder.typicode.com/todos");
    return (
      <div>
        <h1>Todos</h1>
        <div className="todos">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={cn("todo", { "todo--completed": todo.completed })}
            >
              {todo.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function Loading(props) {
  return <div>Loading...</div>;
}

export default App;

import React, {Suspense} from 'react';
import './App.css';
import {unstable_createResource as createResource} from "react-cache";
import axios from "axios";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetcher = createResource(async path => {
  const [todos] = await Promise.all([
    axios.get(path).then(resp => resp.data),
    sleep(1000)
  ]);
  return todos;
});

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
                >
                  {todo.title}
                </div>
            ))}
          </div>
        </div>
    );
  }
}

function App() {
  return (
      <div className="App">
        <Suspense fallback={<Loading />}>
          <AsyncComponent />
        </Suspense>
      </div>
  );
}

function Loading(props) {
  return <div>Loading...</div>;
}


export default App;

import React, { Suspense } from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
        <Search />
      </Suspense>
    </div>
  );
}

export default App;

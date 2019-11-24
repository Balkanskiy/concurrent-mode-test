import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

// Legacy Mode:
// ReactDOM.render(<App />, document.getElementById('root'));

// Concurrent Mode:
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

serviceWorker.unregister();

// Legacy Mode:
// ReactDOM.render(<App />, document.getElementById('root'));

// Concurrent Mode:
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

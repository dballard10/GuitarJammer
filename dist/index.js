import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GuitarJammr from "./GuitarJammr";
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(React.StrictMode, null, React.createElement(GuitarJammr, null)));
} else {
  console.error("Root element not found");
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GuitarJammr from "./GuitarJammr";
import GuitarJammrContainer from "./GuitarJammrContainer";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GuitarJammrContainer />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}

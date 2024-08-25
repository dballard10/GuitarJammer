import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GuitarJammer from "./GuitarJammer";
import GuitarJammerContainer from "./GuitarJammerContainer";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GuitarJammerContainer />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}

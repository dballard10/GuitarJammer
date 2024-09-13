import React, { useState, useEffect } from "react";
import "./GuitarJammr.css";
const chromaticScale = ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"];
const keys = ["E", "Em", "F", "Fm", "Gb", "Gbm", "G", "Gm", "Ab", "Abm", "A", "Am", "Bb", "Bbm", "B", "Bm", "C", "Cm", "Db", "Dbm", "D", "Dm", "Eb", "Ebm"];
const guitarNotes = [
  ["D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E"],
  ["G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A"],
  ["C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D"],
  ["F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G"],
  ["A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B"],
  ["D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E"],
];
const guitarNeck = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const fretSizes = [
  { width: "26px" },
  { width: "30px" },
  { width: "31px" },
  { width: "33px" },
  { width: "38px" },
  { width: "39px" },
  { width: "41px" },
  { width: "42px" },
  { width: "46px" },
  { width: "50px" },
  { width: "52px" },
  { width: "55px" },
  { width: "60px" },
  { width: "63px" },
  { width: "68px" },
  { width: "72px" },
  { width: "76px" },
  { width: "81px" },
  { width: "87px" },
  { width: "92px" },
  { width: "97px" },
  { width: "110px" },
  { width: "80px" },
];
const noteMap = new Map();
function setMap() {
  for (let i = 0; i < keys.length; i++) {
    let scale;
    let startIndex = Math.floor(i / 2);
    if (i % 2 === 0) {
      scale = createMajorScale(startIndex);
    } else {
      scale = createNaturalMinorScale(startIndex);
    }
    noteMap.set(keys[i], scale);
  }
}
function createMajorScale(startIndex) {
  let n = 0;
  let i = startIndex;
  let scale = [];
  while (n < 8) {
    scale.push(chromaticScale[i]);
    n++;
    if (n === 3 || n === 7) {
      i += 1;
    } else {
      i += 2;
    }
    if (i >= 12) {
      i = i % 12;
    }
  }
  return scale;
}
function createNaturalMinorScale(startIndex) {
  let n = 0;
  let i = startIndex;
  let scale = [];
  while (n < 8) {
    scale.push(chromaticScale[i]);
    n++;
    if (n === 2 || n === 5) {
      i += 1;
    } else {
      i += 2;
    }
    if (i >= 12) {
      i = i % 12;
    }
  }
  return scale;
}
function setNeckValues(selectedKey) {
  console.log(selectedKey);
  let selectedScale = noteMap.get(selectedKey);
  console.log(selectedScale);
  for (let r = 0; r < guitarNotes.length; r++) {
    for (let c = 0; c < guitarNotes[r].length; c++) {
      for (let i = 0; i < selectedScale.length; i++) {
        console.log(selectedScale[i]);
        console.log(guitarNotes[r][c]);
        if (selectedScale[i] === guitarNotes[r][c]) {
          guitarNeck[r][c] = 1;
          break;
        }
        guitarNeck[r][c] = 0;
      }
    }
  }
}
function GuitarJammr() {
  const [selectedKey, setSelectedKey] = useState("");
  const [scale, setScale] = useState([]);
  useEffect(() => {
    setMap();
  }, []);
  const handleKeyChange = (event) => {
    const key = event.target.value;
    setSelectedKey(key);
    setScale(noteMap.get(key));
  };
  useEffect(() => {
    if (selectedKey.length > 0) {
      setNeckValues(selectedKey);
    }
  }, [selectedKey]);
  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "keySelector" },
      React.createElement("h1", null, "Guitar Jammr"),
      React.createElement("label", { htmlFor: "keySelect" }, "Select a Key: "),
      React.createElement(
        "select",
        { id: "keySelect", onChange: handleKeyChange, value: selectedKey },
        React.createElement("option", { value: "", disabled: true }, "Keys"),
        keys.map((key) => React.createElement("option", { key: key, value: key }, key)),
      ),
      scale.length > 0 && React.createElement("div", { id: "scaleOutput" }, scale.join(" - ")),
    ),
    React.createElement(
      "div",
      { className: "guitarDisplay" },
      React.createElement("img", { src: "/guitarneckimage.png", alt: "Guitar Neck", className: "guitarNeckImage" }),
      React.createElement(
        "table",
        { className: "guitarNeckTable" },
        React.createElement(
          "tbody",
          null,
          guitarNeck.map((row, rowIndex) =>
            React.createElement(
              "tr",
              { key: rowIndex },
              row.map((col, colIndex) =>
                React.createElement(
                  "td",
                  {
                    key: colIndex,
                    style: {
                      width: fretSizes[colIndex].width,
                    },
                  },
                  React.createElement("div", null, React.createElement("span", null, guitarNotes[rowIndex][colIndex]), React.createElement("span", null, col)),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
export default GuitarJammr;

import React, { useState, useEffect } from "react";
import GuitarJammer from "./GuitarJammer";

const chromaticScale = ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"];
const keys = ["E", "Em", "F", "Fm", "Gb", "Gbm", "G", "Gm", "Ab", "Abm", "A", "Am", "Bb", "Bbm", "B", "Bm", "C", "Cm", "Db", "Dbm", "D", "Dm", "Eb", "Ebm"];
const guitarNotes: string[][] = [
  ["D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E"],
  ["G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A"],
  ["C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D"],
  ["F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G"],
  ["A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B"],
  ["D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C", "B", "Bb", "A", "Ab", "G", "Gb", "F", "E"],
];
const fretSizes: { width: string; height: string }[] = [
  { width: "26px", height: "20px" },
  { width: "30px", height: "20px" },
  { width: "31px", height: "15px" },
  { width: "33px", height: "15px" },
  { width: "38px", height: "15px" },
  { width: "39px", height: "15px" },
  { width: "41px", height: "15px" },
  { width: "42px", height: "15px" },
  { width: "46px", height: "15px" },
  { width: "50px", height: "15px" },
  { width: "52px", height: "15px" },
  { width: "55px", height: "15px" },
  { width: "60px", height: "15px" },
  { width: "63px", height: "15px" },
  { width: "68px", height: "15px" },
  { width: "72px", height: "15px" },
  { width: "76px", height: "15px" },
  { width: "81px", height: "15px" },
  { width: "87px", height: "15px" },
  { width: "92px", height: "15px" },
  { width: "97px", height: "15px" },
  { width: "110px", height: "15px" },
  { width: "80px", height: "10px" },
];

const scaleMap = new Map<string, string[]>();
const pentatonicMap = new Map<string, string[]>();

function setMap() {
  for (let i = 0; i < keys.length; i++) {
    let scale: string[];
    let pentatonic: string[];
    let startIndex = Math.floor(i / 2);
    if (i % 2 === 0) {
      scale = createMajorScale(startIndex);
      pentatonic = createMajorPentatonic(startIndex);
    } else {
      scale = createNaturalMinorScale(startIndex);
      pentatonic = createMinorPentatonic(startIndex);
    }
    scaleMap.set(keys[i], scale);
    pentatonicMap.set(keys[i], pentatonic);
  }
}

function createMajorScale(startIndex: number): string[] {
  let n = 0;
  let i = startIndex;
  let scale: string[] = [];

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

function createNaturalMinorScale(startIndex: number): string[] {
  let n = 0;
  let i = startIndex;
  let scale: string[] = [];

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

function createMajorPentatonic(startIndex: number): string[] {
  let n = 0;
  let i = startIndex;
  let scale: string[] = [];

  while (n < 6) {
    scale.push(chromaticScale[i]);
    n++;

    if (n === 3) {
      i += 3;
    } else if (n === 5) {
      i += 3;
    } else {
      i += 2;
    }

    if (i >= 12) {
      i = i % 12;
    }
  }

  return scale;
}

function createMinorPentatonic(startIndex: number): string[] {
  let n = 0;
  let i = startIndex;
  let scale: string[] = [];

  while (n < 6) {
    scale.push(chromaticScale[i]);
    n++;

    if (n === 1) {
      i += 3;
    } else if (n === 3) {
      i += 2;
    } else if (n === 4) {
      i += 3;
    } else {
      i += 2;
    }
    if (i >= 12) {
      i = i % 12;
    }
  }

  return scale;
}

function setNeckValues(selectedScale: string[], newGuitarNeck: number[][], guitarNotes: string[][]) {
  for (let r = 0; r < guitarNotes.length; r++) {
    for (let c = 0; c < guitarNotes[r].length; c++) {
      let noteFound = false;

      for (let i = 0; i < selectedScale.length; i++) {
        if (selectedScale[i] === guitarNotes[r][c]) {
          newGuitarNeck[r][c] = 1;
          noteFound = true;
          break;
        }
      }

      if (!noteFound) {
        newGuitarNeck[r][c] = 0;
      }
    }
  }
}

function GuitarJammerContainer() {
  useEffect(() => {
    setMap();
  }, []);

  const [selectedKey, setSelectedKey] = useState<string>("");
  const [scale, setScale] = useState<string[]>([]);
  const [isPentatonic, setIsPentatonic] = useState<boolean>(false);
  const [guitarNeck, setGuitarNeck] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  console.debug(scale.length);
  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    setSelectedKey(key);

    const newScale = scaleMap.get(key) ?? [];
    const pentatonicScale = pentatonicMap.get(key) ?? [];
    const finalScale = isPentatonic ? pentatonicScale : newScale;
    setScale(finalScale);

    const newGuitarNeck = guitarNeck.map((row) => [...row]); // Create a deep copy of the guitarNeck array
    setNeckValues(finalScale, newGuitarNeck, guitarNotes);
    setGuitarNeck(newGuitarNeck);
  };

  const handlePentatonicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsPentatonic(checked);

    if (selectedKey) {
      const fullScale = scaleMap.get(selectedKey) ?? [];
      const pentatonicScale = pentatonicMap.get(selectedKey) ?? [];
      const finalScale = checked ? pentatonicScale : fullScale;
      setScale(finalScale);

      const newGuitarNeck = guitarNeck.map((row) => [...row]); // Create a deep copy of the guitarNeck array
      setNeckValues(finalScale, newGuitarNeck, guitarNotes);
      setGuitarNeck(newGuitarNeck);
    }
  };

  return <GuitarJammer selectedKey={selectedKey} scale={scale} keys={keys} guitarNeck={guitarNeck} fretSizes={fretSizes} onKeyChange={handleKeyChange} onPentatonicChange={handlePentatonicChange} />;
}

export default GuitarJammerContainer;

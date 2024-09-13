import React, { useState, useEffect } from "react";
import "./GuitarJammr.css";

interface GuitarJammrProps {
  selectedKey: string;
  scale: string[];
  keys: string[];
  guitarNeck: number[][];
  fretSizes: { width: string; height: string }[];
  onKeyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onPentatonicChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuitarJammr: React.FC<GuitarJammrProps> = ({ selectedKey, scale, keys, guitarNeck, fretSizes, onKeyChange, onPentatonicChange }) => {
  return (
    <div className="container">
      <div className="keySelector">
        <h1>Guitar Jammr</h1>
        <label htmlFor="keySelect">Select a Key: </label>
        <select id="keySelect" onChange={onKeyChange} value={selectedKey}>
          <option value="" disabled>
            Keys
          </option>
          {keys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        {scale.length > 0 && <div id="scaleOutput">{scale.join(" - ")}</div>}
        <label htmlFor="pentaCheckBox"> Pentatonic: </label>
        <input type="checkbox" id="pentaCheckBox" name="pentaCheckBox" onChange={onPentatonicChange}></input>
      </div>
      <div className="guitarDisplay">
        <img src="/guitarneckimage.png" alt="Guitar Neck" className="guitarNeckImage" />
        <table className="guitarNeckTable">
          <tbody>
            {guitarNeck.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td
                    key={`${rowIndex},${colIndex}`}
                    style={{
                      width: fretSizes[colIndex].width,
                      height: fretSizes[colIndex].height,
                    }}
                  >
                    <div>
                      {col ? (
                        <svg className="noteCircle" width="100%" height={fretSizes[colIndex].height}>
                          <circle cx="50%" cy="50%" r="5px" fill="red" />
                        </svg>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuitarJammr;

import React, { useState, useEffect } from 'react';
import './GuitarJammer.css';

const chromaticScale = ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"];
const keys = ["E", "Em", "F", "Fm", "Gb", "Gbm", "G", "Gm", "Ab", "Abm", "A", "Am", "Bb", "Bbm", "B", "Bm", "C", "Cm", "Db", "Dbm", "D", "Dm", "Eb", "Ebm"];
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
        scale.push(chromaticScale[i])
        n++;

        if (n === 3 || n === 6) {
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
        scale.push(chromaticScale[i])
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

function GuitarJammer() {
    const [selectedKey, setSelectedKey] = useState('');
    const [scale, setScale] = useState([]);

    useEffect(() => {
        setMap();
    }, []);

    const handleKeyChange = (event) => {
        const key = event.target.value;
        setSelectedKey(key);
        setScale(noteMap.get(key));
    };

    return (
        <div className="container">
            <h1>Guitar Jammer</h1>
            <label htmlFor="keySelect">Select a Key:</label>
            <select id="keySelect" onChange={handleKeyChange} value={selectedKey}>
                <option value="" disabled>Select a key</option>
                {keys.map((key) => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
            {scale.length > 0 && (
                <div id="scaleOutput">{scale.join(" - ")}</div>
            )}
        </div>
    );
}

export default GuitarJammer;
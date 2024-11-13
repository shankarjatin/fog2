import React, { useEffect, useState } from "react";
import "./grid.css";

const GridLedScroller = () => {
  const [ledMatrix, setLedMatrix] = useState([]);

  // Define LED representations for each character
  const LED_CHARS = {
    ' ': [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    'H': [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
    ],
    'E': [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
    ],
    'L': [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    'O': [
      [0, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
    ],
    'W': [
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
    ],
    'R': [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ],
    'D': [
      [1, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
    // Add more characters as needed
  };

  // Convert text to LED matrix
  const createMatrix = (text) => {
    const upperText = text.toUpperCase();
    const matrix = [];

    // Determine the height of characters (assuming all are same height)
    const charHeight = 5;

    for (let row = 0; row < charHeight; row++) {
      matrix[row] = [];
      for (let char of upperText) {
        const charMatrix = LED_CHARS[char] || LED_CHARS[' '];
        matrix[row].push(...charMatrix[row], 0); // 0 as space between characters
      }
    }

    return matrix;
  };

  useEffect(() => {
    const text = "HELLO WORLD";
    const initialMatrix = createMatrix(text);
    setLedMatrix(initialMatrix);

    // Set up scrolling by shifting each row
    const scrollInterval = setInterval(() => {
      setLedMatrix((prevMatrix) => {
        return prevMatrix.map((row) => {
          const newRow = [...row];
          const first = newRow.shift(); // Remove first element
          newRow.push(first); // Add it to the end
          return newRow;
        });
      });
    }, 300); // Adjust scrolling speed (milliseconds)

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="led-scroller">
      {ledMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="led-row">
          {row.map((dot, dotIndex) => (
            <div
              key={dotIndex}
              className={`led-dot ${dot ? "led-on" : "led-off"}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridLedScroller;

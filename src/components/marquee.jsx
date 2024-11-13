import React, { useEffect, useState } from 'react';
import './marquee.css';

const SCROLLER_LENGTH = 60;
const HEIGHT = 5; // Number of rows per character
const fps = 10; // Slower frame rate for readability

const Marquee = () => {
  const [myMessage, setMyMessage] = useState(textToLED("HELLO WORLD"));
  const [leftPointer, setLeftPointer] = useState(SCROLLER_LENGTH);

  // Function to clear all LEDs before each draw
  const clearLights = () => {
    const lightsOn = document.querySelectorAll('.on');
    lightsOn.forEach((light) => {
      light.classList.remove('on');
      light.classList.add('off');
    });
  };

  // Function to set an individual light
  const setLight = (row, col, state) => {
    const theLight = document.querySelector(`.led-${row}_${col}`);
    if (theLight) {
      if (state) {
        theLight.classList.add('on');
        theLight.classList.remove('off');
      } else {
        theLight.classList.add('off');
        theLight.classList.remove('on');
      }
    }
  };

  // Function to draw the message on the LED grid
  const drawMessage = (messageArray, leftPointer) => {
    clearLights(); // Clear lights at the start of each frame
    const messageLength = messageArray.length;

    for (let col = 0; col < messageLength; col++) {
      for (let row = 0; row < HEIGHT; row++) {
        const offsetCol = leftPointer + col;

        // Only set lights within visible range
        if (offsetCol >= 0 && offsetCol < SCROLLER_LENGTH) {
          setLight(row, offsetCol, messageArray[col][row]);
        }
      }
    }
  };

  useEffect(() => {
    // Animation loop using setInterval
    const intervalId = setInterval(() => {
      drawMessage(myMessage, leftPointer);

      setLeftPointer((prevPointer) => {
        // Reset leftPointer to scroll continuously
        if (prevPointer <= -myMessage.length) {
          return SCROLLER_LENGTH;
        }
        return prevPointer - 1;
      });
    }, 1000 / fps);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [myMessage, leftPointer]);

  return (
    <div id="wrapper">
      <div id="theMarquee">
        {[...Array(HEIGHT)].map((_, rowIndex) => (
          <div key={rowIndex}>
            {[...Array(SCROLLER_LENGTH)].map((_, colIndex) => (
              <div key={colIndex} className={`light off led-${rowIndex}_${colIndex}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Converts text to an LED representation
const textToLED = (word = "HELLO WORLD") => {
  const message = [];
  word = word.toUpperCase();
  for (let char of word) {
    message.push(...charToLED(char));
    message.push(...charToLED(" ")); // Adding space between characters
  }
  return message;
};

// Character to LED matrix mapping (5x5 grid for each letter)
const charToLED = (char) => {
  const ledChars = {
    H: [
      [true, false, true, false, true],
      [true, false, true, false, true],
      [true, true, true, true, true],
      [true, false, true, false, true],
      [true, false, true, false, true]
    ],
    E: [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, true, true, true, false],
      [true, false, false, false, false],
      [true, true, true, true, true]
    ],
    L: [
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true]
    ],
    O: [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false]
    ],
    W: [
      [true, false, false, false, true],
      [true, false, true, false, true],
      [true, false, true, false, true],
      [true, false, true, false, true],
      [true, false, false, false, true]
    ],
    R: [
      [true, true, true, true, true],
      [true, false, true, false, false],
      [true, true, true, true, false],
      [true, false, true, false, true],
      [true, false, false, false, true]
    ],
    D: [
      [true, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, false]
    ],
    " ": [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]
  };

  // Fill characters to fit a consistent 5x5 grid
  return ledChars[char] || ledChars[" "];
};

export default Marquee;

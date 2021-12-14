import React from "react";

import hangman0 from "../images/hangman0.jpg";
import hangman1 from "../images/hangman1.jpg";
import hangman2 from "../images/hangman2.jpg";
import hangman3 from "../images/hangman3.jpg";
import hangman4 from "../images/hangman4.jpg";
import hangman5 from "../images/hangman5.jpg";
import hangman6 from "../images/hangman6.jpg";

const imgs = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
];
const Hangman = () => {
  return (
    <div>
      <img alt="" src={imgs[6]} />
    </div>
  );
};

export default Hangman;

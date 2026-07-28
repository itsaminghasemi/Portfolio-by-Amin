"use strict";

const fruit = {
  red: {
    swrawberry: { a: 1 },
    apple: {},
  },
};

const { red } = fruit;
const { swrawberry } = red;

console.log(swrawberry);

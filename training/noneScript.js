"use strict";

let a = 111;
let b = 222;

const obj = { a: 1, b: 2, c: 3 };

({ a = 2, b = 0 } = obj);

console.log(a, b);

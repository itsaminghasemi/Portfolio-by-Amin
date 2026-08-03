"use strict";

const user = {
  name: "Amin",
  "is-dev": true, // Quotes required for hyphens/spaces
  100: "score", // Number key becomes string "100"
};

const newUser = structuredClone(user);
Object.assign(newUser, { name: "Ishagh", "is-dev": false, 100: "finalScope" });

// Dot Notation (Static, known keys)
console.log(user.name);
console.log(`${newUser.name} - ${newUser["is-dev"]} - ${newUser[100]} `);

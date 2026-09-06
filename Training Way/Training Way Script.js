const message = 'Hello from the console!';
console.log(message);

function createGreeting(name) {
  const greeting = `Hello, ${name}! Welcome`;

  return function () {
    return greeting;
  };
}

const greetAmin = createGreeting('Amin');

console.log(greetAmin());
// "Hello, Amin! Welcome"

const greetAli = createGreeting('Ali');

console.log(greetAli());
// "Hello, Ali! Welcome"

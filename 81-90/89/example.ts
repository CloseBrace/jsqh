// This is how you'd write the code in typescript
const num = 'I like chocolate chip cookies';
const addTen = (n: number) => 10 + n;
console.log(addTen(num));

// And this is the error it would generate!
// Argument of type '"I like chocolate chip cookies"' is not assignable to parameter of type 'number'.
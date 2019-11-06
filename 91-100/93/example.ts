// TypeScript's not just for function params
var myString: string = 'This is a string!';
let myNum: number = 15.547;

// Same deal with objects that need an interface
interface Character {
  name: string;
  email: string;
  age: number;
}
let newChar: Character = {
  name: 'Bojack Horseman',
  email: 'bojack@whattimeisitrightnow.com',
  age: 55,
};

// You often don't need to type const though, because it never changes
const movie = 'Secretariat'; // always a string
const academyAward = false; // always a boolean

// Array consts are always an array ... but it's good to type the internal contents
const shows: string[] = ['Horsin\' Around', 'Philbert'];

// Got an array of objects? No prob. Just use the interface name w/ array syntax
interface Show {
  title: string;
  premiere: number;
  seasons: number;
}
const showsExpanded: Show[] = [
  { title: 'Horsin\' Around', premiere: 1987, seasons: 9 },
  { title: 'Philbert', premiere: 2017, seasons: 2 },
  { title: 'Fake Show', premiere: 2025, seasons: 'none' }, // typescript error!
];
import { greetPerson, stones } from './helpers.js';
import * as babies from './babies.js';
import shoutNames from './helpers.js';

const people = ['John', 'Paul', 'George', 'Ringo'];
people.forEach((name) => {
  console.log(greetPerson(name));
});

const shoutedPeople = shoutNames(people);
shoutedPeople.forEach((name) => {
  console.log(name);
});

console.log(stones);
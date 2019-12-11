// TypeScript's not just for function params
var myString = 'This is a string!';
var myNum = 15.547;
var newChar = {
    name: 'Bojack Horseman',
    email: 'bojack@whattimeisitrightnow.com',
    age: 55
};
// You often don't need to type const though, because it never changes
var movie = 'Secretariat'; // always a string
var academyAward = false; // always a boolean
// Array consts are always an array ... but it's good to type the internal contents
var shows = ['Horsin\' Around', 'Philbert'];
var showsExpanded = [
    { title: 'Horsin\' Around', premiere: 1987, seasons: 9 },
    { title: 'Philbert', premiere: 2017, seasons: 2 },
    { title: 'Fake Show', premiere: 2025, seasons: 'none' },
];

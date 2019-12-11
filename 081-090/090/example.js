// Here's some sample data
// Yes, I know the last boolean is a string. See below!
var albums = [
    { title: 'I’m Like a Virgin Losing a Child', year: 2006, isLongTitle: true },
    { title: 'Mean Everything to Nothing', year: 2009, isLongTitle: true },
    { title: 'Simple Math', year: 2011, isLongTitle: false },
    { title: 'Cope', year: 2014, isLongTitle: false },
    { title: 'A Black Mile to the Surface', year: 2017, isLongTitle: true },
];
// Let's just do something simple with a few types
var logEvenYears = function (title, year) {
    if (year % 2 === 0) {
        console.log(title + " (" + year + ")");
    }
};
albums.forEach(function (album) { return logEvenYears(album.title, album.year); });
// Now let's break the compiler
// (uncomment this to see the error, re-comment to proceed)
/*
const logLongTitles = (title: string, isLongTitle: boolean) => {
  if (isLongTitle) {
    console.log(title);
  }
}
albums.forEach(album => logLongTitles(album.title, album.isLongTitle));
*/
console.log('==============');
var nextAlbumTitle = undefined;
var willItBeALongTitle = 'probably';
var echoString = function (str) {
    if (str) {
        console.log(str);
    }
};
echoString(nextAlbumTitle); // no output
echoString(willItBeALongTitle); // probably

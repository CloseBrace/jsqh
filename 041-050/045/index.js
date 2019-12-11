// Now that we know how to open a file and convert it, let's save the results.
const fs = require('fs');
const csv = require('csvtojson');

const rawData = fs.readFileSync('authors.csv');
const authorData = rawData.toString();

csv().fromString(authorData).then((authorJson) => {

  // Check if the directory exists
  fs.readdir('output', (err, files) => {
    // if it doesn't exist, create it!
    if (err && err.code === 'ENOENT') {
      fs.mkdir('output', (err) => {
         if (err) {
            console.log(err);
         }
      });
    }

    // Our JSON isn't really JSON, it's a JS Object. We need to stringify it!
    const authorJsonString = JSON.stringify(authorJson);

    // Now go ahead and save the file
    fs.writeFile('output/authorData.json', authorJsonString, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});


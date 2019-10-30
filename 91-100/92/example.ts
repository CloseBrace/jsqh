// Here's some data
const team = {
  name: 'Boston Celtics',
  founded: 1946,
  championships: 17,
  division: 'Atlantic',
  goodThisYear: true,
  championsThisYear: 'Probably not',
  starters: ['Walker', 'Brown', 'Tatum', 'Hayward', 'Theis'],
};

// This is terrible. Don't do this.
const logData = (data: {
  name: string;
  founded: number;
  championships: number;
  division: string;
  goodThisYear: boolean;
  championsThisYear: string;
  starters: string[];
}) => {
  for (let [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);
  }
};
logData(team);

console.log("====================");

// Do this instead:
interface Data {
  name: string;
  founded: number;
  championships: number;
  division: string;
  goodThisYear: boolean;
  championsThisYear: string;
  starters: string[];
}

const shoutData = (data: Data) => {
  for (let [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`.toUpperCase());
  }
};
shoutData(team);

console.log("====================");

// This will not match our interface and thus cause compile errors
const team2 = {
  name: 'Los Angeles Clippers',
  founded: 1970,
  championships: 0,
  division: 'Pacific',
  goodThisYear: 'Extremely',
  championsThisYear: 'Very Likely',
  starters: ['Beverley', 'Shamet', 'Leonard', 'George', 'Zubac'],
};
shoutData(team2); // compile error - goodThisYear should be a boolean
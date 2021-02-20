const _ = require('lodash');
const fs = require('fs');

var userData = fs.readFileSync('data/users.json');
function getAgeInYears(date)
{
    var diff = Date.now() - date;
    return Math.floor(diff/31557600000);
}

let users = JSON.parse(userData);
let sortedUsersByBirthday = _
    .chain(users)
    //Just trying out tap, probably not the cleanest way of doing this.
    .tap((arr) => _
        .each(arr, (user) => user.dob = new Date(user.dob)) //date string to date object.
     )
     .sortBy('dob');

//Take the 10 oldest and youngest.
let oldest = sortedUsersByBirthday.take(10);
let youngest = sortedUsersByBirthday.takeRight(10);

var userOutputter = (user) => `${user.first_name} (Age ${getAgeInYears(user.dob)})`;

var oldestPeopleOutput = oldest.map(userOutputter).value();
var youngestPeopleOutput = youngest.map(userOutputter).value();

console.log(`\n***Oldest***\n${oldestPeopleOutput.join('\n')}`);
console.log(`\n***Youngest***\n${youngestPeopleOutput.join('\n')}`);
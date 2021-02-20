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
    .tap((arr) => { _
        .each(arr, (user) => {
            user.dob = new Date(user.dob); //date string to date object.
            user.age = getAgeInYears(user.dob);
        });
    })
    .sortBy('dob');

//Take the 10 oldest and youngest.
let oldest = sortedUsersByBirthday.take(10);
let youngest = sortedUsersByBirthday.takeRight(10);

let userOutputter = (user) => `${user.first_name} (Age ${user.age}})`;

let oldestPeopleOutput = oldest.map(userOutputter).value();
let youngestPeopleOutput = youngest.map(userOutputter).value();

console.log(`\n***Oldest***\n${oldestPeopleOutput.join('\n')}`);
console.log(`\n***Youngest***\n${youngestPeopleOutput.join('\n')}`);

let sumOfAllAges = sortedUsersByBirthday.sumBy('age').value();
let meanOfAllAges = sortedUsersByBirthday.meanBy('age').value();
console.log(`\nSum of all ages: ${sumOfAllAges}`);
console.log(`\nMean of all ages: ${meanOfAllAges}`);

//Is everyone above 14? Could use Array.every but that's not lodash and this is a lodash exercize!
let ageCheck = youngest.every((user) => user.age > 14);
console.log(`All users older than 14: ${ageCheck}`);

//Now the another way to do it, but this requires checking every value.
ageCheck = youngest.minBy('age').get('age').value() > 14;
console.log(`All users older than 14 (Method 2): ${ageCheck}`);

let [under30, overAnd30] = sortedUsersByBirthday.partition((user) => user.age < 30);
console.log(`Ages under 30: ${under30.map(user => user.age)}`);
console.log(`Ages 30 and above: ${overAnd30.map(user => user.age)}`);
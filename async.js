const Stream = require('stream');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
} 

const writableStream = new Stream.Writable();
let count = 0;

const readableStream = new Stream.Readable({
    read() {}
});

writableStream._write = (chunk, encoding, next) => {
  count += parseInt(chunk, 10);
  console.log(count);
  next();
}

async function* randomNumberGenerator(statusInterval) {
    while (count <= 1000) {
        await sleep(100);
        yield Math.random() * 10;
    }
}

async function grabNumbers(generator, interval) {
    for await (const value of generator) {
        readableStream.push(value.toString() + '\n');
    }

    console.log('done!');
    clearInterval(interval);
}

function pleaseWait() {
    return setInterval(() => console.log('Still counting, please understand!'), 2000);
} 

(async function() {
    readableStream.pipe(writableStream);
    const interval = pleaseWait();
    grabNumbers(randomNumberGenerator(), interval);
    //With no await, this messsage will show before counting is finished.
    console.log('Counting to 1000');
}());

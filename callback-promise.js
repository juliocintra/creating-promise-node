const fs = require('fs');

const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
        if (err) {
            reject(err);
        } else {
            resolve(content);
        }
    })
})

// CALLBACK
const set = setTimeout(() => {
    console.log(1);
}, 3000);

const set2 = setTimeout(() => {
    console.log(2);
}, 2000);

const set3 = setTimeout(() => {
    console.log(3);
}, 1000);

const fn = async () => {
    await set;
    await set2;
    await set3;
}

fn();


// PROMISE
const init = async() => {
    console.log('1', await readFile('resources\\games.log'));
}

const init2 = async() => {
    console.log('2', await readFile('resources\\games.log'));
}

const init3 = async() => {
    console.log('3', await readFile('resources\\games.log'));
}

async function teste() {
    await init();
    await init2();
    await init3();
}

teste();
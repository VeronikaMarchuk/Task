const fetch = require("node-fetch");

async function geo(city) {
    const url = `https://geocode.xyz/${city}& auth=39120144182983240596x52327?json=1`;
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        console.log(json.standard.countryname + ' - ' + json.standard.city);
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

geo('Minsk').catch(() => {
    console.log(`not found`)
});
geo('Madrid').catch(() => {
    console.log(`not found`)
});
geo('Rome').catch(() => {
    console.log(`not found`)
});


const Paris = new Promise(
    resolve => resolve('Paris')
);
const Nice = new Promise(resolve => resolve('Nice'));

Promise.race([Paris, Nice]).then(function (value) {
    geo(value).catch(() => {
        console.log(`not found: ${value}`)
    });
});

const foundCountry = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(['Brest', 'ejn', 'Warsaw', 'New York']);
    }, 3000);
});

foundCountry.then((value) => {
    value.forEach(function (item, i, value) {
        geo(item).catch(() => {
            console.log(`not found: ${item}`)
        });
    });
});


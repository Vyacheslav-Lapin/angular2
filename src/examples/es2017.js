function add(x, y) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => x > 0 ? resolve(x + y) : reject("x should be >0"), 1000);
    });
}

async function main() {
    const res = await add(1, 2);
    const res2 = await add(res, 3);
    console.log(res2); //6
}

main();

// Example: fetchJson with async/await (ES7+)
async function fetchJson(url) {
    try {
        // noinspection JSUnresolvedFunction
        const request = await fetch(url);
        const text = request.text();
        return JSON.parse(text);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

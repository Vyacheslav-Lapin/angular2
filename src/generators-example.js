// Generators
function* range(start, end, step) {
    while (start < end) {
        yield start;
        start += step;
    }
}

for (let i of range(0, 10, 2)) {
    console.log(i) // 0, 2, 4, 6, 8
}

// Generators 2
function* genFunc() {
    yield 'a';
    yield 'b';
    return 1;
}

const genObj = genFunc();
genObj.next(); // {value: "a", done: false}
genObj.next(); // {value: "b", done: false}
genObj.next(); //  {value: 1, done: true}

const arr = [...genFunc()]; // ['a', 'b']
console.log(arr);


// example of use
function* objectEntries(obj) {
    // In ES6, you can use strings
    // or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    let propKeys = Reflect.ownKeys(obj);

    for (const propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

let jane = {first: 'Jane', last: 'Doe'};
for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// Output:
// first: Jane
// last: Doe


// recursion
function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}

// Collect all values yielded by bar() in an array
let arr = [...bar()];
// ['x', 'a', 'b', 'y']

// yielding arrays
function* bla() {
    yield 'sequence';
    yield* ['of', 'yielded'];
    yield 'values';
}

let arr = [...bla()];
// ['sequence', 'of', 'yielded', 'values']

// Generators for async calls
it = process();
it.next();

function asyncAdd(x, y) {
    setTimeout(() => it.next(x + y), 1000);
}

function* process() {
    const res = yield asyncAdd(1, 2);
    const res2 = yield asyncAdd(res, 3);
    console.log(res2);
}

// Generators for async calls - (without generators)
function asyncAdd2(x, y, f) {
    setTimeout(() => f(x + y), 1000);
}

asyncAdd2(1, 2, res =>
    asyncAdd2(res, 3, res =>
        console.log(res)));

// Generators for async calls
function add(x, y) {
    return new Promise(resolve =>
        setTimeout(() => resolve(x + y), 1000));
}

run(function* main() {
    const res1 = yield add(1, 2);
    const res2 = yield add(res1, 3);
    console.log(res2);
});

function run(g) {
    const it = g();
    let ret;
    const iterate = val => {
        ret = it.next(val);

        // noinspection JSUnresolvedVariable
        if (!ret.done)
            ret.value.then(iterate); // wait on the promise
        else
            setTimeout(() => iterate(ret.value), 0);  // avoid synchronous recursion
    };
    iterate();
}

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

let jane = { first: 'Jane', last: 'Doe' };
for (let [key,value] of objectEntries(jane)) {
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

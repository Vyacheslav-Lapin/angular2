// Decorators: @readonly
function readonly(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
}
class Meal {
    @readonly
    entree = 'salad';
}

// this is the same as
Object.defineProperty(Meal.prototype, `entree`,
// this is descriptor:
{ value: 'salad',  enumerable: false, configurable: true,  writable: false  });

// let’s check it!
const dinner = new Meal();
dinner.entree = `soup`; // Cannot assign to read only property


// Decorators: enrich class
function superhero(target) {
    target.isSuperhero = true;
    target.power = "flight";
}

@superhero
class MySuperHero {}
console.log(MySuperHero.isSuperhero); // true

// Decorators: enrich class with parameter
function superhero2(isSuperhero) {
    return target =>
        target.isSuperhero = isSuperhero
}

@superhero2(true)
class MySuperheroClass { }
console.log(MySuperheroClass.isSuperhero); // true

@superhero(false)
class MySuperheroClass { }
console.log(MySuperheroClass.isSuperhero); // false

// Decorators: enrich class objects
@makesPhonecalls
class Cellphone {
    constructor() {
        this.model = "Samsung";
        this.storage = 16
    }
}
function makesPhonecalls(target) {
    let callNumber = number => `calling ${number}`;
    // Attach it to the prototype
    target.prototype.callNumber = callNumber
}

// Decorators: limit access
function adminOnly(user) {
    return target => {
        if (!user.isAdmin) {
            log('You do not have sufficient privileges!');
            return false;
        }
    }
}
@adminOnly(currentUser)
function deleteAllUsers() {
    users.delete().then(response => log('You deleted everyone!'));
}

// Decorator as a wrapper
@logger
function logMe() {
    console.log('I want to be logged');
}
// Decorator function for logging
function logger(target, name, descriptor) {
    // obtain the original function
    let fn = descriptor.value;
    // create a new function that wraps the original function
    // we then overwrite the origin descriptor value and return new
    descriptor.value = () => {
        console.log('starting %s', name);
        fn.apply(target, arguments);
        console.log('ending %s', name);
    };
    return descriptor;
}

// Decorator as a wrapper – customization with parameters
@logger('custom message starting %s', 'custom message ending %s')
function logMe() {
    console.log('I want to be logged');
}
function logger(startMsg, endMsg) {
    return (target, name, descriptor) => {
        let fn = descriptor.value;
        descriptor.value = () => {
            console.log(startMsg, name);
            fn.apply(target, arguments);
            console.log(endMsg, name);
        };
        return descriptor;
    }
}
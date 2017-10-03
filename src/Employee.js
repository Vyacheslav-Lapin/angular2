const delay = 1000; // todo make module constant

class Employee extends Person {

    constructor(name, salary, position) {
        super(name);
        this.salary = salary;
        this.position = position;
        this.bonuses = 0;

        Employee._employees.push(this);
    }

    /** @param {Employee} employee */
    static add(employee) {
        return this._employees.push(employee);
    }

    static get list() {
        return this._employees.slice();
    }

    static remove(employee) {
        const indexOf = this._employees.indexOf(employee);
        if (indexOf > -1)
            this._employees.splice(indexOf, 1);
        return indexOf;
    }

    static averageSalary() {
        const employees = this._employees;
        const sum = employees.map(employee => employee.salary)
            .reduce((p1, p2) => p1 + p2);
        return sum / employees.length;
    }

    /**
     * @returns {Promise<Array<number>>} total income of every emloyees
     */
    static totalIncome() {
        const employees = this._employees;
        return Promise.all(employees
            .map(employee => employee.total()));
    }

    static *[Symbol.iterator]() {
        yield* this._employees;
    }

    static *names() {
        yield* [...Employee].map(employee => employee.name);
    }

    total() {
        return new Promise(resolve =>
            setTimeout(() => resolve(this.salary + this.bonuses), delay));
    }

    /** @override */
    getInfo() {
        return `${super.getInfo()}, working on ${this.position} position`;
    }

    bonus() {
        const {random, round} = Math;

        return new Promise(resolve =>
            setTimeout(() => resolve(round(random() * 1000)), delay))
            .then(bonus => this.bonuses += bonus);
    }
}

/** @type Array<Employee> */
Employee._employees = [];


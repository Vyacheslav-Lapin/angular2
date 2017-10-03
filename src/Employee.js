class Employee extends Person {

    /** @param {Employee} employee */
    static add(employee) {
        return this._list.push(employee);
    }

    static get list() {
        return this._list.slice();
    }

    static remove(employee) {
        const indexOf = this._list.indexOf(employee);
        if (indexOf > -1)
            this._list.splice(indexOf, 1);
        return indexOf;
    }

    constructor(name, salary, position) {
        super(name);
        this.salary = salary;
        this.position = position;

        Employee._list.push(this);
    }

    /** @override */
    getInfo() {
        return `${super.getInfo()}, working on ${this.position} position`;
    }
}

/** @type Array<Employee> */
Employee._list = [];
class Employee extends Person {
    constructor(name, salary, position) {
        super(name);
        this.salary = salary;
        this.position = position;
    }

    /** @override */
    getInfo() {
        return `${super.getInfo()}, working on ${this.position} position`;
    }
}
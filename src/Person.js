export default class Person {
    constructor(name) {
        // todo validate
        this._name = name;
    }

    getInfo() {
        return `I'm ${this.name}`;
    }

    get name() {
        return this._name;
    }

    set name(name) {

        console.log("проверяем устанавливаемое имя");

        if (name.length <= 3)
            throw "Имя слишком короткое - должно быть не менее 3-х символов";

        console.log("устанавливаем имя");

        this._name = name;

        console.log("устанавили имя");
    }
}
const vasyaPupkin = new Employee();
vasyaPupkin.name = "Вася Пупкин";
vasyaPupkin.salary = 50;
vasyaPupkin.position = "cleaner";
const info = vasyaPupkin.getInfo();
const fedyaBarigin = new Employee("Фёдор Барыгин", 115, "manager");
// document.querySelector("div#out").innerHTML += `<br/>${fedyaBarigin.getInfo()}`;

println(
    Employee.averageSalary()
);

Employee.remove(vasyaPupkin);

const printBonus = ({name}, bonus) =>
    println(
        `Работник ${name}
        получает бонус в размере ${bonus} долларов`);

for (const employee of Employee.list) {
    employee.bonus()
        .then(bonus => printBonus(employee, bonus));
    println(employee.getInfo());
}

function println(text) {
    document.querySelector("div#out").innerHTML +=
        `${text}<br/>`;
}

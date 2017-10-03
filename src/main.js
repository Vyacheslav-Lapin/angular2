const vasyaPupkin = new Employee();
vasyaPupkin.name = "Вася Пупкин";
vasyaPupkin.salary = 50;
vasyaPupkin.position = "cleaner";
const info = vasyaPupkin.getInfo();
const fedyaBarigin = new Employee("Фёдор Барыгин", 115, "manager");
// document.querySelector("div#out").innerHTML += `<br/>${fedyaBarigin.getInfo()}`;

Employee.remove(vasyaPupkin);

for (const employee of Employee.list) {
    document.querySelector("div#out").innerHTML +=
        `${employee.getInfo()}<br/>`;
}
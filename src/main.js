import Employee from './Employee';

const vasyaPupkin = new Employee();
vasyaPupkin.name = "Вася Пупкин";
vasyaPupkin.salary = 50;
vasyaPupkin.position = "cleaner";

const info = vasyaPupkin.getInfo();
const fedyaBarigin = new Employee("Фёдор Барыгин", 115, "manager");

Employee.getAllInfoAsync(println);

// for (let employeeName of Employee.names())
//     println(employeeName);
//
// println(
//     Employee.averageSalary()
// );
//
// Employee.remove(vasyaPupkin);
//
// const printBonus = ({name}, bonus) =>
//     println(
//         `Работник ${name}
//         получает бонус в размере ${bonus} долларов`);
//
// for (const employee of Employee) {
//     employee.bonus()
//         .then(bonus => printBonus(employee, bonus));
//
//     println(employee.getInfo());
// }
//
// Employee.totalIncome()
//     .then(incomes => incomes.reduce((p1, p2) => p1 + p2))
//     .then(totalIncome => println(
//         `Суммарные выплаты составили ${totalIncome}`));

function println(text) {
    document.querySelector("div#out").innerHTML +=
        `${text}<br/>`;
}

async function printBonus() {
    println("<br>Async/await version:<br>");
    for (let e of Employee) {
        let bonus = await e.bonus();
        println(`${e.name} bonus: ${bonus} 
              total: ${e.salary + bonus}<br>`);
    }
}

printBonus();
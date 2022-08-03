let title = prompt("Как называется ваш проект?", `Сайта "Автоуслуги"`);
let screens = prompt("Какие типы экранов нужно разработать?", "Простые");
let screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
let rollback = 100;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Тип1");
let servicePrice1 = +prompt("Сколько это будет стоить?", "12000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Тип2");
let servicePrice2 = +prompt("Сколько это будет стоить?", "12000");

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let percentRollback = fullPrice * (rollback / 100);
let servicePercentPrice = fullPrice - Math.ceil(fullPrice * (rollback / 100));

if (fullPrice > 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice > 15000 && fullPrice <= 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice <= 15000 && fullPrice >= 0) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что то пошло не так");
}

console.log(servicePercentPrice);
console.log(`Процент отката посреднику за работу ${percentRollback}`);

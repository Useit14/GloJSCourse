let title = "GloJSCourse_Lesson02";
let screens = "Simple, Hard, Interactive";
let screenPrice = 14;
let rollback = 100;
let fullPrice = 200000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(
  `Стоимость верстки экранов ${screenPrice} рублей и Стоимость разработки сайта ${fullPrice} рублей`
);

let lowScreens = screens.toLowerCase();
let substrScreens = lowScreens.split(", ");
console.log(substrScreens);

let percentRollback = fullPrice * (rollback / 100);
console.log(`Процент отката посреднику за работу ${percentRollback}`);

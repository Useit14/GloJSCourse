let title = prompt("Как называется ваш проект?", `Сайта "Автоуслуги"`);
let screens = prompt("Какие типы экранов нужно разработать?", "Простые");
let screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
let rollback = 100;
let fullPrice = 200000;
let adaptive = confirm("Нужен ли адаптив на сайте?");

let lowScreens = screens.toLowerCase();
let substrScreens = lowScreens.split(",", " ");

let percentRollback = fullPrice * (rollback / 100);
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Тип1");
let servicePrice1 = +prompt("Сколько это будет стоить?", "12000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Тип2");
let servicePrice2 = +prompt("Сколько это будет стоить?", "12000");

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = fullPrice - Math.ceil(fullPrice * (rollback / 100));
console.log(servicePercentPrice);

function getRolbackMessage(fullPrice) {
  if (fullPrice > 30000) {
    return "Даем скидку в 10%";
  } else if (fullPrice > 15000 && fullPrice <= 30000) {
    return "Даем скидку в 5%";
  } else if (fullPrice <= 15000 && fullPrice >= 0) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
}

const allServicePrice = function getAllServicePrices(
  servicePrice1,
  servicePrice2
) {
  return servicePrice1 + servicePrice2;
};

function getFullPrice(screenPrice, allServicePrice) {
  return screenPrice + allServicePrice(servicePrice1, servicePrice2);
}

fullPrice = getFullPrice(screenPrice, allServicePrice);

function getTitle(title) {
  let arrayTitle = title.split(" ");
  let result = new Array(arrayTitle.length);
  let counCappitalLetter = 0;
  for (let i = 0; i < arrayTitle.length; i++) {
    result[i] = [];
    for (let index = 0; index < arrayTitle[i].length; index++) {
      const element = arrayTitle[i][index];
      if (element != " ") {
        result[i].push(element.toLowerCase());
      }
    }
    for (let index = 0; index < arrayTitle[i].length; index++) {
      let element = result[i][index];
      if (counCappitalLetter == 0) {
        if (/[a-я]/.test(element) || /[a-z]/.test(element)) {
          result[i][index] = element.toUpperCase();
          counCappitalLetter++;
          break;
        }
      } else if (element == `"`) {
        result[i][index + 1] = result[i][index + 1].toUpperCase();
        break;
      }
    }
    result[i] = result[i].join("");
  }
  return result.join(" ");
}

servicePercentPrice = function getServicePercentPrices(fullPrice, rollback) {
  return fullPrice - Math.ceil(fullPrice * (rollback / 100));
};

function showTypeOf(element) {
  console.log(element + " " + typeof element);
}

showTypeOf(getTitle(title));
showTypeOf(fullPrice);
showTypeOf(adaptive);
console.log(screens);
console.log(getRolbackMessage(fullPrice));
console.log(
  "Cтоимость за вычетом процента отката посреднику " +
    servicePercentPrice(fullPrice, rollback)
);

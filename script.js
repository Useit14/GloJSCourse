let title;
let screens;
let screenPrice;
let rollback = 30;
let adaptive;

let service = [];

function asking() {
  do {
    title = prompt("Как называется ваш проект?", `Сайта "Автоуслуги"`);
  } while (isNumber(title));

  do {
    screens = prompt("Какие типы экранов нужно разработать?", "Простые");
  } while (isNumber(screens));

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
  } while (!isNumber(screenPrice));
  adaptive = confirm("Нужен ли адаптив на сайте?");

  for (let index = 0; index < service.length; index++) {
    if (index % 2 == 0) {
      do {
        service[index] = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Тип"
        );
      } while (isNumber(service[index]));
    } else {
      do {
        service[index] = prompt("Сколько это будет стоить?", "12000");
      } while (!isNumber(service[index]));
    }
  }
}

function isNumber(num) {
  return !isNaN(parseFloat(num) && isFinite(num));
}

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

function getAllServicePrices(service) {
  let sum = 0;
  for (let index = 0; index < service.length; index++) {
    const element = service[index];
    if (index % 2 != 0) {
      sum += +element;
    }
  }
  return sum;
}

asking();

function getFullPrice(screenPrice, allServicePrice) {
  return +screenPrice + allServicePrice;
}

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

function showTypeOf(element) {
  console.log(element + " " + typeof element);
}

const allServicePrice = getAllServicePrices(service);
let fullPrice = getFullPrice(screenPrice, allServicePrice);
let servicePercentPrice = function getServicePercentPrices(
  fullPrice,
  rollback
) {
  return fullPrice - Math.ceil(fullPrice * (rollback / 100));
};

showTypeOf(getTitle(title));
showTypeOf(fullPrice);
showTypeOf(adaptive);
console.log(screens);
console.log(getRolbackMessage(fullPrice));
console.log(
  "Cтоимость за вычетом процента отката посреднику " +
    servicePercentPrice(fullPrice, rollback)
);

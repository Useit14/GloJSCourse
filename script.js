const title = document.getElementsByTagName("h1")[0];
const handlerBtn = document.getElementsByClassName("handler_btn");
const screenBtn = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items + .percent");
const numberItems = document.querySelectorAll(".other-items + .number");
const inputRange = document.querySelector(".rollback input[type=range] ");
const rangeValue = document.querySelector(".rollback span.range-value");
const totalInputs = document.getElementsByClassName("total-input");
let input1 = totalInputs[0];
let input2 = totalInputs[1];
let input3 = totalInputs[2];
let input4 = totalInputs[3];
let input5 = totalInputs[4];
let screenElements = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  allServicePrice: 0,
  rollback: 30,
  adaptive: true,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrice(appData.screens, appData.services);
    appData.getFullPrice(appData.screenPrice, appData.allServicePrice);
    appData.getTitle(appData.title);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.logger();
  },
  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        `Сайта "Автоуслуги"`
      );
    } while (appData.isNumber(appData.title));

    for (let index = 0; index < 2; index++) {
      let name;
      do {
        name = prompt("Какие типы экранов нужно разработать?", "Простые");
      } while (appData.isNumber(name));

      let price = 0;
      do {
        price = prompt("Сколько это будет стоить?", "1000");
      } while (!appData.isNumber(price));
      appData.screens.push({ id: index, name, price: +price });
    }

    for (let index = 0; index < 2; index++) {
      let name;
      do {
        name = prompt("Какой дополнительный тип услуги нужен?", "Тип");
      } while (appData.isNumber(name));

      let price = 0;
      do {
        price = prompt("Сколько это будет стоить?", "12000");
      } while (!appData.isNumber(price));
      appData.services[name + index] = +price;
    }

    do {
      appData.screenPrice = prompt(
        "Сколько будет стоить данная работа?",
        "12000"
      );
    } while (!appData.isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrice: function (screens, services) {
    appData.screenPrice = screens.reduce(
      (previousValue, currentValue) => currentValue.price + previousValue,
      0
    );

    for (const key in services) {
      if (services.hasOwnProperty(key)) {
        appData.allServicePrice += services[key];
      }
    }
  },
  getTitle: function (title) {
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
    appData.title = result.join(" ");
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getRolbackMessage: function (fullPrice) {
    if (fullPrice > 30000) {
      return "Даем скидку в 10%";
    } else if (fullPrice > 15000 && fullPrice <= 30000) {
      return "Даем скидку в 5%";
    } else if (fullPrice <= 15000 && fullPrice >= 0) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },

  getFullPrice: function (screenPrice, allServicePrice) {
    appData.fullPrice = +screenPrice + allServicePrice;
  },
  getServicePercentPrices: function (fullPrice, rollback) {
    appData.servicePercentPrice =
      fullPrice - Math.ceil(fullPrice * (rollback / 100));
  },
  logger: function () {
    for (const key in appData) {
      if (Object.hasOwnProperty.call(appData, key)) {
        console.log(key + " " + appData[key]);
      }
    }
  },
};

appData.start();

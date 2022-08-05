const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  rollback: 30,
  adaptive: true,
  service: new Array(4),
  start: function () {
    appData.asking();
    appData.allServicePrice = appData.getAllServicePrices(appData.service);
    appData.fullPrice = appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrice
    );
    appData.title = appData.getTitle(appData.title);
    appData.servicePercentPrice = appData.getServicePercentPrices(
      appData.fullPrice,
      appData.rollback
    );
    appData.logger();
  },
  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        `Сайта "Автоуслуги"`
      );
    } while (appData.isNumber(appData.title));

    do {
      appData.screens = prompt(
        "Какие типы экранов нужно разработать?",
        "Простые"
      );
    } while (appData.isNumber(appData.screens));

    do {
      appData.screenPrice = prompt(
        "Сколько будет стоить данная работа?",
        "12000"
      );
    } while (!appData.isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

    for (let index = 0; index < appData.service.length; index++) {
      if (index % 2 == 0) {
        do {
          appData.service[index] = prompt(
            "Какой дополнительный тип услуги нужен?",
            "Тип"
          );
        } while (appData.isNumber(appData.service[index]));
      } else {
        do {
          appData.service[index] = prompt("Сколько это будет стоить?", "12000");
        } while (!appData.isNumber(appData.service[index]));
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
    return result.join(" ");
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num) && isFinite(num));
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
  getAllServicePrices: function (service) {
    let sum = 0;
    for (let index = 0; index < service.length; index++) {
      const element = service[index];
      if (index % 2 != 0) {
        sum += +element;
      }
    }
    return sum;
  },
  getFullPrice: function (screenPrice, allServicePrice) {
    return +screenPrice + allServicePrice;
  },
  getServicePercentPrices: function (fullPrice, rollback) {
    return fullPrice - Math.ceil(fullPrice * (rollback / 100));
  },
  logger: function () {
    for (const key in appData) {
      if (Object.hasOwnProperty.call(appData, key)) {
        const element = appData[key];
        console.log(key + " " + element);
      }
    }
  },
};

appData.start();

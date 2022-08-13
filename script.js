const title = document.getElementsByTagName("h1")[0];
const handlerCalculate = document.getElementsByClassName("handler_btn")[0];
const handlerReset = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");
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
  countScreens: 0,
  screenPrice: 0,
  servicePricePercent: 0,
  servicePriceNumber: 0,
  rollback: 30,
  adaptive: true,
  calculate: false,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    handlerCalculate.addEventListener("click", appData.start);
    screenBtn.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.handlerRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    if (appData.isInsertDate()) {
      return;
    }
    appData.calculate = true;
    appData.addScreens();
    appData.addServices();
    appData.addPrice(
      appData.screens,
      appData.servicesNumber,
      appData.servicesPercent
    );
    // appData.logger();
    appData.showResult();
  },
  isInsertDate: function () {
    let result = true;
    appData.screens.forEach((element) => {
      if (element.name != "Тип экранов" || element.price != 0) {
        result = false;
      }
    });
    return result;
  },
  showResult: function () {
    input1.value = appData.screenPrice;
    input2.value = appData.countScreens;
    input3.value = appData.servicePricePercent + appData.servicePriceNumber;
    input4.value = appData.fullPrice;
    input5.value = appData.priceRollback;
  },
  addScreens: function () {
    screenElements = document.querySelectorAll(".screen");
    screenElements.forEach((screenElement, index) => {
      const select = screenElement.querySelector("select");
      const input = screenElement.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addServices: function () {
    percentItems.forEach((element) => {
      const check = element.querySelector("input[type=checkbox]");
      const label = element.querySelector("label");
      const input = element.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    numberItems.forEach((element) => {
      const check = element.querySelector("input[type=checkbox]");
      const label = element.querySelector("label");
      const input = element.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });

    console.log(appData);
  },
  addScreenBlock: function () {
    const cloneScreens = screenElements[0].cloneNode(true);
    const input = cloneScreens.querySelector("input[type=text]");
    input.value = "";
    screenElements[screenElements.length - 1].after(cloneScreens);
  },
  handlerRollback: function (e) {
    rangeValue.textContent = e.target.value + "%";
    appData.rollback = e.target.value;
    if (appData.calculate) {
      appData.priceRollback =
        appData.fullPrice -
        Math.ceil(appData.fullPrice * (appData.rollback / 100));

      appData.showResult();
    }
  },
  addPrice: function (screens, servicesPrice, servicesPercent) {
    appData.screenPrice = screens.reduce(
      (previousValue, currentValue) => currentValue.price + previousValue,
      0
    );

    for (const key in servicesPrice) {
      if (servicesPrice.hasOwnProperty(key)) {
        appData.servicePriceNumber += servicesPrice[key];
      }
    }

    for (const key in servicesPercent) {
      if (servicesPercent.hasOwnProperty(key)) {
        appData.servicePricePercent +=
          (appData.screenPrice * servicesPercent[key]) / 100;
      }
    }
    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePriceNumber +
      appData.servicePricePercent;

    appData.priceRollback =
      appData.fullPrice -
      Math.ceil(appData.fullPrice * (appData.rollback / 100));

    screens.forEach((element) => {
      appData.countScreens += element.count;
    });
  },
  logger: function () {
    for (const key in appData) {
      if (Object.hasOwnProperty.call(appData, key)) {
        console.log(key + " " + appData[key]);
      }
    }
  },
};

appData.init();

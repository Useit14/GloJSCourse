const title = document.getElementsByTagName("h1")[0];
const handlerCalculate = document.getElementsByClassName("handler_btn")[0];
const handlerReset = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input[type=range] ");
const rangeValue = document.querySelector(".rollback span.range-value");
const totalInputs = document.getElementsByClassName("total-input");
const cmsOpen = document.getElementById("cms-open");
let input1 = totalInputs[0];
let input2 = totalInputs[1];
let input3 = totalInputs[2];
let input4 = totalInputs[3];
let input5 = totalInputs[4];
let screenElements = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  controls: [],
  countScreens: 0,
  screenPrice: 0,
  servicePricePercent: 0,
  servicePriceNumber: 0,
  rollback: 0,
  adaptive: true,
  calculate: false,
  percentCMS: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    this.addTitle();
    handlerCalculate.addEventListener("click", this.start);
    screenBtn.addEventListener("click", this.addScreenBlock);
    inputRange.addEventListener("input", this.handlerRollback);
    handlerReset.addEventListener("click", this.reset);
    cmsOpen.addEventListener("click", this.showCMS);
  },
  showCMS: function () {
    const cms = document.querySelector(".hidden-cms-variants");
    if (cms.attributes.style.value.includes("none")) {
      cms.style = "display:flex";
    } else {
      cms.style = "display:none";
    }
    cms.querySelector("select").addEventListener("change", (e) => {
      const input = cms.querySelector(".main-controls__input");
      if (e.target.value == "other") {
        if (input.attributes.style.value.includes("none")) {
          input.style = "display:flex";
        }
        const subInput = input.querySelector("input");
        subInput.addEventListener("change", function () {
          debugger;
          appData.percentCMS = +subInput.value;
        });
      } else if (e.target.value == "50") {
        appData.percentCMS = 50;
      } else {
        input.style = "display:none";
      }
    });
    debugger;
  },
  reset: function () {
    appData.controls.forEach((item) => {
      if (item.localName == "select") {
        item[0].selected = true;
      } else if ((item.localName = "input")) {
        if (item.value / 2) {
          item.value = 0;
        } else {
          item.checked = false;
        }
      }
      item.disabled = false;
      console.dir(appData);
    });
    for (const key in appData) {
      debugger;
      if (Object.hasOwnProperty.call(appData, key)) {
        switch (typeof appData[key]) {
          case "number":
            appData[key] = 0;
            break;
          case "object":
            if (appData[key][0]) {
              appData[key] = [];
            } else {
              appData[key] = {};
            }
            break;
        }
      }
    }
    inputRange.value = 0;
    rangeValue.textContent = inputRange.value;
    screenElements = document.getElementsByClassName("screen");
    while (screenElements.length != 1) {
      screenElements[screenElements.length - 1].remove();
    }

    document.querySelector(".hidden-cms-variants").style = "display:none";
    handlerCalculate.style = "display:block";
    handlerReset.style = "display:none";
    appData.showResult();
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.calculate = true;
    appData.addScreens();
    if (appData.isInsertDate()) {
      return;
    }
    appData.addServices();
    appData.addPrice(
      appData.screens,
      appData.servicesNumber,
      appData.servicesPercent
    );
    // appData.logger();
    appData.addControls();
    appData.showResult();
    appData.disable();
  },
  addControls: function () {
    const mainControls = document.querySelector(".main-controls");
    const mainControlsScreen = document.querySelectorAll(
      ".main-controls__views"
    )[0];

    mainControls
      .querySelectorAll("select[name=views-select]")
      .forEach((item) => {
        appData.controls.push(item);
      });
    mainControlsScreen.querySelectorAll("input[type=text]").forEach((item) => {
      appData.controls.push(item);
    });
    appData.controls.push(screenBtn);
    mainControls.querySelectorAll("input[type=checkbox]").forEach((item) => {
      appData.controls.push(item);
    });
    appData.controls.push(inputRange);
  },
  disable: function () {
    appData.controls.forEach((item) => {
      item.disabled = true;
    });
    handlerCalculate.style = "display:none";
    handlerReset.style = "display:block";
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
      if (+input.value == 0 || selectName == "Тип экранов") {
        appData.screens = [];
        return;
      }
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
    screenElements = document.querySelectorAll(".screen");
    const cloneScreens = screenElements[0].cloneNode(true);
    const input = cloneScreens.querySelector("input[type=text]");
    input.value = "";
    screenElements[screenElements.length - 1].after(cloneScreens);
    appData.addControls();
  },
  handlerRollback: function (e) {
    rangeValue.textContent = e.target.value + "%";
    appData.rollback = +e.target.value;
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
      (appData.screenPrice * appData.percentCMS) / 100 +
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

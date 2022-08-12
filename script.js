let books = document.querySelectorAll(".book");
let uls = document.querySelectorAll(".book ul");
let ul2Li = uls[0].querySelectorAll("li");
let ul5Li = uls[5].querySelectorAll("li");
let ul6 = uls[2];

books[1].after(books[0]);
books[5].after(books[2]);
books[0].after(books[4]);

ul2Li[3].after(ul2Li[6]);
ul2Li[6].after(ul2Li[8]);
ul2Li[9].after(ul2Li[2]);
ul5Li[1].after(ul5Li[9]);
ul5Li[9].after(ul5Li[3]);
ul5Li[3].after(ul5Li[4]);
ul5Li[7].after(ul5Li[5]);

ul6.insertAdjacentHTML("afterend", "<li>Глава 8: За пределами ES6</li>");
debugger;
let titleBook = books[4].querySelector("h2");
let aTitleBook = titleBook.querySelector("a");
aTitleBook.textContent = "Книга 3. this и Прототипы Объектов";

document.querySelector(".adv").remove();

document.body.style = "background:url(./image/you-dont-know-js.jpg)";

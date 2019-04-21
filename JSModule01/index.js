'use strict';

//task 01

let message;
const ADMIN_PASSWORD = 'm4ng0h4ckz';

const userInput = prompt('Пожалуйста, введите пароль!');

if(userInput === null) {
  console.log(message = 'Отменено пользователем!');
}else if (userInput === ADMIN_PASSWORD){
  console.log(message = 'Добро пожаловать!');
}else {
  console.log(message = 'Доступ запрещен, неверный пароль!');
}
alert(message);

//task 02

const credits = 23580;
const pricePerDroid = 3000;

let totalPrice;

let userInput = prompt('Укажите количество дроидов Вы желаете приобрести');

if (userInput === null){
  console.log('Отменено пользователем!');
}else {
  totalPrice = pricePerDroid * userInput;
  console.log(totalPrice);
    if (totalPrice > credits) {
      console.log('Недостаточно средств на счету!');
    } else {
      console.log(`Вы купили ${userInput} дроидов, на счету осталось ${credits - totalPrice} кредитов.`);
    } 
}

//task 03

let userInput = prompt('Введите страну доставки!');

let priceChina =  100;
let priceNorthAmerica = 250;
let priceAustralia = 170;
let priceIndia = 80;
let priceJamaica =  120;

if(userInput === null){
  console.log('Отменено пользователем');
}else {
  switch(userInput = userInput.toLowerCase()){
    case 'китай':
    console.log(`'Доставка в ${userInput} будет стоить ${priceChina} кредитов'`);
    break;
    case 'южная америка':
    console.log(`'Доставка в ${userInput} будет стоить ${priceNorthAmerica} кредитов'`);
    break;
    case 'австралия':
    console.log(`'Доставка в ${userInput} будет стоить ${priceAustralia} кредитов. '`);
    break;
    case 'индия':
    console.log(`'Доставка в ${userInput} будет стоить ${priceIndia} кредитов.'`);
    break;
    case 'ямайка':
    console.log(`'Доставка в ${userInput} будет стоить ${priceJamaica} кредитов. '`);
    break;
    default:
    console.log('В Вашей стране доставка не доступна');
  }
}

'use strict';

//task 01

let input;
const numbers = [];
let total = 0;

do {
  input = prompt('Enter a number');
  if(Number.isNaN(Number(input))){
    alert('Было введено не число, попробуйте еще раз');
  }

   numbers.push(Number(input));

} while(input !== null);

for(const number of numbers) {
  total += number;
}
console.log(`'Общая сумма чисел равна ${total}'`);


//task 02

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;

let userInput;

do{
  userInput = prompt('Enter a password');

  if(passwords.includes(userInput)){
    alert('Добро пожаловать!');
    break;
  }

  attemptsLeft -= 1;

  if(attemptsLeft) {
  alert(`'Неверный пароль, у вас осталось ${attemptsLeft} попыток'`);
  } else{
    alert('У вас закончились попытки, аккаунт заблокирован!');
  }

}while(attemptsLeft > 0)


'use strict'

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const isLoginValid = function(login) {
  if(login.length >= 4 && login.length <= 16){
    return true;
  }
  return false;
}

const isLoginUnique = function(logins, login) {
  if(logins.includes(login)){
    return false;
  }
  return true;
}

const addLogin = function(logins, login) {
  if(isLoginValid(login) === false){
    return 'Ошибка! Логин должен быть от 4 до 16 символов';
  }

  if(isLoginUnique(logins, login) === false){
    return 'Такой логин уже используется!';
    } else{
      logins.push(login);
      return ('Логин успешно добавлен!');
    }
} 

console.log(addLogin(logins, 'Ajax')); // 'Логин успешно добавлен!'
console.log(addLogin(logins, 'robotGoogles')); // 'Такой логин уже используется!'
console.log(addLogin(logins, 'Zod')); // 'Ошибка! Логин должен быть от 4 до 16 символов'
console.log(addLogin(logins, 'jqueryisextremelyfast')); // 'Ошибка! Логин должен быть от 4 до 16 символов'



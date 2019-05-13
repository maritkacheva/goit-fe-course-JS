'use strict'

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
let login = prompt('Enter your login!');

const isLoginValid = function(login) {

  if(login.length < 4 || login.length > 16){
    alert('Ошибка! Логин должен быть от 4 до 16 символов'); 
    return false;
  }
 return true; 
}

const isLoginUnique = function(logins, login) {
  if((logins.includes(login))){
    alert('Такой логин уже используется!');
    return false;
  }
  return true;
};

const addLogin = function(logins, login) {
  if(isLoginValid(login)){  
     if(isLoginUnique(logins, login)){
      logins.push(login);
      alert('Логин успешно добавлен!');
    }
  } 
};

addLogin(logins, login);



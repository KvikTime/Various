// Функция создает поле с выбором количества карточек
'use strict';
document.addEventListener('DOMContentLoaded', () =>{

  const CONTAINER = document.createElement('div');
  const HINT = document.createElement('span')

  let formSize = document.createElement('form'); // Создание формы
  let inputSize = document.createElement('input') // Создание поля ввода
  let buttonWrapper =  document.createElement('div'); // Создание обертки кнопки
  let buttonStartGame =  document.createElement('button'); // Создание кнопки

  let endText = document.createElement('div'); // Создание блока с текстом 'Победа!'и 'Время вышло'
  let textWinGame = document.createElement('p'); // Создание обертки текста
  let textEndTime = document.createElement('p'); // Создание обертки текста

  let blockTime = document.createElement('div') // Создание блока с таймером внутри
  let description = document.createElement('p')
  let time = document.createElement('span')

  HINT.textContent='Введите четное число от 2 до 10'// Текст подсказски снизу
  textWinGame.textContent = 'Победа!' // Текст при поеде
  textEndTime.textContent = 'Время вышло'
  description.textContent = 'Осталось (сек): '
  buttonStartGame.textContent = 'Начать игру'; // Текст внутри кнопки "Начать игру"
  inputSize.placeholder = 'Количество карточек по вертикали/горизонтали'; // Присвоение подсказки для поя ввода

  CONTAINER.classList.add('container') // Присвоение класса для контейнера
  endText.classList.add('end-game') // Присвоение класса обертки текста "Игра окончена"
  textWinGame.classList.add('win') // Присвоение класса для параграфа с текстом
  textEndTime.classList.add('end-time')
  formSize.classList.add('input-group'); // Присвоение классов для формы
  inputSize.classList.add('form-control');  // Присвоение класса для поля ввода
  blockTime.classList.add('block-time')
  description.classList.add('decr')
  time.classList.add('time')
  buttonWrapper.classList.add('input-group-append'); // Присвоение класса для обертки кнопки
  buttonStartGame.classList.add('btn')  // Присвоение классов для кнопки
  HINT.classList.add('span-hint') // Присвоение класса для подсказки

  buttonWrapper.append(buttonStartGame); // Запись кнопки внутрь обертки
  endText.append(textWinGame, textEndTime); 
  blockTime.append(description, time ); 
  formSize.append(inputSize, buttonWrapper); // Запись поля ввода в форму
  CONTAINER.append(formSize, HINT, endText ) // Запись формы в container
  document.body.append(CONTAINER) // Запись контейнера в body

  let sizeField; // Пременная, принимающая значение из поля ввода
  let timer; // Примет функцию с таймером
  let GENERALCARDS; // Переменная будет принимать все карточки
  
  function inputValue(){
    sizeField = Number(inputSize.value); //Принимает значение из input
    let countSize;

    sizeField % 2 === 0 && sizeField < 11 && sizeField > 0 ? countSize = (sizeField * sizeField) / 2 : inputSize.value = 4 // Число должно без остатка делиться на 2, быть меньше 11 и больше 0.
    return countSize
  }

  function createNumbersArray(count) { // Создаем массив парных чисел и возвращаем его
    let countArray = []
    for(let i = 1; i <= count; ++i) {
      countArray.push(i, i); // Два раза записываем каждое число
    }
    return countArray
  };

  function shuffle(arr) { // Перемешиваем массив
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  function createInner(){
    let existenceInner = document.querySelector('.cards-wrapper')

    if (existenceInner) { // Если в документе уже есть карточки, удаляем их
      existenceInner.remove()
    };

    let cardsWrapper = document.createElement('div'); // Обертка для карточек
    cardsWrapper.classList.add('cards-wrapper'); // Класс обертки карточек
    cardsWrapper.style.gridTemplateColumns = `repeat( ${sizeField}, 80px)`; // Добавляем стили с количеством карточек
    cardsWrapper.style.position = 'relative'; // Добавляем стили с количеством карточек
    return cardsWrapper
  }
  
  function createCards(objArr, inner){
    for (let data of objArr){
      let card = document.createElement('div'); // Создаем карточку
      card.classList.add('card');  // Присвоение класса карточки , 'active'
      card.textContent = data; // Текст внутри карточки такой же как порядковый номер
      inner.append(card);  // Добавляем карточку в обертку
    }
    return inner;
  };

  function timeOut(){
    let display = document.querySelector('.time'); // меняющаяся цифра
    let timeLeft = parseInt(display.innerHTML); // оставшееся время
    if (--timeLeft >= 0) { // если таймер всё еще больше нуля
      display.innerHTML = timeLeft // обновляем цифру
    } else {
      endGame();
      clearInterval(timer) // удаляем таймер
      textEndTime.style.display = 'block'
    }
  }

  function endGame(){ 
    for(let x of GENERALCARDS){
      x.style.opacity = '0'
      x.style.cursor = 'default'
      x.style.display = 'none'
    } 
    setTimeout(() => {
    endText.style.display = 'flex'
    }, 500);
    clearInterval(timer)
  }

  buttonStartGame.addEventListener('click', function(e) { // Код внутри будет срабатывать при клике на кнопку "Начать игру"
    e.preventDefault();
    endText.style.display = 'none'; // Скрыть надписи
    textWinGame.style.display = 'none'
    textEndTime.style.display = 'none'

    let generateArray = createNumbersArray(inputValue());
    let randomArray = shuffle(generateArray);
    let innerCards = createInner()
    let clickButton = createCards(randomArray, innerCards)

    let cardOne = null; // Первая открытая карточка
    let cardTwo = null; // Вторая открытая карточка
    let target; // Обект на который будет происходить нажатие
    let control = []; // Пассив учета открытых карточек (не более 2шт)
    
    clearInterval(timer)

    if(randomArray.length !== 0){
      time.textContent = '60'
      CONTAINER.append(blockTime);
      timer = setInterval(timeOut, 1000);
    }

    CONTAINER.append(clickButton); // Запись формы в container
    
    GENERALCARDS = document.querySelectorAll('.card'); // Все карточки 

    function openCard(){
      if(cardOne === null){ // Если в первой карточке null, записываем в переменную cardOne обект
        cardOne = target;
        control.push(cardOne) // Записываем в массив первую карточку
      }
      else{
        cardTwo = target; // Если в первой карточке что то есть, записываем в переменную cardTwo обект
        control.push(cardTwo) // Записываем в массив вторую карточку
      };
    }

    clickButton.addEventListener('click', function(event){
      target = event.target;
      
      if(control.length === 2){ // Если уже открыты 2 карточки, ничего не происходит
        return [];
      }
      else{
        readCard(); // Если нет, запускаем функцию проверки нажатой карточки
      }

      function readCard(){
        if(target.classList.contains('card') && target.classList.contains('active') || target.classList.contains('cards-wrapper')){ // Если кликают на открутую, то ничего не происходит
          return [];
        }
        else{ // Если кликают на закрытую, то показываем содержимое
          target.classList.add('active') // И запускаем функцию записи карточки в массив
          openCard();
        };
      } 

      if(cardOne !== null && cardTwo !== null){
        vereficationCards()
      }

      function vereficationCards(){
        if(cardOne.textContent === cardTwo.textContent){
          reset()
        }
        else{
          setTimeout(closeCards, 400, cardOne, cardTwo);
        }
      }

      function reset(){
        cardOne = null;
        cardTwo = null;
        control = [];
      }

      function closeCards(firstCard, lastCard){
        firstCard.classList.remove('active');
        cardOne = null;
        lastCard.classList.remove('active');
        cardTwo = null;
        control = [];
      }

      let activeCards = document.querySelectorAll('.active')
      if(activeCards.length === GENERALCARDS.length){
        endGame();
        textWinGame.style.display = 'block'
      }
    });
  });
});

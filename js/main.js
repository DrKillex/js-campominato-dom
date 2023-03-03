'use strict';

// funzioni---------------------------------------------------------------------------------------------------------

function myCreateElement(elementType, class1, class2 = '', txt = ''){
    const myElement = document.createElement(elementType);
    myElement.append(txt)
    myElement.classList.add(class1);
    myElement.classList.add(class2);
    return myElement
};

function myAppend(numBox, where, classSize){
    for (let i = 1; i <= numBox; i++){
    where.append(myCreateElement('div', 'box', classSize, i))
}
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function randomNumberArrayGenerator(howMany, between1, between2){
    let bombPosition = [];
    while (bombPosition.length < howMany){
    let possibleNumber = getRandomInt(between1, between2)
    if (bombPosition.includes(possibleNumber) === false){
        bombPosition.push(possibleNumber)
    }
    }
    return bombPosition
};

function bombPlacement (){
    possiblePositionList = document.querySelectorAll('.container > div');
    let bombDivList = [];
    for (let i = 0; i < possiblePositionList.length; i++){
        let innerTxt = possiblePositionList[i].innerText;
        if (bombPosition.includes(Number(innerTxt))){
            bombDivList.push(possiblePositionList[i]);
            console.log(bombDivList.length)
            possiblePositionList[i].addEventListener('click', function(){
                if (partita === true){
                    for (let i = 0; i < bombDivList.length; i++){
                        bombDivList[i].classList.add('bomb')
                    } 
                    defeat();                 
                    partita = false
                }
            });
        } else {
            possiblePositionList[i].addEventListener('click', function(){
                if (partita === true){
                    possiblePositionList[i].classList.add('safe')
                    if (scoreList.includes(possiblePositionList[i])===false){
                        scoreList.push(possiblePositionList[i])
                        score();
                        victory();
                        console.log(scoreList.length, bombPosition.length)
                    }
                }
            });
        };                 
    };
};

function gameStarter (){
    container.innerHTML = '';
    difficulty = document.getElementById('difficulty').value;
    partita = true;
    scoreList = [];
    restartButton.classList.remove('show')
    switch (difficulty){
        case 'easy':
        myAppend(100, container, 'box-10');
        bombPosition = randomNumberArrayGenerator(16,1,100)
        break;
        case 'medium':
        myAppend(81, container, 'box-9');
        bombPosition = randomNumberArrayGenerator(16,1,81)
        break
        case 'hard':
        myAppend(49, container, 'box-7');
        bombPosition = randomNumberArrayGenerator(16,1,49)
        break;
    }
}

function resButton(){
    restartButton.classList.add('show')
}

function defeat(){
    scoreLocator.innerText = 'che peccato, hai perso, '+ scoreLocator.innerText
    resButton();
}

function victory(){
    if (scoreList.length === possiblePositionList.length - bombPosition.length){
        scoreLocator.innerText = 'congraturazioni, hai vinto, '+ scoreLocator.innerText
        resButton()
        partita = false
    }
}

function score(){
    scoreLocator.innerText = `il tuo punteggio è: ${scoreList.length}`
}

// MAIN---------------------------------------------------------------------------------------------------------

const container = document.querySelector('.container');
const playButton = document.getElementById('play');
const restartButton = document.getElementById('restart');
const scoreLocator = document.getElementById('score');
let difficulty;
let partita;
let scoreList = [];
let bombPosition = [];
let possiblePositionList = [];
playButton.addEventListener ('click', function(){
    score();
    gameStarter();
    bombPlacement();
});
restartButton.addEventListener ('click', function(){
    score();
    gameStarter();
    bombPlacement();   
});

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
    let possiblePositionList = document.querySelectorAll('.container > div');
    for (let i = 0; i < possiblePositionList.length; i++){
        let innerTxt = possiblePositionList[i].innerText;
        if (bombPosition.includes(Number(innerTxt))){
            possiblePositionList[i].addEventListener('click', function(){
                if (partita === true){
                    possiblePositionList[i].classList.add('bomb')
                    partita = false
                }
            });
        } else {
            possiblePositionList[i].addEventListener('click', function(){
                if (partita === true){
                    possiblePositionList[i].classList.add('safe')
                    if (safeList.includes(possiblePositionList[i])===false){
                        safeList.push(possiblePositionList[i])
                    }
                }
            });
        };                 
    };
};


// MAIN---------------------------------------------------------------------------------------------------------

const container = document.querySelector('.container');
const playButton = document.getElementById('play');
let difficulty;
let partita;
let safeList = [];
playButton.addEventListener ('click', function(){
    container.innerHTML = '';
    difficulty = document.getElementById('difficulty').value;
    partita = true;
    safeList = [];
    switch (difficulty){
        case 'easy':
        myAppend(100, container, 'box-10');
        break;
        case 'medium':
        myAppend(81, container, 'box-9');
        break
        case 'hard':
        myAppend(49, container, 'box-7');
        break;

        // in caso di emergenza
        // if (difficulty === 'easy'){
        //     myAppend(100, container, 'box-10')
        // }   else if (difficulty === 'medium'){
        //     myAppend(81, container, 'box-9')
        // }   else if (difficulty === 'hard'){
        //     myAppend(49, container, 'box-7')
        // }    
    }
    bombPlacement();
});

let bombPosition = randomNumberArrayGenerator(16,1,100)
console.log(bombPosition)





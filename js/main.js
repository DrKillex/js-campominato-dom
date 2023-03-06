'use strict';

// funzioni---------------------------------------------------------------------------------------------------------

function myCreateElement(elementType, class1, class2 = '', txt = ''){         //funzione crea elementi
    const myElement = document.createElement(elementType);
    myElement.append(txt)
    myElement.classList.add(class1);
    myElement.classList.add(class2);
    return myElement
};

function myAppend(numBox, where, classSize){        //funzione appendi elementi
    for (let i = 1; i <= numBox; i++){
    where.append(myCreateElement('div', 'box', classSize, i))
}
};

function getRandomInt(min, max) {        //funzione genera numeri interi random con minimo e massimo compresi
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function randomNumberArrayGenerator(howMany, between1, between2){    //funzione genera array di numeri random e controlla non siano gia stati scelti
    let bombPosition = [];
    while (bombPosition.length < howMany){
    let possibleNumber = getRandomInt(between1, between2)
    if (bombPosition.includes(possibleNumber) === false){
        bombPosition.push(possibleNumber)
    }
    }
    return bombPosition
};

function bombPlacement (){                                                      //funzione logica di gioco
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

function gameStarter (easy, medium, hard, howManyRnd, base){                    //funzione per iniziare la partita 
    container.innerHTML = '';
    difficulty = document.getElementById('difficulty').value;
    partita = true;
    scoreList = [];
    restartButton.classList.remove('show');
    bombPosition = randomNumberArrayGenerator(howManyRnd, base, easy)
    switch (difficulty){
        case 'medium':
            myAppend(medium, container, 'box-9');
            break;
        case 'hard':
            myAppend(hard, container, 'box-7');
            break;
        case 'easy':
        default:
            myAppend(easy, container, 'box-10');
    }
}

function resButton(){                                                       //funzione restart button compare a fine partita
    restartButton.classList.add('show')
}

function defeat(){                                                                  //funzione sconfitta
    scoreLocator.innerText = 'che peccato, hai perso, '+ scoreLocator.innerText
    resButton();
}

function victory(){                                                                     //funzione vittoria
    if (scoreList.length === possiblePositionList.length - bombPosition.length){
        scoreLocator.innerText = 'congraturazioni, hai vinto, '+ scoreLocator.innerText
        resButton()
        partita = false
    }
}

function score(){                                                                           //funzione punteggio
    scoreLocator.innerText = `il tuo punteggio è: ${scoreList.length}`
}

// MAIN---------------------------------------------------------------------------------------------------------

const container = document.querySelector('.container');                 //trova div container
const playButton = document.getElementById('play');                     //trova bottone play
const restartButton = document.getElementById('restart');               //trova bottone restart
const scoreLocator = document.getElementById('score');                  //trova div punteggio
let difficulty;                                                         //variabile difficolta
let partita;                                                            //variabile partita in corso
let scoreList = [];                                                     //lista div safe clickati non doppi
let bombPosition = [];                                                  //lista posizioni bombe
let possiblePositionList = [];                                          //lista di tutti i div
playButton.addEventListener ('click', function(){                       //evento bottone play
    score();
    gameStarter(100, 81, 49, 16, 1);
    bombPlacement();
});
restartButton.addEventListener ('click', function(){                    //evento bottone restart
    score();
    gameStarter(100, 81, 49, 16, 1);
    bombPlacement();   
});

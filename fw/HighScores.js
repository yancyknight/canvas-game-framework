'use strict';
const storage = require('node-persist');
const HIGH_SCORES = "MyGamehighScores";

storage.initSync();


function getScores() {
    return storage.getItemSync(HIGH_SCORES);
}

function sortNumber(a, b) {
    return b - a;
}

function addScore(score){
    let highScores = storage.getItemSync(HIGH_SCORES);
    if (highScores === undefined) {
        highScores = [score];
        storage.setItem(HIGH_SCORES, highScores);
        return highScores;
    }
    highScores.push(score);
    highScores.sort(sortNumber);
    highScores.length = Math.min(highScores.length, 3);
    storage.setItem(HIGH_SCORES, highScores);
    return highScores
}

function removeScore(){
    storage.removeItem('MyGame.highScores');
}

module.exports = {
    getScores,
	addScore,
	removeScore,
};

// console.log('Scores: ' + JSON.stringify(getScores()));
// addScore("2");
// addScore("9");
// addScore("19");
// addScore("91");
// addScore("21");
// console.log('Scores: ' + JSON.stringify(getScores()));
// removeScore();

// console.log('Scores: ' + JSON.stringify(getScores()));

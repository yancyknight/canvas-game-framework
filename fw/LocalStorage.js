'use strict';
const PERSISTANT = "PersistantSettings";

function getSettings() {
    return localStorage.getItem(PERSISTANT);
}

function setSettings({
    field,
    value
} = {}) {
    let settingsString = localStorage.getItem(PERSISTANT);
    if (settingsString === null) {
        return;
    }
    settings = JSON.parse(settingsString);
    settings[field] = value;
    localStorage.setItem(PERSISTANT, settings);
}

function removeSetting(setting) {
    let settingsString = localStorage.getItem(PERSISTANT);
    if (settingsString === null) {
        return;
    }
    settings = JSON.parse(settingsString);
    delete settings[setting];
    localStorage.setItem(PERSISTANT, settings);
}

function removeAllSettings() {
    localStorage.removeItem(PERSISTANT);
}


module.exports = {
    getSettings,
    setSettings,
    removeSetting,
    removeAllScores
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

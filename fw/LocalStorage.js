'use strict';
const PERSISTANT = "PersistantSettings";

function getSettings() {
    let settingsString = localStorage.getItem(PERSISTANT);
    if (settingsString === null) {
        console.log("setting settings");
        return {};
    }
    else {
        console.log("settings: " + settingsString);
        return JSON.parse(settingsString);
    }
}

function setSettings({
    field,
    value
} = {}) {
    let settingsString = localStorage.getItem(PERSISTANT);
    if (settingsString === null) {
        console.log("setting settings");
        var settings = {};
    }
    else {
        console.log("settings: " + settingsString);
        var settings = JSON.parse(settingsString);
    }
    settings[field] = value;
    localStorage.setItem(PERSISTANT, JSON.stringify(settings));
    return settings;
}

function removeSetting(setting) {
    let settingsString = localStorage.getItem(PERSISTANT);
    if (settingsString === null) {
        return;
    }
    var settings = JSON.parse(settingsString);
    delete settings[setting];
    localStorage.setItem(PERSISTANT, JSON.stringify(settings));
}

function removeAllSettings() {
    localStorage.removeItem(PERSISTANT);
}


module.exports = {
    getSettings,
    setSettings,
    removeSetting,
    removeAllSettings
};

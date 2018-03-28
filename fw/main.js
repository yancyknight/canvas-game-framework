const graphics = require('./graphics');
const object = require('./object');
const collision = require('./collision');
const LocalStorage = require('./LocalStorage');

fw = {
    graphics,
    object,
    collision,
    LocalStorage
};

global.fw = fw;
module.exports = fw;

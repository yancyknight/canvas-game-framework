const graphics = require('./graphics');
const object = require('./object');
const collision = require('./collision');

fw = {
    graphics,
    object,
    collision
};

global.fw = fw;
module.exports = fw;
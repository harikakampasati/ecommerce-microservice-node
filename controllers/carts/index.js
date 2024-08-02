let controller = {}

controller = Object.assign(controller, require("./addToCart"));
controller = Object.assign(controller, require("./updateCart"));
controller = Object.assign(controller, require("./deleteCart"));

module.exports = controller
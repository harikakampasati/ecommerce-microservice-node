let controller = {}

controller = Object.assign(controller, require("./sendOtp"));
controller = Object.assign(controller, require("./verifyOtp"))

module.exports = controller
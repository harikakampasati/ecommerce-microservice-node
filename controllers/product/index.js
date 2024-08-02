let controller = {}

controller = Object.assign(controller, require("./getProducts"))
controller = Object.assign(controller, require("./getProductById"))

module.exports = controller


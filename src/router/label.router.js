const koaRouter = require("@koa/router")
const labelController = require("../controller/label.controller")

const labelRouter = new koaRouter({ prefix: "/label" })

// 获取所有标签
labelRouter.get("/list", labelController.list)

module.exports = labelRouter

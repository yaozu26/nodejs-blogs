const koaRouter = require("@koa/router")
const labelController = require("../controller/label.controller")

const labelRouter = new koaRouter({ prefix: "/label" })

// 获取所有标签列表
labelRouter.get("/", labelController.list)

module.exports = labelRouter

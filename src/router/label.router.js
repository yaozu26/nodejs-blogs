const koaRouter = require("@koa/router")

const { create } = require("../controller/label.controller")
const { verifyAuth } = require("../middleware/login.middleware")
const { verifyLabel } = require("../middleware/label.middleware")

const labelRouter = new koaRouter({ prefix: "/label" })

// 创建标签
labelRouter.post("/", verifyAuth, verifyLabel, create)

module.exports = labelRouter

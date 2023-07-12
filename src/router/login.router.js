const koaRouter = require("@koa/router")
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware")
const { sign, test } = require("../controller/login.controller")

const loginRouter = new koaRouter({ prefix: "/login" })

// 生成登录后的token
loginRouter.post("/", verifyLogin, sign)

// 验证登录
loginRouter.get("/test", verifyAuth, test)

module.exports = loginRouter

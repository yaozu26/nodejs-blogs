const koaRouter = require("@koa/router")
const { create, update, find } = require("../controller/user.controller")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")
const { verifyAuth } = require("../middleware/login.middleware")

const userRouter = new koaRouter({ prefix: "/users" })

// 用户注册
userRouter.post("/", verifyUser, handlePassword, create)
// 修改用户信息(登录状态)不安全
userRouter.patch("/", verifyAuth, handlePassword, update)
// 注销用户:

// 获取用户信息
userRouter.get("/:id", find)

module.exports = userRouter

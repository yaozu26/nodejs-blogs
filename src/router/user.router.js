const koaRouter = require("@koa/router")
const userController = require("../controller/user.controller")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")
const { verifyAuth } = require("../middleware/login.middleware")

const userRouter = new koaRouter({ prefix: "/users" })

// 用户注册
userRouter.post("/", verifyUser, handlePassword, userController.create)
// 修改用户信息(登录状态)不安全
userRouter.patch("/", verifyAuth, handlePassword, userController.update)

// 查 获取作者信息
userRouter.get("/:id", userController.find)

// 查 获取所有用户信息
userRouter.get("/role/list", userController.list)

module.exports = userRouter

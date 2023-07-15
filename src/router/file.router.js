const koaRouter = require("@koa/router")

const { verifyAuth } = require("../middleware/login.middleware")
const { handleAvatar } = require("../middleware/file.middleware")
const { create, showAvatarImage } = require("../controller/file.controller")

const fileRouter = new koaRouter({ prefix: "/file" })

// 创建头像
fileRouter.post("/avatar", verifyAuth, handleAvatar, create)
// 获取头像
fileRouter.get("/avatar/:userId", showAvatarImage)

module.exports = fileRouter

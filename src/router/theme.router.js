const koaRouter = require("@koa/router")
const themeController = require("../controller/theme.controller")

const themeRouter = new koaRouter({ prefix: "/theme" })

// 创建theme
themeRouter.post("/", themeController.create)

// 更新theme
themeRouter.patch("/:id", themeController.update)

// 删除theme
themeRouter.delete("/:id", themeController.delete)

// 查询theme
themeRouter.get("/list", themeController.list)

module.exports = themeRouter

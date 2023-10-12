const koaRouter = require("@koa/router")
const themeController = require("../controller/theme.controller")

const themeRouter = new koaRouter({ prefix: "/theme" })

// 查询theme同类个数
themeRouter.get("/count", themeController.themeCount)

module.exports = themeRouter

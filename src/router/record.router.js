const koaRouter = require("@koa/router")

const { create } = require("../controller/record.controller")
const { verifyRecord } = require("../middleware/record.middleware")

const recordRouter = new koaRouter({ prefix: "/record" })

// 创建记录
recordRouter.post("/", verifyRecord, create)
// 查找记录
recordRouter.get("/")

module.exports = recordRouter

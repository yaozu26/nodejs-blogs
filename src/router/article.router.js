const koaRouter = require("@koa/router")

const { create, list } = require("../controller/arcitle.controller")

const articleRouter = new koaRouter({ prefix: "/article" })

// 创建文章
articleRouter.post("/", create)

// 查询所有文章
articleRouter.get("/", list)

module.exports = articleRouter

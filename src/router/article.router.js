const koaRouter = require("@koa/router")
const articleController = require("../controller/arcitle.controller")

const articleRouter = new koaRouter({ prefix: "/article" })

// 查询所有文章
articleRouter.get("/", articleController.list)

// 获取文章详情
articleRouter.get("/:id", articleController.detail)

// 删除文章
articleRouter.delete("/:id", articleController.delete)

// 新增文章
articleRouter.post("/", articleController.create)

// 更新文章
articleRouter.patch("/:id", articleController.update)

module.exports = articleRouter

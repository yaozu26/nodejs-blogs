const koaRouter = require("@koa/router")
const { verifyAuth } = require("../middleware/login.middleware")
const commentController = require("../controller/comment.controller")

const commentRouter = new koaRouter({ prefix: "/comment" })

// 发表评论/回复评论
commentRouter.post("/", verifyAuth, commentController.create)

// 查询评论
commentRouter.get("/", commentController.list)

// 删除评论
commentRouter.delete("/:id", verifyAuth, commentController.delete)

module.exports = commentRouter

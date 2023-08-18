const commentService = require("../service/comment.service")
const { settleComment } = require("../middleware/comment.middleware")

class CommentController {
  async create(ctx) {
    const { content, articleId, commentId, parentId } = ctx.request.body
    const { id } = ctx.user

    const res = await commentService.create(content, id, articleId, commentId, parentId)

    ctx.body = {
      cody: 0,
      data: res,
    }
  }

  // 查询评论列表
  async list(ctx) {
    const { articleId } = ctx.query

    const res = await commentService.list(articleId)
    const data = await settleComment(res)

    ctx.body = {
      cody: 0,
      data,
    }
  }

  // 删除
  async delete(ctx) {
    const { id } = ctx.params

    const res = await commentService.delete(id)

    ctx.body = {
      cody: 0,
      data: res,
    }
  }
}

module.exports = new CommentController()

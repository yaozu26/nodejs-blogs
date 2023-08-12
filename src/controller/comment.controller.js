const commentService = require("../service/comment.service")
const { settleComment } = require("../middleware/comment.middleware")

class CommentController {
  async create(ctx) {
    const { content, articleId, commentId } = ctx.request.body
    const { id } = ctx.user

    const res = await commentService.create(content, id, articleId, commentId)

    ctx.body = {
      cody: 0,
      data: res,
    }
  }

  async list(ctx) {
    const res = await commentService.list()
    const data = settleComment(res)

    ctx.body = {
      cody: 0,
      data,
    }
  }
}

module.exports = new CommentController()

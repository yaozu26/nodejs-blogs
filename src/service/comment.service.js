const connection = require("../app/database")

class CommentService {
  // 创建/回复评论
  async create(content, userId, articleId, commentId, parentId) {
    const statement =
      "INSERT INTO comments(content, user_id, article_id, comment_id, parentId) VALUES(?, ?, ?, ?, ?);"
    if (!commentId) commentId = null
    const [res] = await connection.execute(statement, [
      content,
      userId,
      articleId,
      commentId,
      parentId,
    ])
    return res
  }

  // 查询评论
  async list(articleId) {
    const statement = `SELECT * FROM comments WHERE article_id = ${articleId};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 删除评论
  async delete(id) {
    const statement = `DELETE FROM comments WHERE id = ${id}`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new CommentService()

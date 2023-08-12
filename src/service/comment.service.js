const connection = require("../app/database")

class CommentService {
  // 创建评论
  async create(content, userId, articleId, commentId) {
    const statement =
      "INSERT INTO comments(content, user_id, article_id, comment_id) VALUES(?, ?, ?, ?);"
    if (!commentId) commentId = null
    const [res] = await connection.execute(statement, [content, userId, articleId, commentId])
    return res
  }

  async list() {
    const statement = "SELECT * FROM comments;"
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new CommentService()

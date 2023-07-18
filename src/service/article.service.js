const connection = require("../app/database")

class ArticleService {
  // 创建article
  async create(title) {
    const statement = "INSERT INTO article(title) VALUES(?);"
    const [res] = await connection.execute(statement, [title])
    return res
  }

  // 创建h1
  async createH1(articleId, title) {
    const statement = "INSERT INTO h1(article_id, title) VALUES(?, ?);"
    const [res] = await connection.execute(statement, [articleId, title])
    return res
  }

  // 创建h2
  async createH2(h1Id, title) {
    const statement = "INSERT INTO h2(h1_id, title) VALUES(?, ?);"
    const [res] = await connection.execute(statement, [h1Id, title])
    return res
  }

  // 创建内容a_content
  async createContent(h1Id, h2Id, type, content) {
    const statement = "INSERT INTO a_content(h1_id, h2_id, type, content) VALUES(?, ?, ?, ?);"
    const [res] = await connection.execute(statement, [h1Id, h2Id, type, content])
    return res
  }

  // 查询文章列表
  async list(limit = 30, offset = 0) {
    const statement = `SELECT
      a.id id, a.title title, a.createAt createTime, a.updateAt updateTime,
    (
      SELECT JSON_ARRAYAGG(JSON_OBJECT(
        "id", l.id, "name", l.name
      )) FROM labels l
      LEFT JOIN article_labels al
      ON al.labels_id = l.id
      WHERE al.article_id = a.id
    ) labels
    from article a
    LEFT JOIN article_labels al ON al.article_id = a.id
    GROUP BY a.id
    LIMIT  ${offset}, ${limit} ;`

    const [res] = await connection.execute(statement)
    return res
  }

  // 查询文章列表长度
  async count() {
    const statement = "SELECT COUNT(*) FROM article;"
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new ArticleService()

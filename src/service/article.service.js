const connection = require("../app/database")

class ArticleService {
  // 创建文章
  async create(title, content, desc) {
    const statement = "INSERT INTO article (title, content, description) VALUES(?, ?, ?);"
    const [res] = await connection.execute(statement, [title, content, desc])
    return res
  }

  // 查询文章列表
  async list(limit = 30, offset = 0) {
    const statement = `SELECT
      a.id id, a.title title, a.createAt createTime, a.updateAt updateTime, a.description des,
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

  // 查询文章详情
  async detail(id) {
    const statement1 = `SELECT * FROM article WHERE id = ${id};`
    const statement2 = `SELECT l.id id, l.name name, l.createAt createTime, l.updateAt updateTime
    FROM labels l LEFT JOIN article_labels al ON al.labels_id = l.id WHERE article_id = ${id};`
    let [res1] = await connection.execute(statement1)
    const [res2] = await connection.execute(statement2)
    const res = res1[0]
    res.labels = res2
    return res
  }

  // 删除文章
  async delete(id) {
    const statement = `DELETE FROM article WHERE id = ${id}`
    const [res] = await connection.execute(statement)
    return res
  }

  // 更新文章
  async update(id, title, content, desc) {
    const statement = `UPDATE article SET title = '${title}', content = '${content}', description='${desc}' WHERE id = ${id};`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new ArticleService()

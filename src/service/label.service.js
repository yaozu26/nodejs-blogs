const connection = require("../app/database")

class LabelService {
  // 创建标签
  async create(name) {
    const statement = "INSERT INTO labels(name) VALUES(?);"
    const [res] = await connection.execute(statement, [name])
    return res
  }

  // 查找单个标签
  async findLabel(name) {
    const statement = "SELECT * FROM labels WHERE name = ?;"
    const [res] = await connection.execute(statement, [name])
    return res
  }

  // 查找所有标签
  async list() {
    const statement = "SELECT * FROM labels;"
    const [res] = await connection.execute(statement)
    return res
  }

  // 建立labels和article的引用
  async buildArticle(articleId, labelId) {
    const statement = "INSERT INTO article_labels(article_id, labels_id) VALUES(?, ?);"
    const [res] = await connection.execute(statement, [articleId, labelId])
    return res
  }

  // 获取article对应得标签
  async getArticleLabelById(id) {
    const statement = `SELECT * FROM labels l 
    LEFT JOIN article_labels pl ON pl.label_id = l.id WHERE pl.project_id = ${id};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 移除article与labels的标签引用
  async removeLabelArticle(labelId) {
    const statement = `DELETE FROM article_labels WHERE label_id = ${labelId};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 获取projects对应得标签
  async getLabelById(id) {
    const statement = `SELECT * FROM labels l 
    LEFT JOIN projects_labels pl ON pl.label_id = l.id WHERE pl.project_id = ${id};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 移除project与labels的标签引用
  async removeLabelProject(labelId) {
    const statement = `DELETE FROM projects_labels WHERE label_id = ${labelId};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 建立labels和projects表的引用
  async buildProjects(projectId, labelId) {
    const statement = "INSERT INTO projects_labels(project_id, label_id) VALUES(?, ?);"
    const [res] = await connection.execute(statement, [projectId, labelId])
    return res
  }
}

module.exports = new LabelService()

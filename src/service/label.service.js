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

  // 建立labels和projects表的引用
  async buildProjects(projectId, labelId) {
    const statement = "INSERT INTO projects_labels(project_id, label_id) VALUES(?, ?);"
    const [res] = await connection.execute(statement, [projectId, labelId])
    return res
  }
}

module.exports = new LabelService()

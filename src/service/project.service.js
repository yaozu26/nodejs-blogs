const connection = require("../app/database")

class ProjectService {
  // 创建项目
  async create(title) {
    const statement = "INSERT INTO projects (title) VALUES(?);"

    const [res] = await connection.execute(statement, [title])

    return res
  }

  // 添加标签
  async addLabels(projectId, labelId) {
    const statement = "INSERT INTO projects_labels (project_id, label_id) VALUES(?, ?);"
    const [result] = await connection.execute(statement, [projectId, labelId])
    return result
  }
}

module.exports = new ProjectService()

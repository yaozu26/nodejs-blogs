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

  // 查找项目列表
  async findList() {
    const statement = `SELECT
    m.id id, m.title title, m.createAt createTime, m.updateAt updateTime, 
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
        'id', l.id, "name", l.name)) 
        FROM labels l
				LEFT JOIN projects_labels pl
        ON pl.label_id = l.id
				WHERE pl.project_id = m.id
      ) labels
    FROM projects m 
    LEFT JOIN projects_labels ml ON ml.project_id = m.id
    GROUP BY m.id;`
    const res = await connection.execute(statement)
    return res
  }
}

module.exports = new ProjectService()

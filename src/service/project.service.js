const connection = require("../app/database")

class ProjectService {
  // 增 projects
  async createProject(title, theme, content) {
    const statement = "INSERT INTO projects (title, theme, content) VALUES(?, ?, ?);"
    const [res] = await connection.execute(statement, [title, theme, content])
    return res
  }

  // 查 查找项目列表
  async findList() {
    const statement = `SELECT
    m.id id, m.title title, m.createAt createTime, m.updateAt updateTime, m.theme theme, m.content content, 
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

const connection = require("../app/database")

class ProjectService {
  // 增 projects
  async createProject(title, theme, content) {
    const statement = "INSERT INTO projects (title, theme, content) VALUES(?, ?, ?);"
    const [res] = await connection.execute(statement, [title, theme, content])
    return res
  }

  // 改
  async update(id, title, theme, content) {
    const statement = `UPDATE projects SET title = '${title}', content = '${content}', theme = '${theme}' WHERE id = ${id};`
    const [res] = await connection.execute(statement)
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

  // 查找单个项目
  async findOne(id) {
    const statement1 = `SELECT * FROM projects p WHERE id = ${id};`
    const statement2 = `SELECT l.id id, l.name name, l.createAt createTime, l.updateAt updateTime
    FROM labels l LEFT JOIN projects_labels pl ON pl.label_id = l.id WHERE project_id = ${id};`
    let [res1] = await connection.execute(statement1)
    const [res2] = await connection.execute(statement2)
    const res = res1[0]
    res.labels = res2
    return res
  }

  // 删除项目
  async delete(id) {
    const statement = `DELETE FROM projects WHERE id = ${id};`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new ProjectService()

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
    const statement = `SELECT * FROM projects;`
    const res = await connection.execute(statement)
    return res
  }

  // 查找单个项目
  async findOne(id) {
    const statement = `SELECT * FROM projects WHERE id = ${id};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 删除项目
  async delete(id) {
    const statement = `DELETE FROM projects WHERE id = ${id};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 获取项目列表长度
  async count() {
    const statement = "SELECT COUNT(*) sum FROM projects;"
    const [res] = await connection.execute(statement)
    return res
  }

  // 获取theme同类个数
  async themeCount(theme) {
    console.log(theme)
    const statement = `SELECT COUNT(*) count FROM projects WHERE theme = '${theme}';`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new ProjectService()

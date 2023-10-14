const connection = require("../app/database")

class ThemeService {
  // 创建theme
  async create(name) {
    const statement = `INSERT INTO themes (name) VALUES(?);`
    const [res] = await connection.execute(statement, [name])
    return res
  }

  // 更新theme
  async update(id, name) {
    const statement = `UPDATE themes SET name = "${name}" WHERE id = ${id}; `
    const [res] = await connection.execute(statement)
    return res
  }

  // 删除theme
  async delete(id) {
    const statement = `DELETE FROM themes WHERE id = ${id};`
    const [res] = await connection.execute(statement)
    return res
  }

  // 查询theme
  async list() {
    const statement = `SELECT * FROM themes;`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new ThemeService()

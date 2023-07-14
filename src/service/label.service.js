const connection = require("../app/database")

class LabelService {
  // 创建标签
  async create(name) {
    const statement = "INSERT INTO labels(name) VALUES(?);"

    const [result] = await connection.execute(statement, [name])
    return result
  }

  // 查找单个标签
  async findLabel(name) {
    const statement = "SELECT * FROM labels WHERE name = ?;"
    const [values] = await connection.execute(statement, [name])
    return values
  }
}

module.exports = new LabelService()

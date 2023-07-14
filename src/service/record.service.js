const connection = require("../app/database")

class RecordService {
  // 创建记录
  async create(content) {
    const statement = "INSERT INTO record (content) VALUES(?);"
    const [res] = await connection.execute(statement, [content])
    return res
  }
}

module.exports = new RecordService()

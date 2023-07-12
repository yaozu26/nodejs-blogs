const connection = require("../app/database")

class UserService {
  // 创建用户
  async create(user) {
    // 1、获取用户信息
    const { name, password } = user

    // 2、拼接statement语句
    const statement = "INSERT INTO users (name, password) VALUES(?, ?)"

    // 3、执行sql语句
    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  // 查找用户
  async findUserByName(name) {
    const statement = "SELECT * FROM users WHERE name = ?;"
    const [values] = await connection.execute(statement, [name])
    return values
  }

  // 修改密码
  async update(password, name) {
    const statement = "UPDATE users SET password = ? WHERE name = ?"
    const [result] = await connection.execute(statement, [password, name])
    return result
  }
}

module.exports = new UserService()
const userService = require("../service/user.service")

class UserController {
  // 创建用户
  async create(ctx, next) {
    // 1、获取用户传递过来的信息
    const user = ctx.request.body

    // 2、将用户存储到数据库中
    const res = await userService.create(user)

    // 3、返回给客户端的结果
    ctx.body = {
      code: 0,
      message: "创建用户成功~",
      data: res,
    }
  }

  // 修改用户
  async update(ctx, next) {
    const { name, password } = ctx.request.body

    const res = await userService.update(password, name)

    ctx.body = {
      message: "修改密码成功",
      data: res,
    }
  }

  // 查找用户信息
  async find(ctx, next) {
    const { id } = ctx.params

    const [res] = await userService.findUserById(id)

    ctx.body = {
      code: 0,
      data: res,
    }
  }
}

module.exports = new UserController()

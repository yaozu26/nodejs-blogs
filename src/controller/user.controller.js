const userService = require("../service/user.service")
const projectService = require("../service/project.service")
const articleService = require("../service/article.service")
const labelService = require("../service/label.service")

class UserController {
  // 创建用户
  async create(ctx, next) {
    const user = ctx.request.body

    const res = await userService.create(user)

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

  // 查找信息（作者）
  async find(ctx, next) {
    const { id } = ctx.params

    const [res] = await userService.findUserById(id)
    const [projectData] = await projectService.count()
    const [articleData] = await articleService.count()
    const [labelData] = await labelService.count()
    const data = {
      ...res,
      projectCount: projectData.sum,
      articleCount: articleData.sum,
      labelCount: labelData.sum,
    }

    ctx.body = {
      code: 0,
      data: data,
      message: "用户信息获取成功~",
    }
  }

  // 获取所有用户信息
  async list(ctx, next) {
    const res = await userService.list()

    ctx.body = {
      code: 0,
      data: res,
    }
  }
}

module.exports = new UserController()

const projectService = require("../service/project.service")

class ProjectController {
  // 创建项目
  async create(ctx) {
    // 1、拿到客户端传来的数据
    const { title, theme, content } = ctx.request.body

    // 2、在projects上创建一条记录
    await projectService.createProject(title, theme, content)

    // 3、返回客户端结果
    ctx.body = {
      data: 0,
      message: "项目创建成功",
    }
  }

  // 修改项目
  async update(ctx) {
    const { id } = ctx.params
    const { title, theme, content } = ctx.request.body
    await projectService.update(id, title, theme, content)

    ctx.body = {
      code: 0,
      message: "更新项目成功",
    }
  }

  // 查找列表信息
  async findList(ctx) {
    const [res] = await projectService.findList()

    ctx.body = {
      code: 0,
      data: res,
    }
  }

  // 查找单个项目信息
  async findOne(ctx) {
    const { id } = ctx.params
    const res = await projectService.findOne(id)

    ctx.body = {
      code: 0,
      data: res[0],
    }
  }

  // 删除项目
  async delete(ctx) {
    const { id } = ctx.params

    const res = await projectService.delete(id)

    ctx.body = {
      cody: 0,
      data: res,
    }
  }
}

module.exports = new ProjectController()

const projectService = require("../service/project.service")
const labelService = require("../service/label.service")

class ProjectController {
  // 创建项目
  async create(ctx, next) {
    // 1、拿到客户端传来的数据
    const { title, theme, labels, content } = ctx.request.body

    // 2、在projects上创建一条记录
    const res1 = await projectService.createProject(title, theme, content)
    const projectId = res1.insertId

    // 3、对标签进行管理
    for (const label of labels) {
      const res2 = await labelService.findLabel(label)
      let labelId
      if (res2.length > 0) {
        labelId = res2[0].id
      } else {
        const res3 = await labelService.create(label)
        labelId = res3.insertId
      }
      await labelService.buildProjects(projectId, labelId)
    }

    // 4、返回客户端结果
    ctx.body = {
      data: 0,
      message: "项目创建成功",
    }
  }

  // 查找列表信息
  async findList(ctx, next) {
    const [res] = await projectService.findList()

    ctx.body = {
      code: 0,
      data: res,
    }
  }
}

module.exports = new ProjectController()

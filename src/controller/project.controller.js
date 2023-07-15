const { create, addLabels, findList } = require("../service/project.service")
const labelService = require("../service/label.service")

class ProjectController {
  // 创建项目
  async create(ctx, next) {
    const { title } = ctx.request.body

    const res = await create(title)

    ctx.body = {
      code: 0,
      message: "创建项目成功",
      data: res,
    }
  }

  // 增加标签
  async addLabels(ctx, next) {
    const { labels } = ctx.request.body
    const { projectId } = ctx.params

    try {
      for (let label of labels) {
        const [res] = await labelService.findLabel(label)
        const values = await addLabels(projectId, res.id)
      }
      ctx.body = {
        code: 0,
        message: "为项目添加标签成功",
      }
    } catch (error) {
      ctx.body = {
        code: -11,
        message: "为项目添加标签失败",
      }
    }
  }

  // 查找列表信息
  async findList(ctx, next) {
    const [res] = await findList()

    ctx.body = {
      code: 0,
      data: res,
    }
  }
}

module.exports = new ProjectController()

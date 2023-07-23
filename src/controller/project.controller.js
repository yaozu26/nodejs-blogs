const projectService = require("../service/project.service")
const labelService = require("../service/label.service")
const { verifyExists } = require("../middleware/label.middleware")

class ProjectController {
  // 创建项目
  async create(ctx, next) {
    // 1、拿到客户端传来的数据
    const { title, theme, labels, content } = ctx.request.body

    // 2、在projects上创建一条记录
    const res = await projectService.createProject(title, theme, content)
    const projectId = res.insertId

    // 3、对标签进行管理
    for (const label of labels) {
      const labelId = await verifyExists(label)
      await labelService.buildProjects(projectId, labelId)
    }

    // 4、返回客户端结果
    ctx.body = {
      data: 0,
      message: "项目创建成功",
    }
  }

  // 修改项目
  async update(ctx) {
    const { id } = ctx.params
    const { title, theme, labels, content } = ctx.request.body
    const res1 = await projectService.update(id, title, theme, content)

    const res2 = await labelService.getLabelById(id)

    const res3 = res2?.map((item) => item.name)

    const oldNames = res2
    for (const name of labels) {
      const labelId = await verifyExists(name)
      if (res3 && res3.includes(name)) {
        const index = res3.indexOf(name)
        oldNames.splice(index, 1)
      } else {
        await labelService.buildProjects(id, labelId)
      }

      // 处理移除的标签
      if (oldNames) {
        for (const n of oldNames) {
          const res = await labelService.removeLabelProject(n.label_id)
        }
      }
    }

    ctx.body = {
      code: 0,
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
      data: res,
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

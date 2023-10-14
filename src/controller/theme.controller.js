const projectService = require("../service/project.service")
const themeService = require("../service/theme.service")

class ThemeController {
  // 创建theme
  async create(ctx) {
    const { name } = ctx.request.body
    const res = await themeService.create(name)
    ctx.body = {
      code: 0,
      data: res,
    }
  }

  // 更新theme
  async update(ctx) {
    const { id } = ctx.params
    const { name } = ctx.request.body
    const res = await themeService.update(id, name)
    ctx.body = {
      code: 0,
      data: res,
    }
  }

  // 删除theme
  async delete(ctx) {
    const { id } = ctx.params
    const res = await themeService.delete(id)
    ctx.body = {
      code: 0,
      data: res,
    }
  }

  // 查询theme
  async list(ctx) {
    const res = await themeService.list()
    ctx.body = {
      code: 0,
      data: res,
    }
  }
}

module.exports = new ThemeController()

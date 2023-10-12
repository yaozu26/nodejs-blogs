const projectService = require("../service/project.service")

class ThemeController {
  // 获取theme同类个数
  async themeCount(ctx) {
    const { theme } = ctx.request.body

    const [res] = await projectService.themeCount(theme)

    ctx.body = {
      code: 0,
      data: res,
    }
  }
}

module.exports = new ThemeController()

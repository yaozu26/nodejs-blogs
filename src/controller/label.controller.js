const labelService = require("../service/label.service")

class LabelController {
  // 创建标签
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await labelService.create(name)

    ctx.body = {
      code: 0,
      message: "创建用户成功",
      data: result,
    }
  }

  // 获取所有标签列表
  async list(ctx, next) {
    const res = await labelService.list()

    ctx.body = {
      code: 0,
      data: res,
    }
  }
}

module.exports = new LabelController()

const recordService = require("../service/record.service")

class RecordController {
  // 创建记录
  async create(ctx, next) {
    const { content } = ctx.request.body

    const res = await recordService.create(content)

    ctx.body = {
      code: 0,
      message: "记录创建成功",
      data: res,
    }
  }
}

module.exports = new RecordController()

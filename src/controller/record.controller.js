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

  // 查找所有列表的数据
  async list(ctx, next) {
    const res = await recordService.list()

    ctx.body = {
      code: 0,
      message: "列表查找成功",
      data: res,
    }
  }
}

module.exports = new RecordController()

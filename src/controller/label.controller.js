const labelService = require("../service/label.service")

class LabelController {
  async list(ctx) {
    const res = await labelService.list()

    ctx.body = {
      cody: 0,
      data: res,
    }
  }
}

module.exports = new LabelController()

const { RECORD_CONTENT_IS_NULL } = require("../config/error-constants")

// 验证记录
const verifyRecord = async (ctx, next) => {
  // 1、拿到用户传来的数据
  const { content } = ctx.request.body

  // 2、验证内容是否为空
  if (!content) {
    return ctx.app.emit("error", RECORD_CONTENT_IS_NULL, ctx)
  }

  await next()
}

module.exports = { verifyRecord }

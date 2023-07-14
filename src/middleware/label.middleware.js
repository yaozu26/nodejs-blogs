const { findLabel } = require("../service/label.service")
const { LABEL_IS_ALREADY_EXISTS } = require("../config/error-constants")

// 验证标签
const verifyLabel = async (ctx, next) => {
  // 1、标签不能重复
  const { name } = ctx.request.body
  const res = await findLabel(name)
  if (res.length) {
    return ctx.app.emit("error", LABEL_IS_ALREADY_EXISTS, ctx)
  }

  // 执行下一个中间件
  await next()
}

module.exports = { verifyLabel }

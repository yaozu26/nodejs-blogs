const { findLabel } = require("../service/label.service")
const { LABEL_IS_ALREADY_EXISTS } = require("../config/error-constants")
const labelService = require("../service/label.service")

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

// 如果标签不存在则创建
const verifyExists = async (name) => {
  const res1 = await labelService.findLabel(name)
  let labelId
  if (res1.length > 0) {
    labelId = res1[0].id
  } else {
    const res2 = await labelService.create(name)
    labelId = res2.insertId
  }
  return labelId
}

module.exports = { verifyLabel, verifyExists }

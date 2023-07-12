const { NAME_OR_PASSWORD_IS_NULL, NAME_IS_ALREADY_EXISTS } = require("../config/error-constants")
const { findUserByName } = require("../service/user.service")
const md5Password = require("../utils/md5-password")

// 验证用户名和密码
const verifyUser = async (ctx, next) => {
  // 1、用户名或密码不为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_NULL, ctx)
  }

  // 2、用户是否存在
  const users = await findUserByName(name)
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx)
  }

  // 3、执行下一个中间件
  await next()
}

// 加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body

  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}

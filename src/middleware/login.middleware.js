const jwt = require("jsonwebtoken")
const {
  NAME_OR_PASSWORD_IS_NULL,
  NAME_IS_NOT_EXISTS,
  UNAUTHORIZED,
  PASSWORD_IS_ERROR,
} = require("../config/error-constants")
const { findUserByName } = require("../service/user.service")
const md5Password = require("../utils/md5-password")
const { PUBLIC_KEY } = require("../config/secret")

// 验证用户登录的逻辑
const verifyLogin = async (ctx, next) => {
  // 1、取出用户输入的信息
  const { name, password } = ctx.request.body

  // 2、判断用户名或密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_NULL, ctx)
  }

  // 3、查询用户是否存在
  const users = await findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx)
  }

  // 4、查询数据库中密码和用户传递密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_ERROR, ctx)
  }

  // 5、将user对象保存到ctx中
  ctx.user = user

  // 6、执行下一个中间件
  await next()
}

// 验证token
const verifyAuth = async (ctx, next) => {
  // 1、验证是否有效的authorization
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx)
  }

  // 2、对token进行解密
  const token = authorization.replace("Bearer ", "")
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    })

    // 将token信息保留下来
    ctx.user = result

    await next()
  } catch (error) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx)
  }
}

module.exports = { verifyLogin, verifyAuth }

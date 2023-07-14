const app = require("../app")
const {
  NAME_OR_PASSWORD_IS_NULL,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  UNAUTHORIZED,
  PASSWORD_IS_ERROR,
  LABEL_IS_ALREADY_EXISTS,
} = require("../config/error-constants")

app.on("error", (err, ctx) => {
  let code = 0
  let message = ""

  switch (err) {
    case NAME_OR_PASSWORD_IS_NULL:
      code = -1001
      message = "用户名或者密码不能为空"
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = "用户已经存在"
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = "用户不存在"
      break
    case UNAUTHORIZED:
      code = -1004
      message = "无效的token或token已过期"
      break
    case PASSWORD_IS_ERROR:
      code = -1005
      message = "密码错误"
      break
    case LABEL_IS_ALREADY_EXISTS:
      code = -1101
      message = "标签已经被创建"
      break
  }

  ctx.body = { code, message }
})

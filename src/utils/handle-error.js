const app = require("../app")
const {
  NAME_OR_PASSWORD_IS_NULL,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  UNAUTHORIZED,
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
    case UNAUTHORIZED:
      code = -1004
      message = "无效的token或token已过期"
  }

  ctx.body = { code, message }
})

const koa = require("koa")
const bodyparser = require("koa-bodyparser")
const registerRouter = require("../router")

const app = new koa()

// 解析客户端传递过来的请求头信息
app.use(bodyparser())

registerRouter(app)

module.exports = app

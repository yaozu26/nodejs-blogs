const koa = require("koa")
const bodyparser = require("koa-bodyparser")
const cors = require("@koa/cors")
const registerRouter = require("../router")

const app = new koa()

app.use(cors())

// 解析客户端传递过来的请求头信息
app.use(bodyparser())

// 注册路由
registerRouter(app)

module.exports = app

const koaRouter = require("@koa/router")
const { create, findList } = require("../controller/project.controller")

const projectRouter = new koaRouter({ prefix: "/project" })

// 创建项目
projectRouter.post("/", create)

// 查找项目列表
projectRouter.get("/", findList)

module.exports = projectRouter

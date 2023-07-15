const koaRouter = require("@koa/router")
const { verifyAuth } = require("../middleware/login.middleware")
const { create, addLabels, findList } = require("../controller/project.controller")

const projectRouter = new koaRouter({ prefix: "/project" })

// 创建项目
projectRouter.post("/", verifyAuth, create)
// 增加标签
projectRouter.post("/:projectId/label", verifyAuth, addLabels)

// 查找项目
projectRouter.get("/", findList)

module.exports = projectRouter

const koaRouter = require("@koa/router")
const projectController = require("../controller/project.controller")

const projectRouter = new koaRouter({ prefix: "/project" })

// 创建项目
projectRouter.post("/", projectController.create)

// 修改项目
projectRouter.patch("/:id", projectController.update)

// 查找项目列表
projectRouter.get("/", projectController.findList)
// 查找单个项目
projectRouter.get("/:id", projectController.findOne)

// 删除项目
projectRouter.delete("/:id", projectController.delete)

module.exports = projectRouter

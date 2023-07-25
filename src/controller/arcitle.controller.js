const articleService = require("../service/article.service")
const labelService = require("../service/label.service")
const { verifyExists } = require("../middleware/label.middleware")

class ArticleController {
  // 创建文章
  async create(ctx) {
    // 1、拿到客户端传来的数据
    const { title, labels, content } = ctx.request.body

    // 2、在projects上创建一条记录
    const res = await articleService.create(title, content)
    const articleId = res.insertId

    // 3、对标签进行管理
    for (const label of labels) {
      const labelId = await verifyExists(label)
      await labelService.buildArticle(articleId, labelId)
    }

    // 4、返回客户端结果
    ctx.body = {
      data: 0,
      message: "文章创建成功",
    }
  }

  // 查询文章列表
  async list(ctx, next) {
    const { limit, offset } = ctx.query

    const res = await articleService.list(limit, offset)
    const [totalCount] = await articleService.count()

    ctx.body = {
      code: 0,
      data: res,
      totalCount: totalCount["COUNT(*)"],
    }
  }

  // 查询文章详情
  async detail(ctx) {
    const { id } = ctx.params
    const res = await articleService.detail(id)
    ctx.body = {
      cody: 0,
      message: "文章查询成功",
      data: res,
    }
  }

  // 删除文章
  async delete(ctx) {
    const { id } = ctx.params

    const res = await articleService.delete(id)
  }

  // 更新文章
  async update(ctx) {
    const { id } = ctx.params
    const { title, labels, content } = ctx.request.body
    const res1 = await articleService.update(id, title, content)

    const res2 = await labelService.getArticleLabelById(id)

    const res3 = res2?.map((item) => item.name)

    const oldNames = res2
    for (const name of labels) {
      const labelId = await verifyExists(name)
      if (res3 && res3.includes(name)) {
        const index = res3.indexOf(name)
        oldNames.splice(index, 1)
      } else {
        await labelService.buildArticle(id, labelId)
      }

      // 处理移除的标签
      if (oldNames) {
        for (const n of oldNames) {
          const res = await labelService.removeLabelArticle(n.label_id)
        }
      }
    }

    ctx.body = {
      code: 0,
      message: "更新文章成功",
    }
  }
}

module.exports = new ArticleController()

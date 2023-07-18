const articleService = require("../service/article.service")
const labelService = require("../service/label.service")

class ArticleController {
  async create(ctx, next) {
    // 1、获取数据
    const { title, labels, catalog } = ctx.request.body

    // 2、在article表中创建数据
    const res1 = await articleService.create(title)
    const articleId = res1.insertId

    // 3、对标签进行管理
    for (let label of labels) {
      // 如果标签存在，则添加引用关系，不存在，先创建标签再添加引用
      const res2 = await labelService.findLabel(label)
      let labelId
      if (res2.length > 0) {
        labelId = res2[0].id
      } else {
        const res3 = await labelService.create(label)
        labelId = res3.insertId
      }
      await labelService.buildArticle(articleId, labelId)
    }

    // 4、对目录的管理
    for (let h1 of catalog) {
      const res4 = await articleService.createH1(articleId, h1.title)
      if (h1.content) {
        for (let c of h1.content) {
          const res5 = await articleService.createContent(res4.insertId, null, c.type, c.text)
        }
      }
      if (h1.catalog) {
        for (let h2 of h1.catalog) {
          const res6 = await articleService.createH2(res4.insertId, h2.title)
          const h2Id = res6.insertId
          if (h2.content) {
            for (let c of h2.content) {
              const res6 = await articleService.createContent(null, h2Id, c.type, c.text)
            }
          }
        }
      }
    }

    // 5、返回客户端，数据创建成功
    ctx.body = {
      code: 0,
      message: "数据创建成功",
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
}

module.exports = new ArticleController()

const userService = require("../service/user.service")

// 整理评论数据
async function settleComment(data) {
  let firstComments = []
  for (let comment of data) {
    // 获取角色信息
    const [res] = await userService.findUserById(comment.user_id)
    comment.userInfo = res

    if (!comment.comment_id) {
      comment.children = []
      firstComments.push(comment)
    } else {
      const target = firstComments.find((item) => item.id === comment.comment_id)
      target.children.push(comment)
    }
  }

  return firstComments
}

module.exports = {
  settleComment,
}

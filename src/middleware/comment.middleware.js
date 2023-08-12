// 整理评论数据
function settleComment(data) {
  let firstComments = []
  for (let comment of data) {
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

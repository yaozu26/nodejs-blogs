const multer = require("@koa/multer")
const { UPLOAD_PATH } = require("../config/path")

const uploadAvatar = multer({
  dest: `${UPLOAD_PATH}/avatar`,
})

const handleAvatar = uploadAvatar.single("avatar")

module.exports = {
  handleAvatar,
}

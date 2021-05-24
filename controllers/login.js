const md5 = require('blueimp-md5')

const loginFn = async (ctx, next) => {
  const postData = ctx.request.body.data
  ctx.global.setCookie(123456)
  ctx.response.type = 'json'
  ctx.response.body = ({
    user: {
      name: postData.name,
      cookie: md5(postData.password)
    }
  })
  next()
}

module.exports = {
  'post /api/login': loginFn
}

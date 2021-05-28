const md5 = require('blueimp-md5')

const loginFn = async (ctx, next) => {
  const postData = ctx.request.body.data
  ctx.global.setCookie(md5(postData.password))
  ctx.response.type = 'json'
  ctx.response.body = ({
    user: {
      name: postData.name,
      cookie: md5(postData.password)
    }
  })
  next()
}

const loginByCookieFn = async (ctx, next) => {
  const user = ctx.global.getUserByCookie(ctx.cookies.get('mockCookie'))
  
  ctx.response.type = 'json'
  ctx.response.body = ({
    user: user
  })
  next()
}

module.exports = {
  'post /api/login': loginFn,
  'post /api/loginByCookie': loginByCookieFn
}

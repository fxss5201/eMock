const md5 = require('blueimp-md5')

// 正常用户名密码登录
const loginFn = async (ctx, next) => {
  const postData = ctx.request.body.data

  // 这里只是模拟生成 cookie ,然后将其添加到公共变量中
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

// 根据 cookie 登录
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

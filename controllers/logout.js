const logoutFn = async (ctx, next) => {
  ctx.global.deleteCookie(ctx.cookies.get('mockCookie'))
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '退出成功'
  })
  next()
}

module.exports = {
  'post /api/logout': logoutFn
}

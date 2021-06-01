// 退出登录
const logoutFn = async (ctx, next) => {
  // 删除公共变量中的 cookie
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

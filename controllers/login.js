const global = require('./../global.js').global
console.log(global)

const loginFn = async (ctx, next) => {
  console.log(ctx.request.body)
  global.setCookie(123456)
  ctx.response.type = 'json'
  ctx.response.body = ({
    login: [{ id: 1, name: 'John Smith' }]
  })
  next()
}

module.exports = {
  'post /api/login': loginFn
}

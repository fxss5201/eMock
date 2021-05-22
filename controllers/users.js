const usersFn = async (ctx, next) => {
  ctx.response.type = 'json'
  ctx.response.body = ({
    users: [{ id: 1, name: 'John Smith' }]
  })
  next()
}

module.exports = {
  'GET /api/users': usersFn
}

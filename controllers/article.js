const global = require('./../global.js').global
const Mock = require('mockjs')
const Random = Mock.Random

const articleList = Mock.mock({
  'list|100': [{
    'id|+1': 1
  }]
})

articleList.list = articleList.list.map(item => {
  const title = Random.ctitle(6)
  const description = `${title}${Random.cparagraph()}`
  return {
    id: item.id,
    title,
    description,
    time: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    author: Random.cname()
  }
})

const getArticlesFn = async (ctx, next) => {
  const currentPage = ctx.query.currentPage * 1
  const pageSize = ctx.query.pageSize * 1
  const list = articleList.list.filter((item, index) => index >= (currentPage - 1) * pageSize && index < currentPage * pageSize)
  console.log(global.get().cookie)
  ctx.response.type = 'json'
  ctx.response.body = ({
    list,
    total: articleList.list.length
  })
  next()
}

module.exports = {
  'get /api/articles': getArticlesFn
}

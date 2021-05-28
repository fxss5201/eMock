const Mock = require('mockjs')
const Random = Mock.Random

const articles = Mock.mock({
  'list|100': [{
    'id|+1': 0
  }]
})

let articleList = articles.list

articleList = articleList.map(item => {
  const title = Random.ctitle(3, 10)
  const description = `${title}${Random.cparagraph()}`
  return {
    id: item.id === 0 ? 100 : item.id,
    title,
    description,
    time: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    author: Random.cname()
  }
})

const getArticlesFn = async (ctx, next) => {
  const currentPage = ctx.query.currentPage * 1
  const pageSize = ctx.query.pageSize * 1
  const list = articleList.filter((item, index) => index >= (currentPage - 1) * pageSize && index < currentPage * pageSize)
  ctx.response.type = 'json'
  ctx.response.body = ({
    list,
    total: articleList.length
  })
  next()
}

function getArticlesIndexById(id) {
  let res = -1
  for (let i = 0, len = articleList.length; i < len; i++) {
    if (articleList[i].id === id) {
      res = i
      break
    }
  }
  return res
}

const getArticlesByIdFn = async (ctx, next) => {
  const articleIndex = getArticlesIndexById(ctx.params.id * 1)
  // 可以在此处进行文章是否存在的判断 articleIndex != -1
  ctx.response.type = 'json'
  ctx.response.body = ({
    article: articleList[articleIndex]
  })
  next()
}

const postArticlesFn = async (ctx, next) => {
  const postData = ctx.request.body.data
  const id = articleList[0].id + 1
  articleList.unshift({
    id,
    ...postData
  })
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '添加成功'
  })
  next()
}

const putArticlesByIdFn = async (ctx, next) => {
  const articleIndex = getArticlesIndexById(ctx.params.id * 1)
  const postData = ctx.request.body.data
  articleList.splice(articleIndex, 1, postData)
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '编辑成功'
  })
  next()
}

const deleteArticlesByIdFn = async (ctx, next) => {
  const articleIndex = getArticlesIndexById(ctx.params.id * 1)
  articleList.splice(articleIndex, 1)
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '删除成功'
  })
  next()
}

module.exports = {
  'get /api/articles': getArticlesFn,
  'get /api/articles/:id': getArticlesByIdFn,
  'post /api/articles': postArticlesFn,
  'put /api/articles/:id': putArticlesByIdFn,
  'delete /api/articles/:id': deleteArticlesByIdFn
}

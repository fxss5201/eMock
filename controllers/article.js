const Mock = require('mockjs')
const Random = Mock.Random

// 生成文章自增 id
const articles = Mock.mock({
  'list|100': [{
    'id|+1': 0
  }]
})

let articleList = articles.list

// 为文章填充标题、内容、时间、作者
articleList = articleList.map(item => {
  const title = Random.ctitle(3, 10)
  const description = `${title}${Random.cparagraph()}`
  return {
    id: item.id === 0 ? 100 : item.id, // 此处是为了模拟新增文章在最前面，新增文章 id 由第一个文章的 id + 1 得到
    title,
    description,
    time: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    author: Random.cname()
  }
})

// 获取文章列表
const getArticlesFn = async (ctx, next) => {
  const currentPage = ctx.query.currentPage * 1
  const pageSize = ctx.query.pageSize * 1

  // 分页获取数据
  const list = articleList.filter((item, index) => index >= (currentPage - 1) * pageSize && index < currentPage * pageSize)
  ctx.response.type = 'json'
  ctx.response.body = ({
    list,
    total: articleList.length
  })
  next()
}

/**
 * 由文章 id 获取当前文章所在的 index
 * @param {string} id 文章 id
 * @returns 当前文章所在的 index
 */
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

// 根据文章 id 获取文章获取文章详情
const getArticlesByIdFn = async (ctx, next) => {
  const articleIndex = getArticlesIndexById(ctx.params.id * 1)

  // 可以在此处进行文章是否存在的判断 articleIndex != -1
  ctx.response.type = 'json'
  ctx.response.body = ({
    article: articleList[articleIndex]
  })
  next()
}

// 新增文章
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

// 更新文章
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

// 删除文章
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

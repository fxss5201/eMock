const Koa = require('koa')
const chalk = require('chalk')
const bodyParser = require('koa-bodyparser')

const { port } = require('./package.json')
const global = require('./global.js').global
const controller = require('./controller')

const app = new Koa()

// 全局公共变量及方法
app.context.global = global

// log request URL:
app.use(async (ctx, next) => {
  console.log(chalk.blue(`Process ${ctx.request.method} ${ctx.request.url}...`))
  await next()
})

// parse request body:
app.use(bodyParser())

// add controllers:
app.use(controller())

app.listen(port)
console.log(chalk.green(`app started at port ${port}...`))

const Koa = require('koa')
const chalk = require('chalk')

const bodyParser = require('koa-bodyparser')

const controller = require('./controller')

const app = new Koa()

// log request URL:
app.use(async (ctx, next) => {
  console.log(chalk.blue(`Process ${ctx.request.method} ${ctx.request.url}...`))
  await next()
})

// parse request body:
app.use(bodyParser())

// add controllers:
app.use(controller())

app.listen(8888)
console.log(chalk.green('app started at port 8888...'))

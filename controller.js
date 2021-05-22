const fs = require('fs')
const chalk = require('chalk')

/**
 * add url-route in /controllers:
 * @param {Object} router require('koa-router')()
 * @param {Object} mapping require(__dirname + '/' + dir + '/' + f)
 */
function addMapping (router, mapping) {
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4)
      router.get(path, mapping[url])
      console.log(chalk.green(`register URL mapping: GET ${path}`))
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5)
      router.post(path, mapping[url])
      console.log(chalk.green(`register URL mapping: POST ${path}`))
    } else if (url.startsWith('PUT ')) {
      const path = url.substring(4)
      router.put(path, mapping[url])
      console.log(chalk.green(`register URL mapping: PUT ${path}`))
    } else if (url.startsWith('DELETE ')) {
      const path = url.substring(7)
      router.del(path, mapping[url])
      console.log(chalk.green(`register URL mapping: DELETE ${path}`))
    } else {
      console.log(chalk.red(`invalid URL: ${url}`))
    }
  }
}

/**
 * addControllers
 * @param {Object} router require('koa-router')()
 * @param {String} dir path
 */
function addControllers (router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    return f.endsWith('.js')
  }).forEach((f) => {
    console.log(chalk.blue(`process controller: ${f}...`))
    const mapping = require(__dirname + '/' + dir + '/' + f)
    addMapping(router, mapping)
  })
}

module.exports = function (dir) {
  const controllers_dir = dir || 'controllers'
  const router = require('koa-router')()
  addControllers(router, controllers_dir)
  return router.routes()
}

// https://github.com/michaelliao/learn-javascript/blob/master/samples/node/web/koa/url2-koa/controller.js

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

/**
 * add url-route in /controllers:
 * @param {Object} router require('koa-router')()
 * @param {Object} mapping require(__dirname + '/' + dir + '/' + f)
 */
function addMapping(router, mapping) {
  for (const url in mapping) {
    if (url.toLowerCase().startsWith('get ')) {
      const path = url.substring(4)
      router.get(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('get')} ${path}`))
    } else if (url.toLowerCase().startsWith('post ')) {
      const path = url.substring(5)
      router.post(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('post')} ${path}`))
    } else if (url.toLowerCase().startsWith('put ')) {
      const path = url.substring(4)
      router.put(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('put')} ${path}`))
    } else if (url.toLowerCase().startsWith('delete ')) {
      const path = url.substring(7)
      router.del(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('delete')} ${path}`))
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
function addControllers(router, dir) {
  const fullpath = path.join(__dirname + '/' + dir)
  listFile(router, fullpath)
}

/**
 * 递归循环深层目录便利
 * @param {Object} router require('koa-router')()
 * @param {String} dirPath path
 */
function listFile(router, dirPath) {
  const arr = fs.readdirSync(dirPath)
  arr.forEach(function (item) {
    const fullpath = path.join(dirPath, item)
    const stats = fs.statSync(fullpath)
    if (stats.isDirectory()) {
      listFile(router, fullpath);
    } else {
      console.log(chalk.blue(`process controller: ${fullpath}...`))
      const mapping = require(fullpath)
      addMapping(router, mapping)
    }
  });
}

module.exports = function (dir) {
  const controllers_dir = dir || 'controllers'
  const router = require('koa-router')()
  addControllers(router, controllers_dir)
  return router.routes()
}

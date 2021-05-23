/** 存放公共变量，供所有使用 */
class Global {
  global = {
    cookie: ''
  }

  setCookie (val) {
    this.global.cookie = val
  }

  get () {
    return this.global
  }
}

const global = new Global()

module.exports = {
  global
}

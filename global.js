/** 存放公共变量，供所有使用 */
class Global {
  global = {
    cookies: []
  }

  /**
   * 设置cookie
   * @param {string} val 新的cookie值 
   */
  setCookie (val) {
    const cookies = this.global.cookies.concat(val)
    this.global.cookies = [...new Set(cookies)]
  }

  /**
   * 删除cookie
   * @param {string} val cookie值 
   */
  deleteCookie (val) {
    console.log(this.global.cookies)
    this.global.cookies.splice(this.global.cookies.indexOf(val), 1)
    console.log(this.global.cookies)
  }

  /**
   * 检查当前cookie是否在cookies中
   * @param {string} val 当前cookie
   * @returns true: 在cookies中，false：不在cookies中
   */
  isInCookies (val) {
    return this.global.cookies.indexOf(val) !== -1
  }

  /**
   * 获取所有的公共变量
   * @returns 所有的公共变量
   */
  get () {
    return this.global
  }
}

const global = new Global()

module.exports = {
  global
}

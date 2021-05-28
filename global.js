/** 存放公共变量，供所有使用 */
class Global {
  global = {
    users: [
      {
        cookie: 'cc077e4074d58b5b3afe96921b220364',
        name: 'fxss'
      }
    ],
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
    this.global.cookies.splice(this.global.cookies.indexOf(val), 1)
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

  /**
   * 使用当前cookie获取用户信息
   * @param {string} val 当前cookie
   * @returns 当前cookie对应的用户信息
   */
  getUserByCookie (val) {
    let res = {}
    for (let index = 0, length = this.global.users.length; index < length; index++) {
      if (this.global.users[index].cookie === val) {
        res = this.global.users[index]
        break
      }
    }
    return res
  }
}

const global = new Global()

module.exports = {
  global
}

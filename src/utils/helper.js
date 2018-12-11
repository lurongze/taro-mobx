import Taro from '@tarojs/taro'
import config from '../config/index'

const sessionKey = 'taro-js-session'
let reLoginTime = 1;
const helper = {

  isEmpty(value) {
    return typeof value === 'undefined' || value === null || value === ''
  },

  debounce(fn, delay = 500) { // 防抖执行函数
    let handle;
    return function (e) {
      // 取消之前的延时调用
      clearTimeout(handle);
      handle = setTimeout(() => {
        fn(e);
      }, delay);
    }
  },

  config (key) { // 获取配置信息
    return config[key]
  },

  log (message, type = 'log') {
    switch (type) {
      case 'log':
        console.log(message)
        break
      case 'error':
        console.error(message)
        break
      default:
        console.log(message)
    }
  },

  async login () {
    if (process.env.TARO_ENV === 'weapp') {

      if (reLoginTime > 10) {
        // 登录最多尝试10次吧
        return false;
      }

      try {
        await Taro.checkSession() // 登录态有效
        helper.log('登录态有效')
      } catch (err) { // 登录态过期了，这里要进行微信登录
        helper.log('登录态失效了，要重新登录')
        try {
          const loginData = await Taro.login()
          helper.log('loginData', JSON.stringify(loginData))
          // try {
          //   const login = await Taro.request({
          //     method: 'GET',
          //     url: `${helper.config('host')}/index/login`,
          //     header: {
          //       'content-type': 'application/x-www-form-urlencoded',
          //       'x-login-code': loginData.code,
          //       'appid': helper.config('appId')
          //     }
          //   })
          //   helper.log('登录的信息', login)
          //   if (login.data.code === 200) {
          //     helper.setSession(login.data.data)
          //   } else {
          //     helper.log('后台登录失败, 在这里进行第' + reLoginTime + '次重试')
          //     helper.login();
          //   }
          // } catch (err2) {
          //   helper.log('后台登录失败, 在这里进行第' + reLoginTime + '次重试')
          //   helper.login();
          // }
        } catch (err1) {
          helper.log('微信登录失败')
        }
      }
    } else if (process.env.TARO_ENV === 'h5') {
      helper.setSession('h5-fake-session')
      helper.log('H5登录')
    }
  },

  requestParams (url, data = {}, method = 'GET', params = {}) { // 请求头
    const URL = url.startsWith('http') ? url : `${helper.config('host')}${url}`
    return { ...params, ...{
        method: method,
        url: URL,
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': helper.getSession(),
          'appid': helper.config('appId')
        }
      } }
  },
  getParams (url, data, params) {
    return helper.requestParams(url, data, 'GET', params)
  },
  postParams (url, data, params) {
    return helper.requestParams(url, data, 'POST', params)
  },

  setSession (value) {
    Taro.setStorageSync(sessionKey, value)
  },

  getSession () {
    return Taro.getStorageSync(sessionKey)
  },

}

export default helper

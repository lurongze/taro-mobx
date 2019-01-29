import Taro from '@tarojs/taro'
import { observable, action, configure, runInAction } from 'mobx'
import {doLike, doCollect, weLogin, getMyLike, getMyComment, deleteLike, deleteCollect } from '../service/index'

configure({ enforceActions: 'always' })

class commonStore {

  @observable defaultAvatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544285251208&di=d3b5a0d1c0f52e5733c88a1ea81efc89&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F03%2F20140703194024_5YWEL.jpeg'

  @observable loginUser = {
    id: 1,
    nickname: 'lrz',
    avatar: this.defaultAvatar
  }

  @observable preUserInfo = {}

  @observable preGallery = {}

  @observable version = '1213'

  @action setPreUserId = (value) => {
    this.preUserInfo = value
  }

  @action setPreGallery = (value) => {
    this.preGallery = value
  }

  @action setVersion = (value) => {
    this.version = value
  }

  @action login = async () => {
    const login = await Taro.login()
    try {
      await Taro.checkSession() // 登录态有效
    } catch (err) { // 登录态过期了，这里要进行微信登录
      console.info('登录态失效了，要重新登录')
      try {
        const loginData = await Taro.login()
        const response = await weLogin(loginData.code)
        const res = response.data
        if (res.code === 200 ) {

        }
        console.log('loginData', res)
      } catch (err1) {
        console.error('微信登录失败')
      }
    }

    runInAction(() => {
      this.preUserInfo = login
    })
  }

  @action doLike = async (item) => {
    Taro.showLoading()
    const response = await doLike(this.loginUser.id, item.title, item.id)
    const res = response.data
    Taro.hideLoading()
    if (res.code === 200) {
      return Taro.showToast({
        title: '点赞成功',
        icon: 'none'
      })
    } else {
      return Taro.showToast({
        title: res.message || '点赞失败',
        icon: 'none'
      })
    }
  }

  @action.bound deleteLike = async (id) => {
    Taro.showLoading()
    const response = await deleteLike(id)
    const res = response.data
    Taro.hideLoading()
    if (res.code === 200) {
      return Taro.showToast({
        title: '删除成功',
        icon: 'none'
      })
    } else {
      return Taro.showToast({
        title: res.message || '删除失败',
        icon: 'none'
      })
    }
  }

  @action.bound deleteCollect = async (id) => {
    Taro.showLoading()
    const response = await deleteCollect(id)
    const res = response.data
    Taro.hideLoading()
    if (res.code === 200) {
      Taro.showToast({
        title: '删除成功',
        icon: 'none'
      })
      return true
    } else {
      Taro.showToast({
        title: res.message || '删除失败',
        icon: 'none'
      })
      return false
    }
  }

  @action doCollect = async (item) => {
    Taro.showLoading()
    const response = await doCollect(this.loginUser.id, item.title, item.id)
    const res = response.data
    Taro.hideLoading()
    if (res.code === 200) {
      return Taro.showToast({
        title: '收藏成功',
        icon: 'none'
      })
    } else {
      return Taro.showToast({
        title: res.message || '收藏失败',
        icon: 'none'
      })
    }
  }

  @action.bound getMyLikeList = async (memberId, page) => {
    const response = await getMyLike(memberId, page)
    return response.data
  }

  @action.bound getMCollectList = async (memberId, page) => {
    const response = await getMyComment(memberId, page)
    return response.data
  }

}

export default new commonStore()

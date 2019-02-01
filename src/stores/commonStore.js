import Taro from '@tarojs/taro'
import { observable, action, configure, runInAction } from 'mobx'
import {doLike, doCollect, weLogin, getMyLike, getMyComment, deleteLike, deleteCollect, getMyGallery, deleteGallery, updateUserInfo } from '../service/index'

configure({ enforceActions: 'always' })

class commonStore {

  @observable defaultAvatar = 'https://pic-1252599784.cos.ap-guangzhou.myqcloud.com/weappicons/default-avatar-item.png'

  @observable loginUser = {
    id: 0,
    realNickname: '',
    realAvatar: '',
    nickname: '',
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
    try {
      await Taro.checkSession() // 登录态有效
      let loginUser = Taro.getStorageSync('loginUser')
      if (loginUser && loginUser.length > 0) {
        loginUser = JSON.parse(loginUser)
        runInAction(()=>{
          this.loginUser = loginUser
        })
      } else {
        throw '登录'
      }

    } catch (err) { // 登录态过期了，这里要进行微信登录
      const loginData = await Taro.login()
      const response = await weLogin(loginData.code)
      const res = response.data
      runInAction(() => {
        if (res.code === 200 ) {
          let user = {
            id: res.data.id,
            realNickname: res.data.nickname || '',
            realAvatar: res.data.avatar || '',
            nickname: res.data.nickname || `wx${res.data.id}`,
            avatar: res.data.avatar || this.defaultAvatar
          }
          Taro.setStorage({
            key: 'loginUser',
            data: JSON.stringify(user)
          })
          this.loginUser = user
        }
      })
    }
  }

  @action updateUserInfo = async (userInfo) => {
    let loginUser = {...{}, ...this.loginUser}
    loginUser.realAvatar = userInfo.avatarUrl
    loginUser.avatar = userInfo.avatarUrl
    loginUser.realNickname = userInfo.nickName
    loginUser.nickname = userInfo.nickName
    this.loginUser = loginUser
    Taro.setStorage({
      key: 'loginUser',
      data: JSON.stringify(loginUser)
    })
    await updateUserInfo(loginUser.id, userInfo.avatarUrl, userInfo.nickName);
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

  @action.bound getMyGallery = async (memberId, page) => {
    const response = await getMyGallery(memberId, page)
    return response.data
  }

  @action.bound deleteGallery = async (id, memberId) => {
    Taro.showLoading()
    const response = await deleteGallery(id, memberId)
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

}

export default new commonStore()

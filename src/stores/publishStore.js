import Taro from '@tarojs/taro'
import { observable, action, configure, runInAction } from 'mobx'
import helper from '../utils/helper'
import { getInitGallery, updateGallery, uploadFile } from '../service/index'
import commonStore from './commonStore'

configure({ enforceActions: 'always' })

class publishStore {

  @observable categories = [
    { id: 1, name: 'COSPLAY' },
    { id: 2, name: '二次元' },
    { id: 3, name: '生活' },
    { id: 4, name: '风景' },
    { id: 5, name: '人物' },
    { id: 6, name: '手绘' },
    { id: 7, name: '壁纸' },
    { id: 8, name: '美图' },
    { id: 9, name: '动漫' },
  ]

  @observable galleryData = {}

  @observable pictureList = []

  @observable category = '' // 选中的分类

  @observable textAreaValue = '' // 文本框

  @action.bound setCategory = (cate) => {
    this.category = cate
  }

  @action.bound setTextAreaValue = (value) => {
    this.textAreaValue = value
  }

  @action.bound addPicture = (picture) => {
    if (Array.isArray(picture)) {
      this.pictureList = [...this.pictureList, ...picture]
    } else {
      this.pictureList = [...this.pictureList, picture]
    }
  }

  @action.bound removePicture = (picture) => {
    this.pictureList = this.pictureList.filter((item) => {
      return item !== picture
    })
  }

  @action.bound checkParams = () => {
    if (helper.isEmpty(this.textAreaValue)) {
      return '请填写内容'
    }
    if (helper.isEmpty(this.category)) {
      return '请选择分类'
    }
  }

  @action.bound getInitGallery = async () => {
    const response = await getInitGallery()
    const res = response.data
    runInAction(()=>{
      res.data.author = commonStore.loginUser.id
      this.galleryData = res.data
    })
  }


  @action.bound submit = async () => {
    Taro.showLoading()
    let galleryData = {...{}, ...this.galleryData}

    const cate = this.categories.find((item)=>{
      return item.id === this.category
    })

    galleryData.author = commonStore.loginUser.id
    galleryData.title = this.textAreaValue
    galleryData.covers = this.pictureList.join(',')
    galleryData.category = cate.name || ''
    const pictureList = this.pictureList
    let cover = []
    for(let i=0;i<pictureList.length; i++ ) {
      const res = await uploadFile(pictureList[i], galleryData.id, galleryData.author)
      if (res && res.length > 0) {
        cover.push(res)
      }
    }
    galleryData.covers = cover.join(',')

    await updateGallery(galleryData)
    Taro.hideLoading()
    Taro.showModal({
      title: '提示',
      content: '上传成功',
      showCancel: false,
      success() {
        Taro.navigateBack()
      }
    })
  }

}

export default new publishStore()

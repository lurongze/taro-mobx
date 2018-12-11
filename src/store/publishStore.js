import { observable, action, configure, /*runInAction*/ } from 'mobx'
import helper from '../utils/helper'

configure({ enforceActions: 'always' })

class publishStore {

  @observable categories = [
    { id: 1, name: 'COS图片' },
    { id: 2, name: '二次元美图' },
    { id: 3, name: '杂谈帖子' },
    { id: 4, name: 'COS图片' },
    { id: 5, name: '二次元美图' },
    { id: 6, name: '杂谈帖子' },
    { id: 7, name: 'COS图片' },
    { id: 8, name: '二次元美图' },
    { id: 9, name: '杂谈帖子' }
  ]

  @observable pictureList = []

  @observable category = '' // 选中的分类

  @observable textAreaValue = '' // 文本框

  @action.bound setCategory(cate) {
    this.category = cate
  }

  @action.bound setTextAreaValue(value) {
    this.textAreaValue = value
  }

  @action.bound addPicture(picture) {
    this.pictureList = [...this.pictureList, picture]
  }

  @action.bound removePicture(picture) {
    this.pictureList = this.pictureList.filter((item) => {
      return item !== picture
    })
  }

  @action.bound checkParams() {
    if (helper.isEmpty(this.textAreaValue)) {
      return '请填写内容'
    }
    if (helper.isEmpty(this.category)) {
      return '请选择分类'
    }
  }

  @action.bound submit() {
    console.log('textAreaValue', this.textAreaValue, this.category, this.pictureList)
  }

}

export default new publishStore()

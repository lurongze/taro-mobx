import { observable, action, configure } from 'mobx'
import helper from '../utils/helper'
import commonStore from './commonStore'
import { comment, getGalleryCommentList } from '../service/index'

configure({ enforceActions: 'always' })

class commentStore {

  @observable textAreaValue = '' // 文本框

  @action.bound checkParams() {
    if (helper.isEmpty(this.textAreaValue)) {
      return '请填写内容'
    }
    if (this.textAreaValue.length < 10) {
      return '评论最少10个字'
    }
  }

  @action.bound setTextAreaValue = (value) => {
    this.textAreaValue = value
  }

  @action.bound submit = async () => {
    console.log('textAreaValue', this.textAreaValue )
    const { preGallery, loginUser } = commonStore
    console.log('preGallery', preGallery)
    const response = await comment(loginUser.id, preGallery.title, preGallery.id, this.textAreaValue, loginUser.avatar, loginUser.nickname, preGallery.authorName)
    const res = response.data
    if (res.code === 200) {
      return 'ok'
    } else {
      return res.message
    }
  }

  @action.bound getList = async (galleryId, page) => {
    const response = await getGalleryCommentList(galleryId, page)
    return response.data
  }

}

export default new commentStore()

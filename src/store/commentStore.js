import { observable, action, configure } from 'mobx'
import helper from '../utils/helper'

configure({ enforceActions: 'always' })

class commentStore {

  @observable textAreaValue = '' // 文本框

  @action.bound checkParams() {
    if (helper.isEmpty(this.textAreaValue)) {
      return '请填写内容'
    }
  }

  @action.bound setTextAreaValue(value) {
    this.textAreaValue = value
  }

  @action.bound submit() {
    console.log('textAreaValue', this.textAreaValue )
  }
}

export default new commentStore()

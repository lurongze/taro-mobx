import { observable, action, configure, runInAction } from 'mobx'

configure({ enforceActions: 'always' })

class commonStore {

  @observable preUserInfo = {}

  @action setPreUserId(value) {
    this.preUserInfo = value
  }

}

export default new commonStore()

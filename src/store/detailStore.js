import { observable, action, configure, runInAction } from 'mobx'

configure({ enforceActions: 'always' })

class detailStore {

  @observable item = {}


  @action.bound detailStore() {
    this.item = {}

  }

}

export default new detailStore()

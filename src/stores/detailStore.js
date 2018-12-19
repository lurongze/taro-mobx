import { observable, action, configure, runInAction } from 'mobx'

configure({ enforceActions: 'always' })

class detailStore {

  @observable currentTab = 'comment'

  @observable item = {}


  @action.bound detailStore = () => {
    this.item = {}
  }

  @action.bound setCurrentTab = (value) => {
    this.currentTab = value
  }

}

export default new detailStore()

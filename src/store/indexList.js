import { observable, action, configure, /*runInAction*/ } from 'mobx'

configure({ enforceActions: 'always' })

class indexList {

  @observable list = 0

  @action modifyList() {
    this.list = [ ...Array(100).keys()]
  }

}

export default new indexList()

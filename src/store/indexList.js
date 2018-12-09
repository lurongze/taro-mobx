import { observable, action, configure, /*runInAction*/ } from 'mobx'

configure({ enforceActions: 'always' })

class indexList {

  @observable list = [ ...Array(9).keys()]

  @action modifyList() {
    this.list = [ ...Array(100).keys()]
  }

}

export default new indexList()

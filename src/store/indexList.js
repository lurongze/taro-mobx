import { observable, action, configure, /*runInAction*/ } from 'mobx'

configure({ enforceActions: 'always' })

class indexList {

  @observable list = [
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ]

  @action modifyList() {
    this.list = [ ...Array(100).keys()]
  }

}

export default new indexList()

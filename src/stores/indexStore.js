import { observable, action, configure, runInAction } from 'mobx'

import { getList } from '../service/index'

configure({ enforceActions: 'always' })

class indexStore {

  @observable loadingList = false

  @observable page = 1

  @observable list = []

  @observable nomore = false

  @action getList = async () => {
    if (this.nomore || this.loadingList) {
      return false
    }
    this.loadingList = true
    const response = await getList(this.page)
    const res = response.data
    runInAction(() => {
      if ( res.code === 200 ) {
        if (res.data.list && res.data.list.length) {
          this.list = [ ...this.list, ...res.data.list ]
          this.page = res.data.nextPage
          this.nomore = res.data.isLastPage
        } else {
          this.nomore = true
        }
      }
      this.loadingList = false
    })
  }

  @action setValue = (key, value) => {
    this[key] = value
  }

}

export default new indexStore()

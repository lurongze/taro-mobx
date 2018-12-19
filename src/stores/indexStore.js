import { observable, action, configure, runInAction } from 'mobx'

import { getList } from '../service/index'

configure({ enforceActions: 'always' })

class indexStore {

  @observable loadingList = false

  @observable page = 1

  @observable list = []

  @observable listType = 'all' // 首页列表分类

  @action modifyList = () => {
    this.list = [ ...Array(100).keys()]
  }

  @action getList = async () => {
    this.loadingList = true
    const res = await getList(this.page)

    console.log('res', res)

    runInAction(() => {
      this.list = [ ...this.list, ...res.data.data ]
      this.page = res.data.page + 1
      this.loadingList = false
    })
  }

  @action setValue = (key, value) => {
    this[key] = value
  }

}

export default new indexStore()

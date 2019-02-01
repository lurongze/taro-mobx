import Taro from '@tarojs/taro'
import { observable, action, configure, runInAction } from 'mobx'

import { getList, getLikeMostGallery } from '../service/index'

configure({ enforceActions: 'always' })

class indexStore {

  @observable loadingList = false

  @observable likeMost = []

  @observable page = 1

  @observable list = []

  @observable nomore = false

  @action initData = async () => {
    this.loadingList = false
    this.page = 1
    this.list = []
    this.nomore = false
    await this.getList()
    Taro.stopPullDownRefresh()
  }

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

  @action getLikeMostGallery = async () => {
    const { data: res } = await getLikeMostGallery();

    runInAction(()=>{
      if (res.code === 200) {
        this.likeMost = res.data.filter((item)=>{
          const covers = item.covers ? item.covers.split(',') : []
          return covers.length
        }).map((item)=>{
          const covers = item.covers.split(',')
          return {
            link: covers[0],
            id: item.id
          }
        })
      }
    })


  }

  @action setValue = (key, value) => {
    this[key] = value
  }

}

export default new indexStore()

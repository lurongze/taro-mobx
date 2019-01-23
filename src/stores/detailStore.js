import { observable, action, configure, runInAction } from 'mobx'
import { getGalleryDetail } from '../service'

configure({ enforceActions: 'always' })

class detailStore {

  @observable currentTab = 'comment'

  @observable detailData = {}

  @observable loading = false


  @action.bound getDetail = async (id) => {

    const response = await getGalleryDetail(id);
    const res = response.data

    runInAction(() => {
        this.detailData = res.data
    })

  }

  @action.bound setCurrentTab = (value) => {
    this.currentTab = value
  }

}

export default new detailStore()

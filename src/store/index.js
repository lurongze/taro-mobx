/*
* 所有的stores都放到这里来整合吧
* */
import commonStore from './commonStore'
import counterStore from './counterStore'
import indexStore from './indexStore'
import publishStore from './publishStore'
import commentStore from './commentStore'
import detailStore from './detailStore'

const stores = {
  counterStore,
  indexStore,
  commentStore,
  commonStore,
  detailStore,
  publishStore
}

export default stores;

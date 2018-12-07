/*
* 所有的stores都放到这里来整合吧
* */
import counterStore from './counter'
import indexList from './indexList'

const stores = {
  counterStore,
  indexList
}

export default stores;

import Taro from '@tarojs/taro'
import { observable, action, configure, runInAction } from 'mobx'

configure({ enforceActions: 'always' })

class commonStore {

  @observable defaultAvatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544285251208&di=d3b5a0d1c0f52e5733c88a1ea81efc89&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F03%2F20140703194024_5YWEL.jpeg'

  @observable preUserInfo = {}

  @observable version = '1213'

  @action setPreUserId = (value) => {
    this.preUserInfo = value
  }

  @action setVersion = (value) => {
    this.version = value
  }

  @action login = async () => {
    const login = await Taro.login()
    runInAction(() => {
      this.preUserInfo = login
    })
  }

}

export default new commonStore()

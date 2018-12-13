import { observable, action, configure, runInAction } from 'mobx'

configure({ enforceActions: 'always' })

class userStore {

  @observable counter = 0

  @action increment() {
    this.counter ++
  }

  @action decrement() {
    this.counter --
  }

  @action.bound incrementAsync() {
    setTimeout(() => {
      runInAction(() => {
        this.counter ++
      })
    }, 1000)
  }
}

export default new userStore()

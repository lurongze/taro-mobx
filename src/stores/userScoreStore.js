import { observable, action, configure } from 'mobx'

configure({ enforceActions: 'always' })

class userScoreStore {

  @observable list = [
    { id: 1, title: '签到', score: 10 },
    { id: 2, title: '邀请好友', score: 50 },
    { id: 3, title: '签到', score: 10 },
    { id: 4, title: '签到', score: 10 },
    { id: 5, title: '签到', score: 10 },
    { id: 6, title: '签到', score: 10 },
    { id: 7, title: '签到', score: 10 },
    { id: 8, title: '签到', score: 10 },
    { id: 9, title: '签到', score: 10 },
    { id: 10, title: '签到', score: 10 },
  ]

  @observable page = 1;


  @action.bound addList = (list) => {
    this.list = [ ...this.list, list ]
  }



}

export default new userScoreStore()

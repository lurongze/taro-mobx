import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import withLogin from '../../hoc/withLogin'
import './index.scss'

@inject('userStore', 'commonStore')
@observer
@withLogin()
class user extends Taro.Component {

  config = {
    navigationBarTitleText: '我的相册'
  }

  state = {
    page: 1,
    list: [],
    loading: false,
    isLastPage: false
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () {
    this.getList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom() {
    this.getList()
  }


  viewUserScore = (url) => {
    return Taro.navigateTo({
      url: url
    })
  }

  getList = async () => {
    const { page, list, loading, isLastPage } = this.state
    const { commonStore: store } = this.props
    if (loading || isLastPage) {
      return false
    }

    const loginUser = store.loginUser

    const res = await store.getMyGallery(loginUser.id, page)

    if (res.code === 200 && res.data.list) {
      this.setState({
        list: [...list, ...res.data.list],
        loading: false,
        page:res.data.nextPage,
        isLastPage: res.data.isLastPage
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }

  deleteAction = (id) => {
    const { commonStore: store } = this.props
    const loginUser = store.loginUser
    const { list } = this.state
    Taro.showActionSheet({
      itemList: ['删除'],
      success: async () => {
        await store.deleteGallery(id, loginUser.id)
        this.setState({
          list: list.filter((item)=>{ return item.id !== id })
        })
      }
    })
  }

  render () {

    const { list, loading, isLastPage } = this.state

    return (
      <View className='index'>
        <View className='block'>
          {
            list.map((item) => {
              return (
                <View  className='list' key={item.id}>
                  <View className='van-icon van-icon-delete' onClick={this.deleteAction.bind(this, item.id)} />
                  <View className='title' onClick={this.viewUserScore.bind(this, `/pages/detail/index?id=${item.id}`)}>{item.title}</View>
                  {/*<View className='count'>7</View>*/}
                  <View className='van-icon van-icon-arrow' />
                </View>
              )
            })
          }
        </View>
        {
          loading && (
            <View className='loading'>
              加载中...
            </View>
          )
        }

        {
          !loading && list.length > 0 && (
            <View className='loading'>
              -- 我是有底线的 --
            </View>
          )
        }
        {
          !loading && list.length < 1 && (
            <View className='loading'>
              -- 还没有相册数据哦 --
            </View>
          )
        }
      </View>
    )
  }
}

export default user

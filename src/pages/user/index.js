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
    navigationBarTitleText: '个人中心'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  viewUserScore = (url) => {
    return Taro.navigateTo({
      url: url
    })
  }

  render () {
    const { commonStore: { defaultAvatar, loginUser } } = this.props

    return (
      <View className='index'>
        <View className='header'>
          <Image className='avatar' src={loginUser.avatar} />
          <View className='name'>{loginUser.nickname}</View>
        </View>

        <View className='block'>
          {
            [
              { title: '我的点赞', icon: 'van-icon-card', path: '/pages/user/like-list'},
              { title: '我的收藏', icon: 'van-icon-card', path: '/pages/user/collect-list'},
              // { title: '我的相册', icon: 'van-icon-card', path: '/pages/user/gallery-list'},
              // { title: '我的积分', icon: 'van-icon-card', path: '/pages/user-score/index'}
            ].map((item) => {
              return (
                <View onClick={this.viewUserScore.bind(this, item.path || '/pages/user-score/index')} className='list' key={item.title}>
                  <View className='van-icon van-icon-card' />
                  <View className='title'>{item.title}</View>
                  {/*<View className='count'>7</View>*/}
                  <View className='van-icon van-icon-arrow' />
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default user

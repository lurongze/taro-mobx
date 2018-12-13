import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('userStore', 'commonStore')
@observer
class user extends Taro.Component {

  config = {
    navigationBarTitleText: '评论'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    const { commonStore: { defaultAvatar } } = this.props

    return (
      <View className='index'>
        <View className='header'>
          <Image className='avatar' src={defaultAvatar} />
          <View className='name'>柳岩<Text className='level'>lv5</Text></View>
        </View>

        <View className='block'>
          {
            [1,2,3,4,5].map((n) => {
              return (
                <View className='list' key={n}>
                  <View className='icon iconfont icon-Sign' />
                  <View className='title'>我的点赞</View>
                  <View className='count'>7</View>
                  <View className='icon iconfont icon-gonggao' />
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

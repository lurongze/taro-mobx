import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('userScoreStore', 'commonStore')
@observer
class userScore extends Taro.Component {

  config = {
    navigationBarTitleText: '会员积分'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
      <View className='index'>
        <View className='header'>
          <View className='title'>积分</View>
          <View className='score'>998</View>
        </View>

        <View className='block'>
          {
            [1,2,3,4,5].map((n) => {
              return (
                <View className='list' key={n}>
                  <View className='title'>我的点赞</View>
                  <View className='count'>+7</View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default userScore

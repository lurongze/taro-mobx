import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544285251208&di=d3b5a0d1c0f52e5733c88a1ea81efc89&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F03%2F20140703194024_5YWEL.jpeg'
@inject('detailStore', 'commonStore')
@observer
class Detail extends Taro.Component {

  config = {
    navigationBarTitleText: '详情'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const list = [...Array(15).keys()]
    return (
      <View className='index'>
        <View className='header'>
          <View className='avatar' style={{backgroundImage: `url(${image})`}} />
          <View className='info'>
            <View className='name'>
              柳岩<Text className='level'>lv1</Text>
            </View>
            <View className='info-bottom'>
              <View className='time'>2018/09/23 12:12</View>
              <View className='view-count'>浏览量100</View>
            </View>
          </View>
        </View>
        <View className='desc'>
          这是我的第999套相片哦，希望大家喜欢。喜欢的请多点赞，或者关注我哦。我会不定时更新各种美图和大家一起分享的，也可关注我的淘宝店铺购买全套相册！
        </View>
        <View className='picture-list'>
          {
            list.map((n) => {
              return (
                <Image className='image-item' key={n} src={image} mode='widthFIx' />
              )
            })
          }
        </View>
        <View className='action-list'>
          <View className='action-item iconfont icon-dianzan' />
          <View className='action-item iconfont icon-dianzan' />
          <View className='action-item iconfont icon-Group-' />
          <View className='action-comment'>评论</View>
        </View>
      </View>
    )
  }
}

export default Detail

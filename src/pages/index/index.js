import Taro from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import helper from '../../utils/helper'
import './index.scss'

const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544285251208&di=d3b5a0d1c0f52e5733c88a1ea81efc89&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F03%2F20140703194024_5YWEL.jpeg'
@inject('counterStore', 'indexList')
@observer
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()

    Taro.request(helper.getParams())


  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore, indexList } = this.props
    indexList.modifyList();
    counterStore.incrementAsync()
  }

  login = () => {
    helper.login()
  }

  render () {
    const { counterStore: { counter }, indexList: { list } } = this.props
    return (
      <View className='index'>
        <View className='header'>
          <View className='search'>
            <View className='logo' />
            <View className='input-bg'>
              <View className='icon iconfont icon-search' />
              <Input className='search-input' />
            </View>
          </View>
          <View className='title-block'>
            <View className='big-logo' />
            <View className='site-info'>
              <View className='site-info-header'>
                <View className='item'><Text className='iconfont icon-Sign' />签到</View>
                <View className='item'><Text  className='iconfont icon-iconfontzhizuobiaozhun49' />邀请</View>
              </View>
              <View className='text'>总浏览30.6万 用户数9384</View>
            </View>
          </View>
        </View>
        <View className='notice'>
          <Text className='iconfont icon-gonggao' />
          <Text className='notice-title'>公告：淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线</Text>
        </View>

        <View className='list-block'>
          {
            list.map((item) => {
              return (
                <View className='list-item' key={item}>
                  <View className='list-header'>
                    <View className='list-avatar' />
                    <View className='list-title'>
                      卢荣泽
                      <Text className='list-level'>lv5</Text>
                    </View>
                    <View className='iconfont icon-gengduo' />
                  </View>
                  <View className='list-desc'>
                    <Text className='item-cate'>#cosplay#</Text>这是我的第一套相片哦，希望大家喜欢。喜欢的请多点赞，或者关注我哦。我会不定时更新各种美图和大家一起分享的，也可关注我的淘宝店铺购买全套相册！
                  </View>
                  <View className='list-gallery'>
                    {
                      list.map((e) => {
                        return (
                          <View className='gallery-item' key={e}>
                            {
                              e < 8 && (
                                <Image className='gallery-image' src={image} />
                              )
                            }
                          </View>
                        )
                      })
                    }
                  </View>
                  <View className='list-footer'>
                    <View className='list-time'>2018/09/12 12:13</View>
                    <View className='iconfont icon-pinglun' />
                    <View className='iconfont icon-dianzan'><Text className='like-count'>500</Text></View>
                  </View>
                </View>
              )
            })
          }
        </View>

      </View>
    )
  }
}

export default Index

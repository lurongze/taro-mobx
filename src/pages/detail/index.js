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

  changeTab = (key) => {
    this.props.detailStore.setCurrentTab(key)
  }

  render () {
    const { detailStore: { currentTab } } = this.props
    const list = [...Array(20).keys()]
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
            list.filter((n) => {
              return n < 4
            }).map((n) => {
              return (
                <Image className='image-item' key={n} src={image} mode='widthFIx' />
              )
            })
          }
        </View>
        <View className='custom-block'>
          <View className='tab-list'>
            <View onClick={this.changeTab.bind(this, 'comment')} className={`tab-item ${currentTab === 'comment' ? 'active' : ''}`}>评论100</View>
            <View onClick={this.changeTab.bind(this, 'like')} className={`tab-item ${currentTab === 'like' ? 'active' : ''}`}>点赞99</View>
          </View>

          <View className={`comment-list ${currentTab === 'comment' ? 'active' : ''}`}>
            {
              list.map((n) => {
                return (
                  <View className='comment-list-item' key={n}>
                    <Image className='comment-avatar' src={image} />
                    <View className='comment-block'>
                      <View className='comment-title'>
                        <View className='comment-name'>柳岩</View>
                      </View>
                      <View className='comment-content'>
                        <Text className='comment-to'>@冯提莫</Text>
                        这一套图片非常好看呀，好喜欢，希望以后还有更多这样的高质量cosplay这一套图片非常好看呀，好喜欢，希望以后还有更多这样的高质量cosplay这一套图片非常好看呀，好喜欢，希望以后还有更多这样的高质量cosplay
                      </View>
                      <View className='comment-time'>2018/09/12</View>
                    </View>
                  </View>
                )
              })
            }
          </View>

          <View className={`like-list ${currentTab === 'like' ? 'active' : ''}`}>
            {
              list.map((n) => {
                return (
                  <Image key={n} className='like-avatar' src={image} />
                )
              })
            }
          </View>

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

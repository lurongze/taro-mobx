import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('detailStore', 'commonStore')
@observer
class Detail extends Taro.Component {

  config = {
    navigationBarTitleText: '详情'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () {
    const { detailStore } = this.props;
    detailStore.getDetail(this.$router.params.id)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  changeTab = (key) => {
    this.props.detailStore.setCurrentTab(key)
  }

  goComment = (item) => {
    const { commonStore: store, detailStore: { detailData } } = this.props
    store.commonStore.setPreGallery({
      name: detailData.authorName || '',
      desc: detailData.title || '',
      avatar: detailData.authorAvatar || '',
      author: detailData.author || 0
    });
    return Taro.navigateTo({
      url: '/pages/comment/index'
    })
  }

  doLike = () => {
    const { commonStore: store, detailStore: { detailData } } = this.props
    store.doLike(detailData)
  }

  render () {
    const { detailStore: { currentTab, detailData } } = this.props
    const list = detailData.covers.split(',')
    return (
      <View className='index'>
        <View className='header'>
          <View className='avatar' style={{backgroundImage: `url(${detailData.authorAvatar})`}} />
          <View className='info'>
            <View className='name'>
              {detailData.authorName}
            </View>
            <View className='info-bottom'>
              <View className='time'>2018/09/23 12:12</View>
              <View className='view-count'>收藏{detailData.collectCount || 0}</View>
            </View>
          </View>
        </View>
        <View className='desc'>
          {detailData.title}
        </View>
        <View className='picture-list'>
          {
            list.map((item, index) => {
              return (
                <Image className='image-item' key={index} src={item} mode='widthFIx' />
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
              list.filter((n) => {
                return n < 4
              }).map((n) => {
                return (
                  <View className='comment-list-item' key={n}>
                    <Image className='comment-avatar' src={''} />
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
                  <Image key={n} className='like-avatar' src={''} />
                )
              })
            }
          </View>

        </View>
        <View className='action-list'>
          <View className='action-item van-icon van-icon-more' />
          <View className='action-item van-icon van-icon-share' />
          <View onClick={this.goComment} className='action-comment'>评论</View>
        </View>
      </View>
    )
  }
}

export default Detail

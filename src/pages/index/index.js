import Taro from '@tarojs/taro'
import { View, Button, Text, Block } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import withLogin from '../../hoc/withLogin'
import Gallery from '../../components/gallery/gallery'
import SwiperImg from '../../components/swiper-img/swiper-img'
import helper from '../../utils/helper'
import './index.scss'


@inject('indexStore', 'commonStore')
@observer
@withLogin()
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  }

  componentWillMount () { }

  componentDidMount () {
    const { indexStore } = this.props
    indexStore.getLikeMostGallery()
    indexStore.getList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh() {
    const { indexStore } = this.props
    indexStore.initData()
  }

  login = () => {
    helper.login()
  }

  navigateTo = (url) => {
    return Taro.navigateTo({
      url
    })
  }

  goComment = (item) => {
    this.props.commonStore.setPreGallery(item);
    return Taro.navigateTo({
      url: '/pages/comment/index'
    })
  }

  goDetail = (id, e) => {
    return Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  goPublish = () => {
    return Taro.navigateTo({
      url: '/pages/publish/index'
    })
  }

  doLike = (item) => {
    const { commonStore: store } = this.props
    store.doLike(item)
  }

  showMore = (item) => {
    const { commonStore: store } = this.props
    Taro.showActionSheet({
      itemList: ['收藏'],
      success(res) {
        console.log('res', res)
        store.doCollect(item)
      }
    })
  }

  onReachBottom = () => {
    const { indexStore } = this.props
    indexStore.getList()
  }

  render () {
    const { indexStore: { list, loadingList,likeMost }, commonStore: { version, defaultAvatar } } = this.props
    return (
      <View className='index'>
        <View className='header'>
          <SwiperImg imgData={likeMost} />
        </View>
        {/*<View className='notice' onClick={this.navigateTo.bind(this, '/pages/publish/index')}>*/}
          {/*<Text className='van-icon van-icon-volume' />*/}
          {/*<Text className='notice-title'>{version}公告：淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线</Text>*/}
        {/*</View>*/}

        <View className='list-block'>
          {
            list.map((item) => {
              return (
                <View className='list-item' key={item.id}>
                  <View className='list-header'>
                    <View className='list-avatar' style={{backgroundImage: `url(${item.authorAvatar || defaultAvatar})`}} />
                    <View className='list-title'>
                      <View className='list-user'>{item.authorName || '匿名用户'}</View>
                      <View className='list-time'>{helper.formatTime(item.publishTime)}</View>
                    </View>
                    <View className='van-icon van-icon-more' onClick={this.showMore.bind(this, item)} />
                  </View>
                  <View className='list-desc' onClick={this.goDetail.bind(this, item.id)}>
                    <Text className='item-cate'>#{item.category}#</Text>{item.title}
                  </View>
                  <View onClick={this.goDetail.bind(this, item.id)}>
                    <Gallery list={item.covers ? item.covers.split(',') : []}  />
                  </View>
                  <View className='list-footer'>
                    <View className='footer-action'>
                      <Text className='van-icon van-icon-share' /> 分享
                      <Button openType='share' className='share-opacity' />
                    </View>
                    <View className='footer-action hiddenItem' onClick={this.goComment.bind(this, item)}>
                      <Text className='van-icon van-icon-edit' /> 评论
                    </View>
                    <View className='footer-action' onClick={this.doLike.bind(this, item)}>
                      <Text className='van-icon van-icon-like-o' /> 点赞
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        {
          loadingList && (
            <View className='loading'>
              加载中...
            </View>
          )
        }

        {
          !loadingList && list.length > 0 && (
            <View className='loading'>
              -- 我是有底线的 --
            </View>
          )
        }

        <View onClick={this.goPublish.bind(this)} className='hiddenItem publishButton van-icon van-icon-add' />
      </View>
    )
  }
}

export default Index

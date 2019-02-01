import Taro from '@tarojs/taro'
import {View, Text, Image, Button} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import withLogin from '../../hoc/withLogin'
import './index.scss'
import helper from "../../utils/helper";

@inject('detailStore', 'commonStore', 'commentStore')
@observer
@withLogin()
class Detail extends Taro.Component {

  config = {
    navigationBarTitleText: '详情'
  }

  state = {
    page: 1,
    commentList: [],
    isLastPage: false,
    loading: false
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () {
    const { detailStore } = this.props;
    detailStore.getDetail(this.$router.params.id)
    this.getComment()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom () {
    this.getComment()
  }
  changeTab = (key) => {
    this.props.detailStore.setCurrentTab(key)
  }

  goComment = () => {
    const { commonStore: store, detailStore: { detailData } } = this.props
    store.setPreGallery(detailData);
    return Taro.navigateTo({
      url: '/pages/comment/index'
    })
  }

  doLike = () => {
    const { commonStore: store, detailStore: { detailData } } = this.props
    store.doLike(detailData)
  }

  moreAction = () => {
    Taro.showActionSheet({
      itemList: ['收藏', '点赞'],
      success(res) {
        console.log('res', res)
        Taro.showToast({
          title: '功能开发中...',
          icon: 'none'
        })
      }
    })
  }

  getComment = async () => {
    const { commentList, loading, isLastPage, page } = this.state
    const { commentStore: store, detailStore: { detailData } } = this.props
    if (loading || isLastPage) {
      return false
    }
    this.setState({
      loading: true
    })
    const res = await store.getList(this.$router.params.id, page)
    if (res.code === 200 && res.data.list) {
      this.setState({
        commentList: [...commentList, ...res.data.list],
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

  render () {
    const { detailStore: { currentTab, detailData }, commonStore: { defaultAvatar } } = this.props
    const list = detailData.covers ? detailData.covers.split(',') : []

    const { commentList, loading, isLastPage } = this.state

    return (
      <View className='index'>
        <View className='header'>
          <View className='avatar' style={{backgroundImage: `url(${detailData.authorAvatar || defaultAvatar})`}} />
          <View className='info'>
            <View className='name'>
              {detailData.authorName || '匿名用户'}
            </View>
            <View className='info-bottom'>
              <View className='time'>{helper.formatTime(detailData.publishTime, 'Y-M-D h:m')}</View>
              {/*<View className='view-count'>收藏{detailData.collectCount || 0}</View>*/}
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
                <Image className='image-item' key={index} src={item} mode='widthFix' />
              )
            })
          }
        </View>
        <View className='loading'>
          -- 我是有底线的 --
        </View>
        <View className='custom-block hiddenItem'>
          <View className='tab-list'>
            <View onClick={this.changeTab.bind(this, 'comment')} className={`tab-item ${currentTab === 'comment' ? 'active' : ''}`}>评论</View>
            <View onClick={this.changeTab.bind(this, 'like')} style={{display: 'none'}} className={`tab-item ${currentTab === 'like' ? 'active' : ''}`}>点赞</View>
          </View>

          <View className={`comment-list ${currentTab === 'comment' ? 'active' : ''}`}>
            {
              commentList.map((item) => {
                return (
                  <View className='comment-list-item' key={item.id}>
                    <Image className='comment-avatar' src={item.authorAvatar} />
                    <View className='comment-block'>
                      <View className='comment-title'>
                        <View className='comment-name'>{item.authorName}</View>
                      </View>
                      <View className='comment-content'>
                        {/*<Text className='comment-to'>@冯提莫</Text>*/}
                        {item.content}
                      </View>
                      <View className='comment-time'>{helper.formatTime(item.createTime, 'Y-M-D h:m')}</View>
                    </View>
                  </View>
                )
              })
            }
            {
              loading && (
                <View className='loading'>
                  加载中...
                </View>
              )
            }

            {
              !loading && commentList.length > 0 && (
                <View className='loading'>
                  -- 我是有底线的 --
                </View>
              )
            }
            {
              !loading && commentList.length < 1 && (
                <View className='loading'>
                  -- 还没有人评论哦 --
                </View>
              )
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
          <View className='action-item van-icon van-icon-more' onClick={this.moreAction} />
          <View className='action-item van-icon van-icon-share'>
            <Button openType='share' className='share-opacity' />
          </View>
          <View onClick={this.goComment} className='action-comment hiddenItem'>评论</View>
        </View>
      </View>
    )
  }
}

export default Detail

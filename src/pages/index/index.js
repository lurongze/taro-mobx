import Taro from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import withLogin from '../../hoc/withLogin'
import Gallery from '../../components/gallery/gallery'
import TabList from '../../components/tabList/index'
import helper from '../../utils/helper'
import './index.scss'

let image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544285251208&di=d3b5a0d1c0f52e5733c88a1ea81efc89&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F03%2F20140703194024_5YWEL.jpeg'

image = 'http://img4.tuwandata.com/v2/thumb/jpg/YjQzYywxNTgsMTU4LDksMywxLC0xLE5PTkUsLCw5MA==/u/res.tuwan.com/zipgoods/20181213/e09f10da72db9d79de1e8d5fe9a1dbcb.jpg'


@inject('indexStore', 'commonStore')
@observer
@withLogin()
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
    console.log('index-componentDidMount')
    const { indexStore } = this.props
    indexStore.getList();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  login = () => {
    helper.login()
  }

  switchTab = (index, detail) => {
    const { indexStore } = this.props
    indexStore.setValue('listType', detail.id);
  }

  navigateTo = (url) => {
    return Taro.navigateTo({
      url
    })
  }

  goComment = (item) => {
    this.props.commonStore.setPreUserId({
      name: '柳岩' + item,
      desc: '这是我的第999套相片哦，希望大家喜欢。喜欢的请多点赞，或者关注我哦。我会不定时更新各种美图和大家一起分享的，也可关注我的淘宝店铺购买全套相册！',
      avatar: image,
      item: item
    });
    return Taro.navigateTo({
      url: '/pages/comment/index'
    })
  }

  goDetail = (item) => {
    this.props.commonStore.setPreUserId({
      name: '柳岩' + item,
      desc: '这是我的第999套相片哦，希望大家喜欢。喜欢的请多点赞，或者关注我哦。我会不定时更新各种美图和大家一起分享的，也可关注我的淘宝店铺购买全套相册！',
      avatar: image,
      item: item
    });
    return Taro.navigateTo({
      url: '/pages/detail/index'
    })
  }

  goPublish = () => {
    return Taro.navigateTo({
      url: '/pages/publish/index'
    })
  }

  onReachBottom = () => {
    const { indexStore } = this.props
    indexStore.getList();
  }

  render () {
    const { indexStore: { list, listType, loadingList }, commonStore: { version } } = this.props
    return (
      <View className='index'>
        <View className='header'>
          <View className='search'>
            <View className='logo' />
            <View className='input-bg'>
              <View className='icon iconfont icon-search' />
              <Input className='search-input' value={listType} />
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
        <View className='notice' onClick={this.navigateTo.bind(this, '/pages/publish/index')}>
          <Text className='iconfont icon-gonggao' />
          <Text className='notice-title'>{version}公告：淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线淘宝优惠券商城新上线</Text>
        </View>

        <View className='tab-list'>
          <TabList onSwitch={this.switchTab} list={[{ id: 'all', text: '全部' }, {id: 'hot', text: '最热'}, { id: 'text', text: '文字帖' }]} width='33.3333' />
        </View>

        <View className='list-block'>
          {
            list.map((item) => {
              return (
                <View className='list-item' key={item.id} onClick={this.goDetail.bind(this, item)}>
                  <View className='list-header'>
                    <View className='list-avatar' style={{backgroundImage: `url(${image})`}} />
                    <View className='list-title'>
                      <View className='list-user'>冯提莫<Text className='list-level'>lv5</Text></View>
                      <View className='list-time'>2018/09/12 12:13</View>
                    </View>
                    <View className='iconfont icon-gengduo' />
                  </View>
                  <View className='list-desc'>
                    <Text className='item-cate'>#cosplay#</Text>{item.title}
                  </View>
                  <Gallery list={[item.pic, item.pic, item.pic , item.pic, item.pic, item.pic]} />
                  <View className='list-footer'>
                    <View className='footer-action'>
                      <Text className='iconfont icon-gonggao' /> 分享
                    </View>
                    <View className='footer-action' onClick={this.goComment.bind(this, item)}>
                      <Text className='iconfont icon-pinglun' /> 评论
                    </View>
                    <View className='footer-action'>
                      <Text className='iconfont icon-dianzan' /> 点赞
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        {
          loadingList && (
            <View className='loading'>加载中...</View>
          )
        }
        <View onClick={this.goPublish.bind(this)} className='publishButton iconfont icon-pinglun' />
      </View>
    )
  }
}

export default Index

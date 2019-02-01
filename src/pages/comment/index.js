import Taro from '@tarojs/taro'
import {View, Textarea, Button} from '@tarojs/components'
import withLogin from '../../hoc/withLogin'
import { observer, inject } from '@tarojs/mobx'
import helper from '../../utils/helper'
import './index.scss'

@inject('commentStore', 'commonStore')
@observer
@withLogin()
class Comment extends Taro.Component {

  config = {
    navigationBarTitleText: '评论'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  changeValue = (e) => {
    this.props.commentStore.setTextAreaValue(e.detail.value || '')
  }

  submit = async () => {
    Taro.showLoading()
    const { commentStore } = this.props
    const tip = commentStore.checkParams();
    if (!helper.isEmpty(tip)) {
      return Taro.showToast({
        title: tip,
        icon: 'none'
      })
    }
    const res = await commentStore.submit();
    Taro.hideLoading()
    if (res === 'ok') {
      commentStore.setTextAreaValue('')
      return Taro.showModal({
        title: '提示',
        content: '评论成功',
        showCancel: false,
        success: () => {
          Taro.navigateBack()
        }
      })

    } else {
      return Taro.showToast({
        title: res,
        icon: 'none',
        duration: 3000
      })
    }
  }
  cancel = () => {
    return Taro.navigateBack()
  }

  getUserInfo = async (data) => {
    console.log('getUserInfo', data)
    const { commonStore: { updateUserInfo } } = this.props
    const userInfo = data.detail.userInfo || {}
    updateUserInfo(userInfo);
    await this.submit();
  }

  render () {

    const { commonStore: { preGallery, defaultAvatar, loginUser }} = this.props

    return (
      <View className='index'>
        <View className='text-area'>
          <Textarea className='textarea' onInput={this.changeValue.bind(this)} />
        </View>
        <View className='comment-desc'>
          <View className='avatar' style={{backgroundImage: `url(${preGallery.authorAvatar || defaultAvatar})`}} />
          <View className='desc'>
            <View className='name'>@{preGallery.authorName || '匿名用户'}</View>
            <View className='info'>{preGallery.title}</View>
          </View>
        </View>
        <View className='action-list'>
          {
            loginUser.realNickname.length < 1 && (
              <View className='action-submit action-button'>
                提    交
                <Button className='user-info' openType='getUserInfo' onGetUserInfo={this.getUserInfo} />
              </View>
            )
          }
          {
            loginUser.realNickname.length > 0 && (
              <View onClick={this.submit.bind(this)} className='action-submit action-button'>
                提    交
              </View>
            )
          }
          <View onClick={this.cancel.bind(this)} className='action-cancel action-button'>取    消</View>
        </View>
      </View>
    )
  }
}

export default Comment

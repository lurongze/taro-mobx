import Taro from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import helper from '../../utils/helper'
import './index.scss'

@inject('commentStore', 'commonStore')
@observer
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
  render () {

    const { commonStore: { preGallery } } = this.props

    return (
      <View className='index'>
        <View className='text-area'>
          <Textarea className='textarea' onInput={this.changeValue.bind(this)} />
        </View>
        <View className='comment-desc'>
          {
            preGallery.authorName && (
              <View className='avatar' style={{backgroundImage: `url(${preGallery.authorAvatar})`}} />
            )
          }
          <View className='desc'>
            <View className='name'>@{preGallery.authorName}</View>
            <View className='info'>{preGallery.title}</View>
          </View>
        </View>
        <View className='action-list'>
          <View onClick={this.submit.bind(this)} className='action-submit action-button'>提    交</View>
          <View onClick={this.cancel.bind(this)} className='action-cancel action-button'>取    消</View>
        </View>
      </View>
    )
  }
}

export default Comment

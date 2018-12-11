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

  submit = () => {
    const { commentStore } = this.props
    const tip = commentStore.checkParams();
    if (!helper.isEmpty(tip)) {
      return Taro.showToast({
        title: tip,
        icon: 'none'
      })
    }
    const res = commentStore.submit();
  }

  render () {

    const { commonStore: { preUserInfo } } = this.props

    return (
      <View className='index'>
        <View className='text-area'>
          <Textarea className='textarea' onInput={this.changeValue.bind(this)} />
        </View>
        <View className='comment-desc'>
          {
            preUserInfo.avatar && (
              <View className='avatar' style={{backgroundImage: `url(${preUserInfo.avatar})`}} />
            )
          }
          <View className='desc'>
            <View className='name'>@{preUserInfo.name}</View>
            <View className='info'>{preUserInfo.desc}</View>
          </View>
        </View>
        <View className='action-list'>
          <View onClick={this.submit.bind(this)} className='action-submit action-button'>提    交</View>
          <View className='action-cancel action-button'>取    消</View>
        </View>
      </View>
    )
  }
}

export default Comment

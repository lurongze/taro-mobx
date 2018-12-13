import Taro from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import helper from '../../utils/helper'
import './index.scss'

const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1225985591,1368945382&fm=27&gp=0.jpg'

@inject('publishStore')
@observer
class publish extends Taro.Component {

  config = {
    navigationBarTitleText: '发布'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  selectCategory = (cid) => {
    this.props.publishStore.setCategory(cid)
  }

  addPicture = () => {
    this.props.publishStore.addPicture(image)
  }

  removePicture = (item) => {
    this.props.publishStore.removePicture(item)
  }

  changeValue = (e) => {
    this.props.publishStore.setTextAreaValue(e.detail.value || '')
  }

  submit = () => {
    const { publishStore } = this.props
    const tip = publishStore.checkParams();
    if (!helper.isEmpty(tip)) {
      return Taro.showToast({
        title: tip,
        icon: 'none'
      })
    }
    const res = publishStore.submit();
  }

  cancel = () => {
    return Taro.navigateBack()
  }

  render () {
    const { publishStore: { categories, category, pictureList } } = this.props

    return (
      <View className='index'>
        <View className='text-area'>
          <Textarea className='textarea' onInput={this.changeValue.bind(this)} />
        </View>
        <View className='picture-area'>
          {
            pictureList.map((item, index) => {
              return (
                <View key={item + index} className='picture-item' style={{backgroundImage:`url(${item})`}}>
                  <View onClick={this.removePicture.bind(this, item)} className='remove'>×</View>
                </View>
              )
            })
          }
          {
            pictureList.length < 9 && (
              <View onClick={this.addPicture.bind(this)} className='picture-item picture-add'>+</View>
            )
          }
        </View>
        <View className='category-list'>
          {
            categories.map((item) => {
              return (
                <View onClick={this.selectCategory.bind(this, item.id)} className={`category-item ${category === item.id ? 'active':''}`} key={item.id}>{item.name}</View>
              )
            })
          }
        </View>
        <View className='action-list'>
          <View onClick={this.submit.bind(this)} className='action-submit action-button'>提    交</View>
          <View onClick={this.cancel.bind(this)} className='action-cancel action-button'>取    消</View>
        </View>
      </View>
    )
  }
}

export default publish

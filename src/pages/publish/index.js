import Taro from '@tarojs/taro'
import { View, Textarea, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import helper from '../../utils/helper'
import './index.scss'

@inject('publishStore')
@observer
class publish extends Taro.Component {

  config = {
    navigationBarTitleText: '发布'
  }

  state = {

  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () {
    const { publishStore: { getInitGallery } } = this.props
    getInitGallery()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  selectCategory = (cid) => {
    this.props.publishStore.setCategory(cid)
  }

  addPicture = () => {
    // this.props.publishStore.addPicture(image)
    const { publishStore: { pictureList, addPicture } } = this.props
    const count = 9 - pictureList.length
    Taro.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        addPicture(tempFilePaths)
      }
    })
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

  showImages = (item) => {
    const { publishStore: { pictureList } } = this.props
    Taro.previewImage({
      urls: pictureList,
      current: item
    })
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
                <View key={item + index} className='picture-item' >
                  <Image src={item} className='picture-img' mode='aspectFill' onClick={this.showImages.bind(this, item)} />
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

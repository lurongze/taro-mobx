import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import Transition from '../transition/transition'
import OverLay from '../over-lay/over-lay'
import ExIcon from '../ex-icon/ex-icon'
import './tbk-view.scss'

export default class Popup extends Taro.Component {

  componentWillReceiveProps (nextProps) {
    const { isOpened } = nextProps
    if (isOpened !== this.state.isOpened) {
      this.setState({
        isOpened
      })
    }
  }
  close () {
    this.setState({
      isOpened: false
    })
    if (_isFunction(this.props.onClose)) {
      this.props.onClose()
    }
  }

  clickAddCart () {
    if (_isFunction(this.props.onAddCart)) {
      this.props.onAddCart()
    }
  }

  clickBuyNow () {
    if (_isFunction(this.props.onBuyNow)) {
      this.props.onBuyNow()
    }
  }

  render () {
    const { customStyle, position, overLay, duration } = this.props
    let animationName = ''
    let styleObject = {}
    if (position === 'top') {
      animationName = 'slide-down'
      styleObject = Object.assign(customStyle, {top: '0'})
    } else if (position === 'bottom'){
      animationName = 'slide-up'
      styleObject = Object.assign(customStyle, {bottom: '0'})
    }
    return (
      <View>
        <Transition isOpened={this.state.isOpened} animationName={animationName} customClass={['van-popup-view']} customStyle={styleObject}>
          <View className='popup-header at-row'>
            <View className='popup-image' style={{backgroundSize:'cover',backgroundImage:'url('+this.props.headerImage+')'}} />
            <View className='popup-title'>
              <View className='title'>{this.props.headerTitle}</View>
              <View className='price'>￥{this.props.headerPrice}</View>
            </View>
            <View className='popup-close' onClick={this.close.bind(this)}><ExIcon name='close' fontSize='20px' color='#999' /></View>
          </View>
          <View className='popup-content'>
            {this.props.children}
          </View>
            {
              this.props.show ? (
                <View className='popup-footer'>
                  <View className='popup-button' style={{backgroundColor: '#f85'}} onClick={this.clickAddCart.bind(this)}>直接购买</View>
                  <View className='popup-button' style={{backgroundColor: '#f44'}} onClick={this.clickBuyNow.bind(this)}>领券购买</View>
                </View>
              ) : (
                <View className='popup-footer'>
                  <View className='popup-button' style={{backgroundColor: '#f85'}} onClick={this.clickAddCart.bind(this)}>加入购物车</View>
                  <View className='popup-button' style={{backgroundColor: '#f44'}} onClick={this.clickBuyNow.bind(this)}>立即购买</View>
                </View>
              )
            }
        </Transition>
        {
          overLay && (
            <OverLay isOpened={this.state.isOpened} onClickBlock={this.close.bind(this)} />
          )
        }
      </View>
    )
  }
}

Popup.defaultProps = {
  selectedItem: {},
  headerImage: '',
  headerTitle: '商品详情',
  headerPrice: '0',
  isOpened: false,
  customStyle: {},
  overLay: true,
  duration: 3000,
  position: 'bottom',
  show: false
}

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import Transition from '../transition/transition'
import OverLay from '../over-lay/over-lay'

export default class Popup extends Taro.Component {


  close () {

    if (_isFunction(this.props.onClose)) {
      this.props.onClose()
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
        <Transition isOpened={this.state.isOpened} animationName={animationName} customClass={['van-popup']} customStyle={styleObject}>
          {this.props.children}
        </Transition>
        {
          overLay && (
            <OverLay isOpened={this.state.isOpened} onClickBlock={this.close} />
          )
        }
      </View>
    )
  }
}

Popup.defaultProps = {
  isOpened: false,
  customStyle: {},
  overLay: true,
  duration: 3000,
  position: 'bottom'
}

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import './transition.scss'

export default class Transition extends Taro.Component {

  clickBlock () {
    if (_isFunction(this.props.onClickBlock)) {
      this.props.onClickBlock()
    }
  }

  render () {
    // const { isOpened, duration, animationName } = this.state
    const { zIndex, customStyle, isOpened, animationName, duration, customClass } = this.props
    let className = []
    let customAnimationName = 'van-' + animationName + '-enter'
    let classArray = [...['van-transition'], ...customClass]
    if (isOpened) {
      className = [...classArray, ...['van-transition-active']]
    } else {
      className = classArray
      customAnimationName = 'van-' + animationName + '-leave' // 'van-slide-down-leave'
    }
    const style = Object.assign({animationName: customAnimationName, animationDuration: duration + 'ms', zIndex: zIndex, display: isOpened? 'flex': 'none'}, customStyle)
    return (
      <View className={className} style={style} onClick={this.clickBlock.bind(this)} >
        {this.props.children}
      </View>
    )
  }
}

Transition.defaultProps = {
  isOpened: false,
  duration: 300,
  zIndex: 900,
  animationName: 'fade',
  customClass: ['custom-class'],
  customStyle: {}
}

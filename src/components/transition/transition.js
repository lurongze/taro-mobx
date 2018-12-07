import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import './transition.scss'

export default class Transition extends Taro.Component {
  constructor (props) {
    super(...arguments)
    const { isOpened, customClass, duration, animationName } = props
    this.state = {
      isOpened,
      display: false,
      animationName: animationName,
      duration: duration,
      classArray: [...['van-transition'], ...customClass]
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isOpened } = nextProps

    if (isOpened !== this.state.isOpened) {
      if (isOpened) {
        this.setState({
          isOpened: isOpened,
          display: true
        })
      } else {
        this.setState({
          isOpened
        })
      }
    } else {
      if (isOpened) {
        this.setState({
          display: true
        })
      }
    }
  }

  clickBlock () {
    if (_isFunction(this.props.onClickBlock)) {
      this.props.onClickBlock()
    }
  }

  animationEnd () {
    if (!this.state.isOpened) {
      this.setState({
        display: false
      })
    }
  }

  render () {
    const { isOpened, duration, animationName } = this.state
    let { display } = this.state
    const { zIndex, customStyle } = this.props
    let className = []
    let customAnimationName = 'van-' + animationName + '-enter'
    if (isOpened) {
      className = [...this.state.classArray,...['van-transition-active']]
    } else {
      className = this.state.classArray
      customAnimationName = 'van-' + animationName + '-leave' // 'van-slide-down-leave'
    }
    const style = Object.assign({animationName: customAnimationName, animationDuration: duration + 'ms', zIndex: zIndex, display: display? 'block': 'none'}, customStyle)
    return (
      <View className={className} style={style} onClick={this.clickBlock.bind(this)} onAnimationEnd={this.animationEnd.bind(this)}>
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

import Taro from '@tarojs/taro'
import _isFunction from 'lodash/isFunction'
import Transition from '../transition/transition'

export default class OverLay extends Taro.Component {

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

    if (_isFunction(this.props.onClickBlock)) {
      this.props.onClickBlock()
    }
  }
  render () {
    return (
      <Transition isOpened={this.state.isOpened} customClass={['van-overlay']} onClickBlock={this.close.bind(this)} zIndex={this.props.zIndex} />
    )
  }
}

OverLay.defaultProps = {
  isOpened: false,
  zIndex: 800
}

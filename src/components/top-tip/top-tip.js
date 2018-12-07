import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import Popup from '../../components/popup/popup'

export default class TopTip extends Taro.Component {

  state = {
  }

  componentWillReceiveProps (nextProps) {
    const { isOpened, duration } = nextProps
    if (isOpened !== this.state.isOpened) {
      this.setState({
        isOpened
      })
    }
    if (isOpened) {
      setTimeout(() => {
        this.setState({
          isOpened: false
        })
        if (_isFunction(this.props.onClose)) {
          this.props.onClose()
        }
      }, duration)
    }
  }

  componentWillMount () { }

  componentDidMount () {
  }


  render () {
    const { type, customStyle } = this.props
    let bgColor = ''
    switch (type) {
      case 'success':
        bgColor = '#67C23A'
        break
      case 'warning':
        bgColor = '#E6A23C'
        break
      case 'danger':
        bgColor = '#F56C6C'
        break
    }
    const style = {
      height: 'auto',
      fontSize: '15px',
      color: '#FFFFFF',
      textAlign: 'center',
      padding: '0 5px',
      overflow: 'hidden',
      backgroundColor: bgColor
    }
    return (
      <View>
        <Popup isOpened={this.state.isOpened} customStyle={Object.assign(style, customStyle)} position='top' overLay={false}>
            {this.props.title}
        </Popup>
      </View>
    )
  }
}

TopTip.defaultProps = {
  isOpened: false,
  duration: 3000,
  type: 'danger',
  customStyle: {},
  title: 'top tip default message'
}

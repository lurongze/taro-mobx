import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import './action-sheet.scss'

export default class ActionSheetItem extends Taro.Component {

  handleClick (key, item) {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(key, item)
    }
  }

  render () {
    return (
      <View className='action-sheet-item' onClick={this.handleClick.bind(this, this.props.key, this.props.item)}>
        {this.props.title}
      </View>
    )
  }
}

ActionSheetItem.defaultProps = {
  item: {},
  key: '',
  title: ''
}

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'
import Popup from '../popup/popup'
import './action-sheet.scss'

export default class ActionSheet extends Taro.Component {
  componentWillReceiveProps (nextProps) {
    const { isOpened, actionSheetList } = nextProps
    if (isOpened !== this.state.isOpened) {
      this.setState({
        actionSheetListItem: actionSheetList,
        isOpened
      })
    } else {
      this.setState({
        actionSheetListItem: actionSheetList
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
  handleClick (key, item) {
    if (_isFunction(this.props.onClickItem)) {
      this.props.onClickItem(key, item)
    }
  }
  render () {
    return (
      <View>
        <Popup isOpened={this.state.isOpened} customClass={['van-popup']} onClose={this.close.bind(this)} customStyle={{overflowY: 'visible',backgroundColor: '#EBEEF5'}}>
          {
            this.props.description.length > 0 && (
              <View className='action-sheet-description'>{this.props.description}</View>
            )
          }
          {this.state.actionSheetListItem.map((e)=>{
            return (
              <View className='action-sheet-item' hoverClass='hoverItem' onClick={this.handleClick.bind(this, e[this.props.keyItem], e)} key={e[this.props.keyItem]}>
                {e[this.props.titleItem]}
              </View>
            )
          })}
          {
            this.props.showCancel && (
              <View onClick={this.close.bind(this)} className='action-sheet-cancel action-sheet-item' hoverClass='hoverItem'>取消</View>
            )
          }
        </Popup>
      </View>
    )
  }
}

ActionSheet.defaultProps = {
  showCancel: true,
  description: '',
  titleItem: 'title',
  keyItem: 'key',
  actionSheetList: [
    {title: '立即付款', key: 'payNow'},
    {title: '加入购物车', key: 'addCart'}
  ]
}

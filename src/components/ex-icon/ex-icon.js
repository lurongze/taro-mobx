import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import './ex-icon.scss'

// 这个组件，写成icon的时候，编译总是报错，名字改掉就好了，暂时不知道是什么bug
export default class ExIcon extends Taro.Component {

  render () {
    const { color, fontSize, name } = this.props
    const className = ['van-icon', 'van-icon-' + name]
    const style = {
      color: color,
      fontSize: fontSize
    }
    return (
      <Text className={className} style={style} />
    )
  }
}

ExIcon.defaultProps = {
  color: '#000000',
  fontSize: '20rpx',
  name: 'wechat'
}


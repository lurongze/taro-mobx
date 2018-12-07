import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './ex-icon.scss'

// 这个组件，写成icon的时候，编译总是报错，名字改掉就好了，暂时不知道是上面bug
export default class ExIcon extends Taro.Component {

  render () {
    const { color, fontSize, name } = this.props
    const className = ['van-icon', 'van-icon-' + name]
    const style = {
      color: color,
      fontSize: fontSize
    }
    return (
      <View className={className} style={style}>
        {this.props.children}
      </View>
    )
  }
}

ExIcon.defaultProps = {
  color: '#000000',
  fontSize: '20px',
  name: 'wechat'
}


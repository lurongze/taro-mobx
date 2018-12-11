import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import './index.scss'

export default class Index extends Taro.Component {
  constructor (props) {
    super(props)
    this.setState({
      style: 'left: 0;width: ' + props.width + '%'
    })
  }
  state = {
    style: '',
    intoView: 'A0'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  tabSwitch (index, detail) {
    let style = 'left:' + index * this.props.width + '%; width: ' + this.props.width + '%'
    this.setState({
      style: style,
      intoView: 'A' + index
    })
    this.props.onSwitch(index, detail)
  }

  render () {
    return (
      <ScrollView className='scrollViewX' scrollX scrollIntoView={this.state.intoView} scrollWithAnimation>
        <View className='scrollXViewContainer'>
          {
            this.props.list.map((e, index) =>
              <View key={e.id} className='scrollXItem' style={'width:' + this.props.width + '%'} id={'A' + index} onClick={this.tabSwitch.bind(this, index, e)}>{e.text}</View>
            )
          }
          <View className='scrollXLine' style={this.state.style}>底部滑动线</View>
        </View>
      </ScrollView>
    )
  }
}

Index.defaultProps = {
  onSwitch: () => {},
  width: 25,
  list: [
    {id: 1, text: 'x11'},
    {id: 2, text: 'x12'},
    {id: 3, text: 'x1'},
    {id: 4, text: '11qeq1qeqx'},
    {id: 5, text: '1qeq1qeq1qe'},
    {id: 6, text: '1e2'},
    {id: 7, text: 'vwv1'},
    {id: 8, text: '1qwe12'},
    {id: 9, text: '1fsg2'},
    {id: 10, text: 'g4231'},
    {id: 11, text: 'grw1'},
    {id: 12, text: 'g45t41'},
    {id: 13, text: '1ge23'},
    {id: 14, text: '1gar'}
  ]
}


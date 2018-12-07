import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import helper from '../../utils/helper'
import './index.scss'

@inject('counterStore', 'indexList')
@observer
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()

    Taro.request(helper.getParams())


  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore, indexList } = this.props
    indexList.modifyList();
    counterStore.incrementAsync()
  }

  login = () => {
    helper.login()
  }

  render () {
    const { counterStore: { counter }, indexList: { list } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Button onClick={this.login}>Login</Button>
        <Text>{counter}</Text>
        <View>{JSON.stringify(list)}</View>
      </View>
    )
  }
}

export default Index

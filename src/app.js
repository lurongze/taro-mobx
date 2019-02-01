import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import stores from './stores/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/publish/index',
      'pages/comment/index',
      'pages/detail/index',
      'pages/user/index',
      'pages/user/like-list',
      'pages/user/collect-list',
      'pages/user/gallery-list',
      'pages/user-score/index'
    ],
    window: {
      backgroundTextStyle: 'black',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#606266',
      selectedColor: '#FF99CC',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'assets/images/tab/home.png',
          selectedIconPath: 'assets/images/tab/home-x.png',
          text: '首页'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'assets/images/tab/user.png',
          selectedIconPath: 'assets/images/tab/user-x.png',
          text: '我的'
        }
      ]
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={stores}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import withLogin from '../../hoc/withLogin'
import TbkView from '../../components/tbk-view/tbk-view'
import Gallery from '../../components/gallery/gallery'
import TabList from '../../components/tabList/index'
import helper from '../../utils/helper'
import './index.scss'


let image = 'http://img.alicdn.com/bao/uploaded/i3/3419107995/TB2g_z_XXzqK1RjSZFoXXbfcXXa_!!3419107995-0-item_pic.jpg'


@inject('indexStore', 'commonStore')
@observer
@withLogin()
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '商城首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  switchTab = (index, detail) => {
    const { indexStore } = this.props
    indexStore.setValue('listType', detail.id);
  }

  navigateTo = (url) => {
    return Taro.navigateTo({
      url
    })
  }

  onReachBottom = () => {
  }

  render () {

    const loading = true

    return (
      <View className='index'>
        <View className='tab-list'>
          <TabList onSwitch={this.switchTab} list={[{ id: 'tb', text: '淘宝' }, {id: 'tm', text: '天猫'}]} width='50' />
        </View>
        <View className='list-block'>
          {
            [...Array(25).keys()].map((item) => {
              return (
                <View className='list-item' key={item}>
                  <Image src={image} className='image' mode='widthFix' />
                  <View className='sale-info'>
                    <Text className='price'>原价￥1566</Text>
                    <Text className='num'>销量：150000</Text>
                  </View>
                  <Text className='coupon-info'>优惠券 满100减80</Text>
                  <Text className='title'>舒适软皮鞋女工作鞋黑色职业正装空姐高跟鞋细跟工装鞋白色礼仪鞋</Text>
                </View>
              )
            })
          }
        </View>
        <TbkView />
        {
          loading && (
            <View className='loading'>
              <Text className='iconfont icon-loading' /> 加载中...
            </View>
          )
        }

      </View>
    )
  }
}

export default Index

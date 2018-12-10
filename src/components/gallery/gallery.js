import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import './gallery.scss'

// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544285251208&di=d3b5a0d1c0f52e5733c88a1ea81efc89&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F03%2F20140703194024_5YWEL.jpeg'
const image = 'http://img4.tuwandata.com/v2/thumb/jpg/NTM1ZCw2MjQsMCw5LDMsMSwtMSxOT05FLCwsOTA=/u/res.tuwan.com/zipgoods/20181130/916725f4b9beae0be66c83b8b1e5d791.jpg'
export default class Gallery extends Taro.Component {

  render () {
    const { list } = this.props
    const length = list.length
    let className = ['gallery-item', `w${length}`];
    if ([1, 2, 5, 6, 7, 8, 9].includes(length)) {
      return (
        <View className='list-gallery'>
          {
            list.map((e) => {
              return (
                <View className={className} key={e} style={{backgroundImage: `url(${image})`}} />
              )
            })
          }
          {
            (length === 8 || length === 5)  && (
              <View className={className} />
            )
          }
        </View>
      )
    }

    if (length === 3 || length === 4) {
      let className1 = `gallery${length}-big`
      let className2 = `gallery${length}-small`
      let list1 = [list[0]]
      let list2 = list.filter((n, index) => index > 0 )
      return (
        <View className='list-gallery'>
          <View className={className1}>
            {
              list1.map((e) => {
                return (
                  <View className={className} key={e} style={{backgroundImage: `url(${image})`}} />
                )
              })
            }
          </View>
          <View className={className2}>
            {
              list2.map((e) => {
                return (
                  <View className={className}  key={e}>
                    <Image className='gallery-image' src={image} />
                  </View>
                )
              })
            }
          </View>
        </View>
      )
    }

    if (length === 5) {
      let className1 = `gallery${length}-big`
      let className2 = `gallery${length}-small`
      let className3 = `gallery${length}-bottom`
      let list1 = list.filter((n, index) => index < 1 )
      let list2 = list.filter((n, index) => index >= 1 && index < 3 )
      let list3 = list.filter((n, index) => index >= 3 )
      return (
        <View className='list-gallery list-gallery-6'>
          <View className={className1}>
            {
              list1.map((e) => {
                return (
                  <View className={className} key={e} style={{backgroundImage: `url(${image})`}} />
                )
              })
            }
            <View className={className3}>
              {
                list2.map((e) => {
                  return (
                    <View className={className} key={e} style={{backgroundImage: `url(${image})`}} />
                  )
                })
              }
            </View>
          </View>
          <View className={className2}>
            {
              list3.map((e) => {
                return (
                  <View className={className}  key={e}>
                    <Image className='gallery-image' src={image} />
                  </View>
                )
              })
            }
          </View>
        </View>
      )
    }

  }
}

Gallery.defaultProps = {
  list: []
}


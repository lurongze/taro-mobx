import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, Image} from '@tarojs/components'
import './swiper-img.scss'

export default class SwiperImg extends Taro.Component {

  // swiperLoad = (e) => {
  //   //获取图片真实宽度
  //   const imgwidth = e.detail.width
  //   const imgheight = e.detail.height
  //   //宽高比
  //   const ratio = imgwidth / imgheight
  //   //计算的高度值
  //   Taro.getSystemInfo({
  //     success :(res) => {
  //       //获取屏幕的宽度并保存
  //       const swiperWidth = res.windowWidth
  //       const viewHeight = parseInt(swiperWidth) / ratio
  //       this.setState({
  //         swiperHeight: viewHeight
  //       })
  //     }
  //   })
  // }


  render () {

    let { imgData } = this.props
    // const { swiperHeight: swiperHeight } = this.state

    return (
      <Swiper
        className='slide'
        // style={{height: `${swiperHeight}px`}}
        indicatorDots={true}
        autoplay={true}
        indicatorActiveColor='#6d33b7'
      >
        {
          imgData && imgData.map((item) => {
            return (
              <SwiperItem key={item}>
                <Image
                  // onLoad={this.swiperLoad}
                  // style={{height: `${swiperHeight}px`, width: '100%'}}
                  src={item}
                  mode='aspectFill'
                />
              </SwiperItem>
            )
          })
        }

      </Swiper>
    )
  }
}

SwiperImg.defaultProps = {
}

import Taro from '@tarojs/taro'
import helper from '../utils/helper'

export async function getList(page) {

  // https://api.tuwan.com/apps/Welfare/getMenuList?from=pc&format=jsonp&page=1&callback=jQuery112307883539775249591_1545229011951&_=1545229011952
  return Taro.request(helper.getParams('https://api.tuwan.com/apps/Welfare/getMenuList', {
    page,
    from: 'pc',
    format: 'json'
  }))

}


export async function getBase() {

}

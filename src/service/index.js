import Taro from '@tarojs/taro'
import helper from '../utils/helper'

/**
 * 首页获取列表
 * @param page
 * @returns {Promise<*|Promise<Taro.request.Promised<any>>>}
 */
export async function getList(page) {
  // https://api.tuwan.com/apps/Welfare/getMenuList?from=pc&format=jsonp&page=1&callback=jQuery112307883539775249591_1545229011951&_=1545229011952
  return Taro.request(helper.getParams(`/gallery/new/${page}/20`))
}

export async function getGalleryDetail(id) {
  return Taro.request(helper.getParams(`/gallery/${id}`))
}


export async function getBase() {

}

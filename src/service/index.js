import Taro from '@tarojs/taro'
import helper from '../utils/helper'

/**
 * 首页获取列表
 * @param page
 * @returns {Promise<*|Promise<Taro.request.Promised<any>>>}
 */
export async function getList(page) {
  // https://api.tuwan.com/apps/Welfare/getMenuList?from=pc&format=jsonp&page=1&callback=jQuery112307883539775249591_1545229011951&_=1545229011952
  return Taro.request(helper.getParams(`/gallery/new/${page}/4`))
}

/**
 * 相册详情
 * @param id
 * @returns {Promise<*|Promise<Taro.request.Promised<any>>>}
 */
export async function getGalleryDetail(id) {
  return Taro.request(helper.getParams(`/gallery/${id}`))
}

/**
 * 点赞
 * @param author
 * @param detailTitle
 * @param detailId
 * @returns {Promise<*|Promise<Taro.request.Promised<any>>>}
 */
export async function doLike(author, detailTitle , detailId) {
  const createTime = helper.timeStamp()
  const detailTable = 'gallery'
  return Taro.request(helper.putParams(`/likeItem`, {
    author, detailTitle , detailId, createTime, detailTable
  }))
}

export async function comment(author, detailTitle, detailId, content, authorAvatar,authorName, detailName) {
  const createTime = helper.timeStamp();
  const detailTable = 'gallery'
  return Taro.request(helper.putParams(`/comment`, {
    author,
    detailTitle ,
    detailId,
    createTime,
    authorAvatar,
    authorName,
    detailName,
    content,
    detailTable
  }))
}

export async function doCollect(author, detailTitle, detailId) {
  const createTime = helper.timeStamp()
  const detailTable = 'gallery'
  return Taro.request(helper.putParams(`/collectItem`, {
    author,
    detailTitle ,
    detailId,
    createTime,
    detailTable
  }))
}


export async function getBase() {

}

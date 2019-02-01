import Taro from '@tarojs/taro'
import helper from '../utils/helper'

/**
 * 首页获取列表
 * @param page
 * @returns {Promise<*|Promise<Taro.request.Promised<any>>>}
 */
export async function getList(page) {
  // https://api.tuwan.com/apps/Welfare/getMenuList?from=pc&format=jsonp&page=1&callback=jQuery112307883539775249591_1545229011951&_=1545229011952
  return Taro.request(helper.getParams(`/gallery/new/${page}/15`))
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

/**
 * 评论
 * @param author
 * @param detailTitle
 * @param detailId
 * @param content
 * @param authorAvatar
 * @param authorName
 * @param detailName
 * @returns {Promise<*|Promise<Taro.request.Promised<any>>>}
 */
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

/**
 * 收藏
 * @param author
 * @param detailTitle
 * @param detailId
 * @returns {Promise<*|Promise<Taro.request.Promised<any>>>}
 */
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

export async function getGalleryCommentList(galleryId, page) {
  return Taro.request(helper.getParams(`/comment/${galleryId}/${page}/20`))
}

export async function getMyLike(memberId, page) {
  return Taro.request(helper.getParams(`/likeItem/${memberId}/${page}/30`))
}

export async function getMyComment(memberId, page) {
  return Taro.request(helper.getParams(`/collectItem/${memberId}/${page}/30`))
}

export async function getMyGallery(memberId, page) {
  return Taro.request(helper.getParams(`/member/gallery-list/${memberId}/${page}/30`))
}

export async function deleteLike(id) {
  return Taro.request(helper.deleteParams(`/likeItem/${id}`))
}

export async function deleteGallery(id, memberId) {
  return Taro.request(helper.deleteParams(`/gallery/${memberId}/${id}`))
}

export async function deleteCollect(id) {
  return Taro.request(helper.deleteParams(`/collectItem/${id}`))
}

export async function getInitGallery() {
  return Taro.request(helper.getParams(`/gallery/detail-for-update/0`))
}

export async function updateGallery(galleryData) {
  return Taro.request(helper.postParams(`/gallery`, galleryData))

}

export async function uploadFile(localPath,galleryId, author) {
  const response = await Taro.uploadFile({
    url: `${helper.config('host')}/upload/${galleryId}/${author}`,
    filePath: localPath,
    name: 'file'
  })
  const res = response.data ? JSON.parse(response.data) : {}
  if (res.code === 200) {
    return res.data.url || ''
  } else {
    return ''
  }
}

export async function getLikeMostGallery() {
  return Taro.request(helper.getParams(`/index/like-most/6`))
}

export async function weLogin(code) {
  return Taro.request(helper.getParams(`/member/weapp-login/${helper.config('appId')}/${code}`))
}

export async function updateUserInfo(id, avatar, nickname) {
  const member = {
    id,
    avatar,
    nickname
  }
  return Taro.request(helper.postParams(`/member`, member))
}


/**
 * 获取基础数据
 * @returns {Promise<void>}
 */
export async function getBase() {

}

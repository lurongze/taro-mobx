import Taro from '@tarojs/taro'
import helper from '../utils/helper'

export async function getList(page, type) {

  return Taro.request(helper.getParams('/getList', {
    page ,
    type
  }))

}


export async function getBase() {

}

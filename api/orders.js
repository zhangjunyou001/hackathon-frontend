import request from '@/utils/request'

export default {
  createOrders(courseId) {
    return request({
      url: '/edeorder/order/createOrder/'+courseId,
      method: 'post'
    })
  },
  getOrdersInfo(id) {
    return request({
      url: '/edeorder/order/getOrderInfo/'+id,
      method: 'get'
    })
  },
  createNatvie(orderNo) {
    return request({
      url: '/edeorder/paylog/createNative/'+orderNo,
      method: 'get'
    })
  },

  queryPayStatus(orderNo) {
    return request({
      url: '/edeorder/paylog/queryPayStatus/'+orderNo,
      method: 'get'
    })
  }
}

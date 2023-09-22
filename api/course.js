import request from '@/utils/request'

export default {
  getCourseList(page,limit,searchObj) {
    return request({
      url: `/eduService/coursefront/getFrontInfo/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  getAllSubject() {
    return request({
      url: '/eduService/subject/getAllSubject',
      method: 'get'
    })
  },
  getCourseInfo(id) {
    return request({
      url: '/eduservice/coursefront/getFrontCourseInfo/'+id,
      method: 'get'
    })
  }

}

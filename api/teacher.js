import request from '@/utils/request'

export default {
  getTeacherList(page,limit) {
    return request({
      url: `/eduService/teacherfront/getTeacherFrontList/${page}/${limit}`,
      method: 'post'
    })
  },
  getTeacherInfo(id) {
    return request({
      url: `/eduService/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }

}

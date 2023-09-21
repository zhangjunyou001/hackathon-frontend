<template>
  
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">

            <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040B1B;">
                <a target="_blank" :href="banner.linkUrl">
                    <img :src="banner.imageUrl" :alt="banner.title">
                </a>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
  <!-- 幻灯片 结束 -->
  </div>
</template>

<script>
import banner from '@/api/banner'
import index from '@/api/index'
export default {
  data () {
    return {

      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      //banner数组
      bannerList:[],
      eduList:[],
      teacherList:[]
    }
  },
  created() {
 //调用查询banner的方法
    this.getBannerList()
    //调用查询热门课程和名师的方法
    this.getHotCourseTeacher()
  },
  methods:{
    //查询热门课程和名师
    getHotCourseTeacher() {
      index.getIndexData()
        .then(response => {
          this.eduList = response.data.data.eduList
          this.teacherList = response.data.data.teacherList
        })
    },
    //查询banner数据
    getBannerList() {
      banner.getListBanner()
        .then(response => {
          this.bannerList = response.data.data.list
        })
    }
  }
}
</script>
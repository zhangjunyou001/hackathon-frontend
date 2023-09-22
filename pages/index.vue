<template>

  <div>
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
  </div>
</template>

<script>
import banner from '@/api/banner'
import index from '@/api/index'
export default {
  data () {
    return {

      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      bannerList:[],
      eduList:[],
      teacherList:[]
    }
  },
  created() {
    this.getBannerList()
    this.getHotCourseTeacher()
  },
  methods:{
    getHotCourseTeacher() {
      index.getIndexData()
        .then(response => {
          this.eduList = response.data.data.eduList
          this.teacherList = response.data.data.teacherList
        })
    },
    getBannerList() {
      banner.getListBanner()
        .then(response => {
          this.bannerList = response.data.data.list
        })
    }
  }
}
</script>

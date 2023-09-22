<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">home</a>
        \
        <a href="#" title class="c-999 fsize14">{{courseWebVo.subjectLevelOne}}</a>
        \
        <span class="c-333 fsize14">{{courseWebVo.subjectLevelTwo}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="courseWebVo.cover" :alt="courseWebVo.title" class="dis c-v-pic" />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{courseWebVo.title}}</span>
            </h2>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">lecturer: {{courseWebVo.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="lecturer" href="#">Lecturer</a>
              </span>
            </section>
            <section  v-if="isbuy || Number(courseWebVo.price) === 0" class="c-attr-mt">
              <a href="#" title="See now" class="comm-btn c-btn-3">See now</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Counts</span>
                <br />
                <h6 class="c-fff f-fM mt10">20</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">See</span>
                <br />
                <h6 class="c-fff f-fM mt10">501</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">Course Details</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>Course Introduce</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p>{{courseWebVo.description}}</p>
                    </section>
                  </div>
                </div>
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>Course Syllabus</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in chapterVideoList"
                            :key="chapter.id"
                          >
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>
                              {{chapter.title}}
                            </a>

                            <ol class="lh-menu-ol" style="display: block;">
                              <li
                                class="lh-menu-second ml30"
                                v-for="video in chapter.children"
                                :key="video.id"
                              >
                                <a :href="'/player/'+video.videoSourceId" target="_blank">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>
                                  {{video.title}}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">Lecturer</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="courseWebVo.avatar" width="50" height="50" alt />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{courseWebVo.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseWebVo.intro}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
  </div>
</template>

<script>
import courseApi from "@/api/course";
import ordersApi from "@/api/orders";
export default {
   asyncData({ params, error }) {
     return {courseId: params.id}
   },
  data() {
     return {
        courseWebVo: {},
        chapterVideoList: [],
        isbuy: false,
     }
   },
   created() {
      this.initCourseInfo()
   },
  methods: {
     initCourseInfo() {
        courseApi.getCourseInfo(this.courseId)
          .then(response => {
            this.courseWebVo=response.data.data.courseWebVo,
            this.chapterVideoList=response.data.data.chapterVideoList,
            this.isbuy=response.data.data.isBuy
        })
     },
    createOrders() {
      ordersApi.createOrders(this.courseId).then(response => {
        this.$router.push({ path: '/orders/' + response.data.data.orderId });
      });
    }
  }
};
</script>

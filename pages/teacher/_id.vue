<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">Teacher Introduction</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="teacher.avatar">
            </section>
            <h3 class="hLh30">
              <span class="fsize24 c-333">{{teacher.name}}&nbsp;
                {{ teacher.level===1?'Junior':'Senior' }}
              </span>
            </h3>
            <section class="mt10">
              <span class="t-tag-bg">{{teacher.intro}}</span>
            </section>
            <section class="t-infor-txt">
              <p
                class="mt20">{{teacher.career}}</p>
            </section>
            <div class="clear"></div>
          </div>
        </section>
        <div class="clear"></div>
      </div>
      <section class="mt30">
        <div>
          <header class="comm-title all-teacher-title c-course-content">
            <h2 class="fl tac">
              <span class="c-333">Courses</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>
          <section class="no-data-wrap" v-if="courseList.length==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">No Data, we are preparing</span>
          </section>
          <article class="comm-course-list">
            <ul class="of">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" >
                    <div class="cc-mask">
                      <a href="#" title="Start now" target="_blank" class="comm-btn c-btn-1">Start now</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a href="#" :title="course.title" target="_blank" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                </div>
              </li>

            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
export default {
  asyncData({ params, error }) {
    return teacherApi.getTeacherInfo(params.id)
      .then(response => {
        return {
          teacher: response.data.data.teacher,
          courseList: response.data.data.courseList
        }
      })
  }

};
</script>

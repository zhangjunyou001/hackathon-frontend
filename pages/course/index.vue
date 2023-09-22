<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">All Courses</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">Course Category</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="All" href="#">All</a>
                </li>
                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title" href="#" @click="searchOne(item.id,index)">{{item.title}}</a>
                </li>

              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item,index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="item.title" href="#" @click="searchTwo(item.id,index)">{{item.title}}</a>
                </li>

              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
             <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="Counts" href="javascript:void(0);" @click="searchBuyCount()">Counts
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="New" href="javascript:void(0);" @click="searchGmtCreate()">New
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">No Data, we are preparing...</span>
          </section>
          <article  v-if="data.total>0" class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="item in data.items" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="Start Learning" class="comm-btn c-btn-1">Start Learning</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634 people learn</i>
                      |
                      <i class="c-999 f-fA">9634 comments</i>
                    </span>
                  </section>
                </div>
              </li>

            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <div>
      <div class="paging" v-if="data.pages > 1">
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="First Page"
          @click.prevent="gotoPage(1)">1</a>
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="Previous Page"
          @click.prevent="gotoPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="''+page+' Page'"
          href="#"
          @click.prevent="gotoPage(page)">{{ page }}</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="Next Page"
          @click.prevent="gotoPage(data.current+1)">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="Last Page"
          @click.prevent="gotoPage(data.pages)">{{data.pages}}</a>
        <div class="clear"/>
      </div>
    </div>
      </section>
    </section>
  </div>
</template>

<script>
import courseApi from '@/api/course'

export default {
  data() {
    return {
      page:1,
      data:{},
      subjectNestedList: [],
      subSubjectList: [],

      searchObj: {},

      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
  created() {
    this.initCourseFirst()
    this.initSubject()
  },
  methods:{
    initCourseFirst() {
      courseApi.getCourseList(1,8,this.searchObj).then(response => {
        this.data = response.data.data
      })
    },

    initSubject() {
      courseApi.getAllSubject()
        .then(response => {
          this.subjectNestedList = response.data.data.list
        })
    },

    gotoPage(page) {
      courseApi.getCourseList(page,8,this.searchObj).then(response => {
        this.data = response.data.data
      })
    },

    searchOne(subjectParentId,index) {
      this.oneIndex = index

      this.twoIndex = -1
      this.searchObj.subjectId = ""
      this.subSubjectList = []

      this.searchObj.subjectParentId = subjectParentId
      this.gotoPage(1)

      for(let i=0;i<this.subjectNestedList.length;i++) {
        var oneSubject = this.subjectNestedList[i]
        if(subjectParentId == oneSubject.id) {
          this.subSubjectList = oneSubject.children
        }
      }
    },

    searchTwo(subjectId,index) {
      this.twoIndex = index
      this.searchObj.subjectId = subjectId
      this.gotoPage(1)
    },

    searchBuyCount() {
      this.buyCountSort = "1"
      this.gmtCreateSort = ""
      this.priceSort = ""

      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      this.gotoPage(1)
    },

    searchGmtCreate() {
      this.buyCountSort = ""
      this.gmtCreateSort = "1"
      this.priceSort = ""

      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      this.gotoPage(1)
    },

    searchPrice() {
      this.buyCountSort = ""
      this.gmtCreateSort = ""
      this.priceSort = "1"

      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      this.gotoPage(1)
    }

  }
};
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>

<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">Order confirm</h1>
      <img src="~/assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
        <tr>
          <th class="name">Item</th>
          <th class="price">Price</th>
          <th class="priceNew">Now price</th>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td colspan="3" class="teacher">Lecture：{{order.teacherName}}</td>
        </tr>
        <tr class="good">
          <td class="name First">
            <a target="_blank" :href="'https://localhost:3000/course/'+order.courseId">
              <img :src="order.courseCover"></a>
            <div class="goodInfo">
              <input type="hidden" class="ids ids_14502" value="14502">
              <a target="_blank" :href="'https://localhost:3000/course/'+ order.courseId">{{order.courseTitle}}</a>
            </div>
          </td>
          <td class="price">
            <p>￥<strong>{{order.totalFee}}</strong></p>
          </td>
          <td class="red priceNew Last">￥<strong>{{order.totalFee}}</strong></td>
        </tr>
        <tr>
          <td class="Billing tr" colspan="3">
            <div class="tr">
              <p>Totally: <strong class="red">1</strong> ，Sum: <span
                class="red f20">$<strong>{{order.totalFee}}</strong></span></p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">

          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">I Know<a href="javascript:" target="_blank"></a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+order.courseId">Return</a>
          </div>
          <div class="fr">
            <p>Totally <strong class="red">1</strong> , Sum: <span class="red f20">￥<strong
              id="AllPrice">{{order.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="toPay()">Pay</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>
<script>
import ordersApi from '@/api/orders'
export default {
    asyncData({ params, error }) {
        return ordersApi.getOrdersInfo(params.oid)
            .then(response => {
                return {
                    order: response.data.data.item
                }
            })
    },
    methods:{
        toPay() {
            this.$router.push({path:'/pay/'+this.order.orderNo})
        }
    }
}
</script>

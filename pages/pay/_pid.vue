<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">Order success， please pay! Order number：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">Pay: </em><em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">Paypal</div>
        <div class="fl sao">
          <p class="red">Please use paypal</p>
          <div class="fl code">
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">
              <p>Please use paypal</p>
            </div>

          </div>

        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ordersApi from '@/api/orders'
export default {
     asyncData({ params, error }) {
         return ordersApi.createNatvie(params.pid)
            .then(response => {
                return {
                      payObj: response.data.data
                    }
            })
     },
     data() {
         return {
             timer1:''
         }
     },
     mounted() {
        this.timer1 = setInterval(() => {
            this.queryOrderStatus(this.payObj.out_trade_no)
        },3000);
     },
     methods:{
         queryOrderStatus(orderNo) {
             ordersApi.queryPayStatus(orderNo)
                .then(response => {
                     if (response.data.success) {
                        clearInterval(this.timer1)
                        this.$message({
                            type: 'success',
                            message: 'Pay Success!'
                        })
                        this.$router.push({path: '/course/' + this.payObj.course_id})
                     }
                })
         }
     }
}
</script>

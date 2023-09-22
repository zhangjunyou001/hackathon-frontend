<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">Login</a>
      <span>·</span>
      <a href="/register">Register</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: 'Please input your cell number', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="Cell number" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: 'Please input your password', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="Password" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="Login" @click="submitLogin()">
        </div>
      </el-form>

    </div>

  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'

  import cookie from 'js-cookie'
  import loginApi from '@/api/login'

  export default {
    layout: 'sign',

    data () {
      return {
        user:{
          mobile:'',
          password:''
        },
        loginInfo:{}
      }
    },

    methods: {
      submitLogin() {
        loginApi.submitLoginUser(this.user)
           .then(response => {
             cookie.set('guli_token',response.data.data.token,{domain: 'localhost'})

              loginApi.getLoginUserInfo()
                .then(response => {
                  this.loginInfo = response.data.data.userInfo
                  cookie.set('guli_ucenter',this.loginInfo,{domain: 'localhost'})

                  window.location.href = "/";
                })
           })
      },
      checkPhone (rule, value, callback) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('Cell number format is incorrect!'))
        }
        return callback()
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>

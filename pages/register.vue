<template>
  <div class="main">
    <div class="title">
      <a href="/login">Login</a>
      <span>·</span>
      <a class="active" href="/register">Register</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">

        <el-form-item class="input-prepend restyle" prop="nickname" :rules="[{ required: true, message: 'Please input your user name', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="Username" v-model="params.nickname"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="mobile" :rules="[{ required: true, message: 'Please input your cell number', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="Cell number" v-model="params.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[{ required: true, message: 'Please input verification code', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="Verification code" v-model="params.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="border: none;background-color: none">{{codeTest}}</a>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: 'Please input your password', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="Password" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="Register" @click="submitRegister()">
        </div>

      </el-form>

    </div>
  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import registerApi from '@/api/register'

  export default {
    layout: 'sign',
    data() {
      return {
        params: {
          mobile: '',
          code: '',
          nickname: '',
          password: ''
        },
        sending: true,
        second: 60,
        codeTest: 'Get Code'
      }
    },
    methods: {
       submitRegister() {
         registerApi.registerMember(this.params)
          .then(response => {
              this.$message({
                type: 'success',
                message: "registry success"
              })
            this.$router.push({path:'/login'})

          })
       },
       timeDown() {
        let result = setInterval(() => {
          --this.second;
          this.codeTest = this.second
          if (this.second < 1) {
            clearInterval(result);
            this.sending = true;
            this.second = 60;
            this.codeTest = "Get Code"
          }
        }, 1000);

      },
       getCodeFun() {
         registerApi.sendCode(this.params.mobile)
          .then(response => {
              this.sending = false
              this.timeDown()
          })
       },

      checkPhone (rule, value, callback) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('Cell number format is incorrect!'))
        }
        return callback()
      },

    }
  }
</script>

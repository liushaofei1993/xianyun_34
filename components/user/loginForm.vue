<template>
  <el-form 
  :model="loginForm" 
  :rules="rules" 
  ref="loginForm" 
  class="form">
    <el-form-item prop="username" class="form-item">
      <el-input v-model="loginForm.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-button type="primary" class="submit" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    }
  },
   methods: {
        // 提交登录
        handleLoginSubmit(){
        //    console.log(this.$refs.loginForm.validate)
        // 验证表单
        this.$refs['loginForm'].validate((valid)=>{
            if(valid){
                this.$axios({
                    url:'/accounts/login',
                    method:'POST',
                    data:this.loginForm
                }).then(res=>{
                    // console.log(res)
                    // this.$store.state.user.userInfo = res.data
                    // 调用store中mutations中的方法是要用 commit
                    this.$store.commit('user/setUserInfo',res.data)
                    // 登陆成功之后进行跳转
                    // this.$router.push('/')
                    
                    // 为了处理401和403的错误,需要登录成功后跳转到上一页
                    this.$router.back()
                })
            }
        })
        }
    }
};
</script>
<style lang='less' scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
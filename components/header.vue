<template>
  <div class="header">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <!-- logo -->
        <div class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" />
        </div>
        <!-- 菜单 -->
        <el-row type="flex" class="menu">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>
        <!-- 登录 -->
        <div v-if="true" class="login">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <!-- 登陆之后的布局 -->
        <div v-else>
            <el-dropdown>
          <span class="el-dropdown-link">
            <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="">
            {{$store.state.user.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$store.state.user.userInfo.user.nickname)
  }
};
</script>

<style scoped lang="less" >
.header {
  height: 60px;
  line-height:60px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 5px 5px#eee;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.logo {
  padding: 9px 0;
  img {
    height: 42px;
    display: block;
  }
}
.menu {
  flex: 1;
  margin-left: 20px;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    line-height: 60px;
    box-sizing: border-box;
    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
    }
  }
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}
.el-dropdown-link{
    cursor:pointer;
    img{
        width: 25px;
        height: 25px;
        border-radius:50%;
        vertical-align:middle;
        margin-right:5px;
        &:hover{
            border:3px solid #409eff;
        }
    }
}
</style> 

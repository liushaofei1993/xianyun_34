<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 发表文章组件 -->
      <div class="postMain">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记,让更多人看到哦!</p>
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="myquill" :content="form.content" @change="onEditorChange($event)" v-quill></div>
          </el-form-item>
          <el-form-item label="选择城市" label-width="80px">
            <el-autocomplete
              v-model="form.city"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入游玩城市"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" class="baocun">
              <el-button type="primary" @click="onSubmit">发布</el-button>
              <span>或者</span>
              <span class="drafts" @click="drafts">保存到草稿</span>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <!-- 草稿箱组件 -->
      <div class="aside">
        <div class="main">
          <h4>草稿箱 ({{post.length}})</h4>
          <div class="draftsInfo" v-for="(item,index) in post" :key="index">
            <div class="draftsTitle" @click="seeDrafts(index)">
              <span>{{item.title}}</span>
              <i class="el-icon-edit"></i>
            </div>
            <p>{{item.time}}</p>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      form: {
        title: "",
        city: "",
        cityId:null,
        content: ""
      },
      post: []
    };
  },
  methods: {
    // 获取富文本框的数据
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.form.content = html;
    },
    // 输入城市远程搜索时获取数据进行渲染下拉框城市数据
    querySearchAsync(value,cb) {
      if(!value){
        cb([])
        return
      }
      this.$axios({
        url:"/cities",
        params:{
          name:value
        }
      }).then(res=>{
        const {data} = res.data
        const newData = []
        data.forEach(v=>{
          v.value = v.name
          newData.push(v)
        })
        // console.log(newData)/
        
        // 渲染
        cb(newData)
      })
    },
    // 点击下拉框的城市时,获取城市的id
    handleSelect(item) {
      // console.log(this.form.city)
      this.form.cityId = item.id
      // console.log(this.form.cityId)
    },
    // 点击发布时,发送参数到后台进行存储
    onSubmit() {
      // console.log(this.form.content);

      //验证表单
      if(!this.form.title){
        this.$alert("请填写标题","提示",{type:"warning"})
        return
      }
       if(!this.form.content){
        this.$alert("请填写攻略内容","提示",{type:"warning"})
        return
      }
       if(!this.form.city){
        this.$alert("请填写城市名称","提示",{type:"warning"})
        return
      }
       if(!this.form.cityId){
        this.$alert("请填写正确的城市名称","提示",{type:"warning"})
        return
      }

      // 拼接参数
      const data = {
        title:this.form.title,
        content:this.form.content,
        city:this.form.cityId
      }
      // console.log(data)
      // 发送数据到后台服务器
      this.$axios({
        url:"/posts",
        method:"POST",
        data,
        headers:{ 
          Authorization:`Bearer ${this.$store.state.user.userInfo.token}` 
        }
      }).then(res=>{
        console.log(res)
        if(res.status === 200){
          this.$message({
            message:`${res.data.message}`,
            type:"success"
            })
        }
        // this.$router.push("/post")
        // 表单初始化
          this.form = {
          title: "",
          city: "",
          cityId:null,
          content: ""
        }

      }).catch(err => {})
    },
    // 点击保存草稿箱时,保存数据
    drafts() {
        // 验证表单
        if(!this.form.title){
          this.$alert("请填写标题","提示",{type:"warning"})
          return
        }
       const data = {
        title:this.form.title,
        content:this.form.content,
        city:this.form.city,
        time:moment().format('YYYY-MM-DD')
      }
      // console.log(data);
      // 先获取本地存储的数据,再将数据添加到获取的数据中,最后再将数据保存到本地
      // const posts = JSON.parse(localStorage.getItem("posts") || "[]")
      // // console.log(posts)
      // posts.unshift(data)
      // localStorage.setItem("posts",JSON.stringify(posts))
      // const newposts = JSON.parse(localStorage.getItem("posts") || "[]")
      // console.log(newposts)

      // 以上解决方案不成立,使用以下方案
      const arr = [...this.$store.state.post.posts]
      console.log(arr)
      arr.unshift(data)
      // 当草稿箱超过5个时,删除第六个
      if(arr.length>5){
          arr.length = 5
      }
      this.$store.commit("post/addPost",arr)
      const { posts } = this.$store.state.post;
      this.post = posts;

      // 表单初始化
          this.form = {
          title: "",
          city: "",
          cityId:null,
          content: ""
        }
    },
    seeDrafts(index) {
      const arr = [...this.$store.state.post.posts]
      this.form.title = arr[index].title
      this.form.content = arr[index].content
      this.form.city = arr[index].city
    },
  },
  mounted(){
    setTimeout(() => {
      this.post = [...this.$store.state.post.posts]
    },10)
  }
}
</script>
<style lang='less' scoped>
.container {
  width: 1000px;
  // height: 880px;
  margin: 0 auto;
  padding: 20px 0 20px 0;
}
.postMain {
  width: 75%;
}
.postMain h2 {
  color: #000031;
  font-weight: normal;
}
.postMain p {
  display: block;
  color: #999999;
  font-size: 12px;
  margin: 15px 0;
}
/deep/ .el-form-item__label {
  padding-right: 24px;
}
.myquill {
  min-height: 400px;
  max-height: 600px;
  overflow: auto;
}
.el-button {
  height: 40px;
  margin-top: 20px;
  line-height: 0px;
}
.baocun span {
  margin: 20px 10px 20px 30px;
}
.baocun .drafts {
  height: 16px;
  line-height: 16px;
  color: #ffaf24;
  margin: 33px 0 0;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    border-bottom: 1px solid #ffaf24;
  }
}
.aside {
  width: 20%;
}
.main {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}
.main h4 {
  color: #707070;
  font-weight: normal;
  margin-bottom: 10px;
}
.main .draftsInfo {
  margin-top: 10px;
  .draftsTitle {
    span {
      font-size: 14px;
      color: #29060c;
      &:hover {
        cursor: pointer;
        color: #ffaf24;
        border-bottom: 1px solid #ffaf24;
      }
    }
    &:hover {
      cursor: pointer;
      color: #ffaf24;
    }
    &:hover span {
      color: #ffaf24;
      border-bottom: 1px solid #ffaf24;
    }
  }
  p {
    font-size: 14px;
    color: #a4a4a4;
  }
}
</style>
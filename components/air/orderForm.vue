<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
          <!-- 循环渲染的乘机人 -->
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox 
          @change="handleChange(item)"
          :label="`${ item.type }：￥${ item.price }/份×${ users.length }  最高赔付${ item.compensation }`"  border></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>

    <!-- 调用allprice让总价开始计算 -->
    <input type="hidden" :value="allPrice">
  </div>
</template>

<script>
export default {
  data(){
      return{
        users:[
            {
                username:"",
                id:""
            }
        ],
        insurances:[],
        contactName:"",
        contactPhone:"",
        captcha:"",

        // 机票信息
        infoData:{},

        invoice:false           // 是否需要发票
      }
  },
  methods: {
    // 获取选中的保险id
      handleChange(item){
        const index = this.insurances.indexOf(item.id)
        if(index > -1){
            this.insurances.splice(index, 1)
        } else{
            // 将选中的保险的id添加到insurances数组中
            this.insurances.push(item.id)
        }
          
      },
    // 添加乘机人
    handleAddUsers() {
        // 给users增加一个对象,利用v-for自动生成新的用户列表
        this.users.push({
            username:"",
            id:""
        })
    },

    // 移除乘机人
    handleDeleteUser(index) {
        // 利用当前列表项的下标进行删除数组中的某一项
        this.users.splice(index,1)
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if(!this.contactPhone){
        this.$alert("手机号不能为空","提示",{type:"warning"})
        return
      }
      this.$axios({
        url:"/captchas",
        method:"POST",
        data:{
          tel:this.contactPhone
        }
      }).then(res=>{
        // console.log(res)
        const {code} = res.data
        this.$alert(`模拟的手机验证码为: ${code}`,"提示",{type:"warning"})
      })
    },

    // 提交订单
    handleSubmit() {
        // console.log(this.insurances)
         const data = {
             users: this.users,
             insurances: this.insurances,
             contactName: this.contactName,
             contactPhone: this.contactPhone,
             captcha: this.captcha,
             invoice: this.invoice,
             seat_xid:this.$route.query.seat_xid,
             air:this.$route.query.id
         }
        //  console.log(data)

        // 表单验证
        // 判断表单是否通过
        let valid = true
        // 遍历数组,判断乘机人
        this.users.forEach(v=>{
          if(!v.username || !v.id){
            this.$alert("乘机人信息不能为空","提示",{type:"warning"})
            valid = false
          }
        })

        if(!valid){
          return
        }
        // 判断联系人信息
        if(!this.contactName){
          this.$alert("联系人姓名不能为空","提示",{type:"warning"})
          return
        }

        // 提交订单
        this.$axios({
          url:"/airorders",
          method:"POST",
          data,
          headers:{
            Authorization:` Bearer ${this.$store.state.user.userInfo.token}`
          }
        }).then(res=>{
          console.log(res)
        })
    }
  },
  computed:{
    // computed中的函数内部所引用的实例的属性一旦发生变化
    // 就会重复调用,返回新的值
    allPrice(){
      let price = 0;
      // 如果请求的数据还没有返回,就默认为0
      if(!this.infoData.seat_infos){
        return 0
      }
      // 机票单价
      price += this.infoData.seat_infos.org_settle_price
      // 燃油费用
      price += this.infoData.airport_tax_audlet
      // 保险费
      price += this.insurances.length * 30
      // 乘机人数
      price *= this.users.length
      // 把总价格返回给组件
      this.$emit("setAllPrice",price)

      return price
    }
  },
  mounted(){
      const {id,seat_xid} = this.$route.query
      this.$axios({
          url:"airs/"+id,
          params:{
              seat_xid
          }
      }).then(res => {
          console.log(res.data)
        this.infoData = res.data
        
        //将返回的数据传给父组件
        this.$emit("setInfoData",this.infoData)
      })
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
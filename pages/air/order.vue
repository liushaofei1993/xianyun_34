<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm @setInfoData ="setInfoData" />

            <!-- 侧边栏 -->
            <OrderAside :data="infoData"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    data(){
        return{
            infoData:{
                seat_infos:{}  // =====   由于请求后台数据速度问题,orderAside.vue组件中渲染data时 先 使用的是父组件中的定义好的infoData,若是不加属性seat_infos就会导致渲染seat_infos数据中的某属性时 出现如下错误:  Cannot read property 'org_settle_price' of undefined :某属性无定义   而在子组件orderAside中同样位置添加属性  seat_infos  时没有用的 =====
            }
        }
    },
    components:{
        OrderForm,
        OrderAside
    },
    methods:{
        setInfoData(data){
            this.infoData = data
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
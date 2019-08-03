<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                <div>
                   <FlightsItem
                    v-for="(item,index) in listData"
                    :key="index"
                    :data="item"/>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead.vue';
import FlightsItem from '@/components/air/flightsItem.vue'

import moment from "moment";

export default {
    data(){
        return {
            listData:''
        }
    },
    components:{
        FlightsListHead,
        FlightsItem
    },
    methods:{
        getFlightsData(){
            // console.log(this.$route)
            
            this.$axios({
                url:'airs',
                params:this.$route.query
            }).then(res=>{
                console.log(res.data)
                this.listData = res.data.flights
            })
        }
    },
    mounted(){
        this.getFlightsData()
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>
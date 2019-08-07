// 引入Message
import {Messge, Message} from 'element-ui'

// axios拦截插件

export default ({$axios,redirect}) => {

    $axios.onError(res => {
        // console.log(res.response)
        // 解构赋值
        const {statusCode,message} = res.response.data

        // 判断401和403的错误信息
        if(statusCode ===401 || statusCode === 403){
            // 跳转到登录页
            redirect('/user/login')
        }


        // 判断400的错误信息
        if(statusCode === 400){
            // alert('请求失败')
            Message.warning(message)
        }
    })
}
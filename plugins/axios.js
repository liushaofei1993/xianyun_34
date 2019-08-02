// 引入Message
import {Messge, Message} from 'element-ui'

// axios拦截插件

export default ({$axios}) => {

    $axios.onError(res => {
        // console.log(res.response)
        // 结构赋值
        const {statusCode,message} = res.response.data
        // 判断错误信息,在页面上提示
        if(statusCode){
            // alert('请求失败')
            Message.warning(message)
        }
    })
}
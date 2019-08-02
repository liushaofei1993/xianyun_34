// axios拦截插件

export default ({$axios}) => {

    $axios.onError(res => {
        console.log(res)
    })
}
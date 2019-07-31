// 保存数据的属性
export const state = {
    userInfo:{
        token:'',
        user:{
            nickname:'朔月'
        }
    }
}

// 同步修改数据 mutations
export const mutations = {
    setUserInfo(state,data){
        state.userInfo = data
    }
}

// 异步修改数据 actons
export const actions = {

}


// 保存数据的属性
export const state = {
    userInfo:{
        token:'',
        user:{}
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


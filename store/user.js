// // 保存数据的属性
// export const state = {
//   userInfo: {
//     token: '',
//     user: {}
//   }
// }

export const state = ()=>{
    return{
        userInfo:{
            token:'',
            user:{}
        }
    }
}


// 同步修改数据 mutations
export const mutations = {

    // 添加修改state数据的方法
  setUserInfo(state, data) {
    state.userInfo = data
  },

   // 添加清除useInfo数据的方法
   clearUserInfo(state){
        state.userInfo = {
            token:'',
            user:{}
        }
   }

}

// 异步修改数据 actons
export const actions = {

}

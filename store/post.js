export const state = ()=>{
    return{
        posts:[]
    }
}
export const mutations = {
    addPost(state,data){
        state.posts = data

    
    } 
}
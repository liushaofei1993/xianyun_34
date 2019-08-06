export const state = ()=>{
    return {
        history:[]
    }
}

export const mutations = {
    setHistory(state,arr){
        state.history = arr
        console.log(state.history)
    }
}

export const actions = {

}
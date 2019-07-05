/* eslint-disable */
/*
Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。
*/
export default {
    state: {
        count: 0
    },
    // mutations 仅能做同步操作。
    mutations: {
        // 加1
        INCREMENT(state) {
            state.count++
        },
        // 减1
        DECREMENT(state) {
            state.count--
        }
    },
    // actions 可以包含任意异步操作。
    // Action 提交的是 mutation，而不是直接变更状态。
    actions: {
        increment(context) {
            context.commit('INCREMENT')
        },
        decrement({ commit }) {
            commit('DECREMENT')
        }
    }
}

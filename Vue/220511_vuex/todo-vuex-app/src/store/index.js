import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    todos: []
  },
  getters: {
    completedTodosCount: function (state) {
      return state.todos.filter(todo => {
        return todo.isCompleted === true
      }).length
    }
  },
  mutations: {
    CREATE_TODO: function (state, todoItem) {
      // console.log(state)
      // console.log(todoItem)
      state.todos.push(todoItem)
    },
    DELETE_TODO: function (state, todoItem) {
      // 1. todoItem이 첫번째로 만나는 요소의 index를 가져옴
      const index = state.todos.indexOf(todoItem)
      // 2. goekd index 1개만 삭제하고 나머지 요소로 새로운 배열 생성
      state.todos.splice(index, 1)
    },
    UPDATE_TODO: function (state, todoItem) {
      // 3. 배열의 각 요소에 함수가 적용된 새로운  배열을 기존 state의 todos로 할당
      state.todos = state.todos.map(todo => {
        // 1. 넘어온 todoItem과 현재 state의 todos의 요소가 일치하면
        if (todoItem === todo) {
          // 2. isCompleted 상태를 변경한 새로운 object를 return
          todo.isCompleted =!todo.isCompleted
        }
        return todo
      })
    }
  },
  actions: {
    createTodo: function ({ commit }, todoItem) {
      // console.log(context)
      // console.log(todoItem)

      // const commit = context.commit
      // commit('CREATE_TODO', todoItem)
      // 구조 분해 할당
      // const { commit } = context
      // functions의 인자를 context에서  {commit}으로 바꿈
      
      commit('CREATE_TODO', todoItem)
    },
    // 받는 2번째 인자는 여기서 정하기 나름!
    deleteTodo: function ({ commit }, todoItem) {
      commit('DELETE_TODO', todoItem)
    },
    updateTodo: function({ commit }, todoItem) {
      commit('UPDATE_TODO', todoItem)
    }
  },
  modules: {
  }
})

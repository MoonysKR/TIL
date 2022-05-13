<template>
  <div>
    <!-- v-bind 활용을 통해 취소선 주는법 -->
    <!-- mapActions의 문법적 한계가 있기 때문에 여기에서 인자로 넣어버림 -->    
    <span 
      class="pointer"
      :class="{ 'is-completed': todo.isCompleted }"
      @click="updateTodo(todo)"
    >
    {{ todo.title }}
    </span>
    <!-- mapActions의 문법적 한계가 있기 때문에 여기에서 인자로 넣어버림 -->
    <button @click="deleteTodo(todo)">Delete</button>
  </div>
</template>

<script>
// 구조 분해 할당
// import vuex from 'vuex'
import { mapActions } from 'vuex'

// console.log(vuex.mapActions(['deleteTodo', 'updateTodo']))

export default {
  name: 'TodoListItem',
  props:{
    todo: Object,
  },
  methods: {
    // 컴포넌트가 사용하고 있는 todo 값을 보내야하기 때문에 인자에 todo
    // deleteTodo: function () {
      // this.$store.dispatch('action_name')
    //   this.$store.dispatch('deleteTodo', this.todo)
    // },
    // updateTodo: function () {
    //   this.$store.dispatch('updateTodo', this.todo)
    // }

    // 전개 연산자 ...
    // ...vuex.mapActions(['deleteTodo', 'updateTodo'])
    // 인자를 넣어주기 위해서 위에 v-on 에 인자로 넣어버림
    ...mapActions(['deleteTodo', 'updateTodo'])
  },
}
</script>

<style>
.pointer {
  cursor: pointer;
}
.is-completed {
  text-decoration: line-through;
}
</style>
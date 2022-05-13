<template>
  <div>
    <input 
      type="text" 
      @keyup.enter="createTodo"
      v-model.trim="todoTitle"
    >
  </div>
</template>

<script>
export default {
  name: 'TodoForm',
  data: function() {
    return {
      todoTitle: null,
    }
  },
  methods: {
    createTodo: function () {
      // console.log('todo created!')
      const todoItem = {
        title: this.todoTitle,
        isCompleted: false,
        date: new Date().getTime()
      }
      // this.$store.commit('CREATE_TODO', todoItem)
      if (todoItem.title) {
        this.$store.dispatch('createTodo', todoItem)
      }
      this.todoTitle = null
    },
  }

}
</script>

<style>

</style>
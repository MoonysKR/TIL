<template>
  <div id="app">
    <h1>Todo List</h1>
    <h2>완료된 TODO : {{ completedTodosCount }}</h2>
    <todo-list></todo-list>
    <hr>
    <todo-form></todo-form>
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import { mapGetters } from 'vuex'


export default {
  name: 'App',
  components: {
    TodoList,
    TodoForm
  },
  computed: {
    // completedTodosCount: function () {
    //   return this.$store.getters.completedTodosCount
    // }
    ...mapGetters(['completedTodosCount'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

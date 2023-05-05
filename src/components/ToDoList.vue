<script setup>
import { useCollection } from 'vuefire'
import { todosRef } from '../firebase'

const todos = useCollection(todosRef)
</script>
<template>
  <ul>
      <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.name }}</span>
      </li>
    </ul>
</template>
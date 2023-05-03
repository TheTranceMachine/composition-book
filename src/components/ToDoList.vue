<script setup>
import { useFirestore , useCollection } from 'vuefire'
import { todosRef } from '../firebase'

const db = useFirestore()
const todos = useCollection(todosRef)
</script>
<template>
  <ul>
      <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.name }}</span>
      </li>
    </ul>
</template>
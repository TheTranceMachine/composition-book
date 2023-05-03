<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()

const auth = getAuth()
const email = "grzegorz.smolin2@gmail.com"
const password = "testing123"

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential.user)
  })
  .catch((error) => {
    console.log(error.code)
    console.log(error.message)
  })
</script>
<template>
  <p v-if="user">Hello {{ user.email }}</p>
</template>
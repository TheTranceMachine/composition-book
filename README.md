# composition-book

Demonstrate a basic setup of Vue and Firebase. Should include the following:
- Email Authentication with Firebase
- Firestore Database with VueFire wrapper
- Environment variables
- Firebase Storage integration

## Quick Start tutorial.

[Quick start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)
  ```
    npm init vue@latest
    cd <your-project-name>
  ```
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Install Firebase

These steps demonstrate how to install Firebase and Firestore DB in your Vue project.

[Firebase](https://console.firebase.google.com/)
1. Add a new Project under "Your Firebase projects".
2. Choose your prefered options.
3. When the project is created, click on "Web" under "Get started by adding Firebase to your app". Give your a name and Register app.
4. Add Firebase SDK
	1. `npm install firebase --save`
	2. copy the whole snippet of code that includes SDK config
	3. back in your project, create a new file under `/src` called `firebase` without any extension
	4. paste previously copied code into the newly created file

## Install VueFire and Create Firestore Database

[Vuefire](https://vuefire.vuejs.org/) is a lightweight wrapper that handles realtime binding between Vue/Vuex and Firebase databases, such as real-time databases or Cloud Firestore. It has some inbuilt logic that always keeps local data in sync with remote Firebase databases.

1. `npm install vuefire --save`
2. Copy the following snippet and replace `firebase` file contents with it
```
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  // keep the original keys untouched and move them here
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')
```
3. Create [Firestore Database](https://console.firebase.google.com/project/presentation-8d4b4/firestore)
4. Click on "Start collection" under "Panel view" when the Database is created. Collection ID is your DB name. In this example it's "todos". You should also add the first key and value. If your DB name is different, replace 'todos' in the above example wqith your own name.
5. Replace contents of `src/main.js` with the following snippet:
```
import { createApp } from 'vue'
import { VueFire } from 'vuefire'
import App from './App.vue'
import { firebaseApp } from './firebase'

const app = createApp(App)
app
  .use(VueFire, {
    firebaseApp,
    modules: [],
  })

app.mount('#app')
```

## Retrieve a reactive collection from Firestore

1. Copy the following snippet and paste into a newly created file called `ToDoList.vue` under `src/components` :
```
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
```
Replace `todo`, `todos`, `todo.id` or `todo.name` with your own names.
2. Add the newly created component to `App.vue`
```
<script setup>
...
import ToDoList from './ToDoList.vue'
</script>
<template>
	...
	<ToDoList />
</template>
```

## Obscure SDK variables

[Env Variables and Modes | Vite (vitejs.dev)](https://vitejs.dev/guide/env-and-mode.html)

1. Create `.env` file in the root of the app
2. Create ENV variables for configuration variables. Each key should start with `VITE_`. Example:
```
VITE_APIKEY=123
```
3. Add reference to your newly created env. variables in `src/firebase`:
```
const {
  VITE_APIKEY,
  ...
} = import.meta.env
```
5. Replace key values in `src/firebase` with env. variables. Example:
```
export const firebaseApp = initializeApp({
  apiKey: VITE_APIKEY,
  ...
  })
```

## Basic Email Authentication with Firebase

[Firebase Authentication](https://console.firebase.google.com/project/composition-book/authentication/providers)

1. Enable Email/Password as your Sign-in provider. Click Save.
2. Select "Users" tab and click "Add user". Add Email address and password.
3. Follow [VueFire Authentication installation tutorial](https://vuefire.vuejs.org/guide/auth.html). Edit `src/main.js`:
	1. Import `VueFireAuth` from *vuefire*.
	2. Add `VueFireAuth()` into modules
```
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import { firebaseApp } from './firebase'

const app = createApp(App)
app
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })

app.mount('#app')
```
4. Follow [Firebase docs](https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password). Create a new file `src/SignIn.vue` and add this snippet as content:
```
<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
const auth = getAuth()
const email = <email>
const password = <password>

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
```
5. Replace *email* nad *password* with the credentials from Firebase newly created user. Import "SignIn" component to `App.vue` and render it. If the credentials are correct, you will see a greeting.  Otherwise, the greeting won't be displayed.

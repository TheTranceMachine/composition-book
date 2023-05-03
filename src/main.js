import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import App from './App.vue';
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from './firebase';

const app = createApp(App);
app
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  });

app.mount('#app');

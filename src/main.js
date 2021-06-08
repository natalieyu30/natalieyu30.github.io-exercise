import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})


// createApp(App).use(router).mount('#app')
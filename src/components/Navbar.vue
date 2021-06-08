<template>
  <nav>
    <div class="nav-wrapper teal">
      <div class="container">
        <router-link to='/' class="brand-logo left">Employee Manager</router-link>
        <ul class="right">
          <li v-if="isLoggedIn">{{currentUser}}</li>
          <li v-if="isLoggedIn"><router-link to='/'>Dashboard</router-link></li>
          <li v-if="!isLoggedIn"><router-link to='/login'>Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to='/register'>Register</router-link></li>
          <li v-if="isLoggedIn"><button @click="userLogout" class="btn black">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter();

    const isLoggedIn = ref(false)
    const currentUser = ref('')

    onMounted(() => {
      if (firebase.auth().currentUser) {
        isLoggedIn.value = true;
        currentUser.value = firebase.auth().currentUser.email;
      }
    })

    const userLogout = () => {
      firebase.auth().signOut().then(() => {
        router.push('/login');
      }).catch((error) => {
        console.log(error.message)
      });
    }

    return { isLoggedIn, currentUser, userLogout }
  }
}
</script>

<style>

</style>
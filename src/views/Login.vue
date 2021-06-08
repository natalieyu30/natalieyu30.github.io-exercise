<template>
  <div class="container auth-form">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="card-panel teal lighten-1 white-text center">
          <h3>Login</h3>
          <form>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input v-model="state.email" type="text" id="email">
              <label class="white-text" for="email">Email</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input v-model="state.password" type="password" id="password">
              <label class="white-text" for="password">Password</label>
            </div>
            <button @click.prevent="loginEmployee" class="btn grey lighten-3 black-text">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import firebase from 'firebase'
import { useRouter } from 'vue-router'


export default {
  setup() {
    const router = useRouter()

    const state = reactive({
      email: '',
      password: ''
    })

    const loginEmployee = () => {
      firebase.auth().signInWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          console.log(userCredential.user)
          // alert(`You are logged in as ${userCredential.user.email}`)
          router.push('/')
        })
        .catch(err => alert(err.message))
    }

    return { state, loginEmployee }
  }
}
</script>

<style>
.auth-form {
  margin-top: 30px;
}
</style>
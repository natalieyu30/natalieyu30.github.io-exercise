<template>
  <div class="container auth-form">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="card-panel grey lighten-4 center">
          <h3>Register</h3>
          <form>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="text" id="email" v-model="state.email">
              <label for="email">Email</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="state.password">
              <label for="password">Password</label>
            </div>
            <button @click.prevent="registerEmployee" class="btn teal lighten-1 white-text">Register</button>
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
// import db from '@/components/firebaseInit'


export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      email: '',
      password: ''
    })

    const registerEmployee = () => {
      firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          console.log(userCredential.user)
          alert(`Account created for ${userCredential.user.email}`)
          router.push('/')
        })
        .catch(err => alert(err.message))
    }

    return { state, registerEmployee }
  }
}
</script>

<style>
.auth-form {
  margin-top: 30px;
}
</style>
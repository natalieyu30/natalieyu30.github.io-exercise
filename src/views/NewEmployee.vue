<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s10">
            <input type="text" v-model="state.employee_id" required>
            <label>Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10">
            <input type="text" v-model="state.name" required>
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10">
            <input type="text" v-model="state.dept" required>
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10">
            <input type="text" v-model="state.position" required>
            <label>Position</label>
          </div>
        </div>
        <button type="submit" class="btn">Add Employee</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import db from '@/components/firebaseInit.js'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter();

    const state = reactive({
      employee_id: '',
      name: '',
      dept: '',
      position: ''
    })

    const saveEmployee = () => {
      db.collection('employees').add({
          employee_id: state.employee_id,
          name: state.name,
          dept: state.dept,
          position: state.position
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          router.push('/')
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    }


    return { state, saveEmployee }
  }
}
</script>

<style>

</style>
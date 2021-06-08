<template>
  <div id="edit-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s10">
            <input disabled type="text" v-model="state.employee_id" required>
            <label class="active">Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10">
            <input type="text" v-model="state.name" required>
            <label class="active">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10">
            <input type="text" v-model="state.dept" required>
            <label class="active">Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10">
            <input type="text" v-model="state.position" required>
            <label class="active">Position</label>
          </div>
        </div>
        <button type="submit" class="btn">Update</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import db from '@/components/firebaseInit.js'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      employee_id: '',
      name: '',
      dept: '',
      position: ''
    })

    onMounted(() => {
      const id = route.params.employee_id
      db.collection('employees').where('employee_id', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            state.employee_id = doc.data().employee_id,
            state.name = doc.data().name,
            state.dept = doc.data().dept,
            state.position = doc.data().position
          })
        })
    })

    const updateEmployee = () => {
      const id = route.params.employee_id
      db.collection('employees').where('employee_id', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            db.collection("employees").doc(doc.id).update({
                "employee_id": state.employee_id,
                "name": state.name,
                "dept": state.dept,
                "position": state.position
            })
            .then(() => router.push({name: 'View Employee', params: { employee_id: state.employee_id}}))
          })
        })
    }
    return { state, updateEmployee }
  }
}
</script>

<style>

</style>
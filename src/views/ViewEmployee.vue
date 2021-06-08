<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{state.name}}</h4>
      </li>
      <li class="collection-item">Employee ID#: {{state.employee_id}}</li>
      <li class="collection-item">Department: {{state.dept}}</li>
      <li class="collection-item">Position: {{state.position}}</li>
    </ul>
    <router-link to='/' class="btn grey">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      <router-link :to="{name: 'Edit Employee', params: {employee_id: state.employee_id}}" class="btn-floating btn-large green">
        <i class="material-icons">edit</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from 'vue'
import db from '@/components/firebaseInit.js'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

export default {
  // props: {
  //   employee_id: String
  // },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      employee_id: '',
      name: '',
      dept: '',
      position: ''
    })

    onBeforeMount(() => {
      const id = route.params.employee_id
      db.collection('employees').where('employee_id', "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            state.employee_id = doc.data().employee_id,
            state.name = doc.data().name,
            state.dept = doc.data().dept,
            state.position = doc.data().position
          })
        })
    })

    const deleteEmployee = () => {
      const id = route.params.employee_id
      if (confirm('Are you sure?')) {
        db.collection("employees").where('employee_id', "==", id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              db.collection("employees").doc(doc.id).delete();
              console.log("Document successfully deleted!");
              router.push('/')
            })
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
      }
      
    }

    return { state, deleteEmployee }
  }
}
</script>

<style>

</style>
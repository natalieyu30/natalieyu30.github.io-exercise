<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" :key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>{{employee.employee_id}} : {{employee.name}}
        <router-link class="secondary-content" :to="{name: 'View Employee', params: {employee_id: employee.employee_id}}">
          <i class="material-icons">keyboard_arrow_right</i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import db from '@/components/firebaseInit.js'

export default {
  setup() {
    const employees = ref([])

    onBeforeMount(() => {
      db.collection("employees").orderBy('dept').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              'id' : doc.id,
              'employee_id': doc.data().employee_id,
              'name': doc.data().name,
              'dept': doc.data().dept,
              'position': doc.data().position
            }
            employees.value = [...employees.value, data] 
          });
      });
    })


    return { employees }
  }
}
</script>

<style>

</style>
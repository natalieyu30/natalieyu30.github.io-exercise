import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Dashboard from '@/views/Dashboard'
import NewEmployee from '@/views/NewEmployee'
import ViewEmployee from '@/views/ViewEmployee'
import EditEmployee from '@/views/EditEmployee'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/new',
    name: 'New Employee',
    component: NewEmployee
  },
  {
    path: '/edit/:employee_id?',
    name: 'Edit Employee',
    component: EditEmployee
  },
  {
    path: '/:employee_id',
    name: 'View Employee',
    component: ViewEmployee
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

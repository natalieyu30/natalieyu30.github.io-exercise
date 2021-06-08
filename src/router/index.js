import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Dashboard from '@/views/Dashboard'
import NewEmployee from '@/views/NewEmployee'
import ViewEmployee from '@/views/ViewEmployee'
import EditEmployee from '@/views/EditEmployee'
import Login from '@/views/Login'
import Register from '@/views/Register'

import firebase from 'firebase';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/new',
    name: 'New Employee',
    component: NewEmployee,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:employee_id?',
    name: 'Edit Employee',
    component: EditEmployee,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:employee_id',
    name: 'View Employee',
    component: ViewEmployee,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if NOT logged in
    if (!firebase.auth().currentUser) {
      // go to login
      next({ 
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // check if logged in
    if (firebase.auth().currentUser) {
      // go to login
      next({ 
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // proceed to route
      next();
    }
  } else {
    // proceed to route
    next()
  }
})

export default router

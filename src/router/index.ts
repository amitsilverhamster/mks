import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router/auto'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/frontend/pages/index.vue'),
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import('../pages/admin/pages/index.vue'),
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import('../pages/admin/pages/product/index.vue'),
  },
  {
    path: '/admin/products/create',
    name: 'AdminProductCreate',
    component: () => import('../pages/admin/pages/product/create/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router

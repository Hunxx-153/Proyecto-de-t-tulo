import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '@/views/01-Inicio/InicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: InicioView,
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('@/views/02-Proyecto/ProyectoView.vue'),
    },
    {
      path: '/prestaciones',
      name: 'prestaciones',
      component: () => import('@/views/03-Prestaciones/PrestacionesView.vue'),
    },
    {
      path: '/parametros',
      name: 'parametros',
      component: () => import('@/views/04-Parametros/ParametrosView.vue'),
    },
    {
      path: '/resultados',
      name: 'resultados',
      component: () => import('@/views/05-Resultados/ResultadosView.vue'),
    },
  ],
})

export default router
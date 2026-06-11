import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '@/views/01-Inicio/InicioView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/01.1-Login/LoginView.vue'),
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('@/views/02-Proyecto/ProyectoView.vue'),
    },
    {
      path: '/crear-proyecto',
      name: 'crear-proyecto',
      component: () => import('@/views/02.1-CreacionProyecto/CreacionProyectoView.vue'),
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
    {
      // Redirige cualquier ruta desconocida a /login
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

export default router
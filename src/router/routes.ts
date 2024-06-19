import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Overview',
      component: () => import('@/overview/Overview.vue'),
    },
    {
      path: '/new-order',
      name: 'NewOrder',
      component: () => import('@/overview/components/OrderDetailsForm.vue')
    },
    {
      path: '/details/:id',
      name: 'OrderDetailsForm',
      component: () => import('@/overview/components/OrderDetailsForm.vue')
    },
    {
      path: '/multi/:com_no',
      name: 'DetailsForm',
      component: () => import('@/form/Details.vue')
    },
    {
      path: '/requests',
      name: 'Requests',
      component: () => import('@/views/Requests.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/settings/Settings.vue'),
    },
    {
      path: '/administration',
      name: 'Administration',
      component: () => import('@/views/Administration.vue'),
    },
    {
      path: '/system-settings',
      name: 'SystemSettings',
      component: () => import('@/views/SystemSettings.vue'),
    },
    {
        path: '/profil',
        name: 'Profil',
        component: () => import('@/views/Profil.vue'),
      },
    {
      path: '/history/:com_no',
      name: 'History',
      component: () => import('@/overview/components/History.vue')
    }
  ];

  export default routes
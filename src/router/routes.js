import { createRouter, createWebHistory } from 'vue-router';
import loginPage from 'pages/LoginPage.vue';
import PasswordPage from 'pages/PasswordPage.vue';
import menuTaskComponent from 'components/Menu/menuTaskComponent.vue';
import createUser from 'pages/CreateUserPage.vue';
import { useUserStore } from 'stores/user-store';


const setUiParams = (to, from, next) =>{
  const isLoggedIn = useUserStore().isLoggedIn;
  if (!isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
}


const routes = [
  {
    path: '/menu',
    component: () => import('src/router/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'menutaskcomponent',
        component: menuTaskComponent,
        beforeEnter: setUiParams
      }
    ]
  },
  {
    name: 'login',
    path: '/',
    component: loginPage,
    meta: { requiresAuth: false },
  },
  {
    name: 'password',
    path: '/password',
    component: PasswordPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/createuser',
    name: 'createuser',
    component: createUser,
    meta: { requiresAuth: false },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

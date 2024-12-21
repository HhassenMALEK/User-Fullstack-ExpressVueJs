import { createMemoryHistory, createRouter } from 'vue-router';
import UserList from '@/components/UserList.vue';
import CreateUser from '@/components/CreateUser.vue';
import EditUser from '@/components/EditUser.vue';
import UserDetails from '@/components/UserDetails.vue';


const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', component: UserList },
  { path: '/users/create', component: CreateUser},
  { path: '/users/:id/edit', component: EditUser },
  { path: '/users/:id', component: UserDetails }

];


const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;
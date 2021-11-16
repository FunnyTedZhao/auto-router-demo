import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import DemoAPI from '@/apis/api';

const Home = () => import('@/views/Home.vue');
const VueView = () => import('@/views/vue/View.vue');
const VueIndex = () => import('@/views/vue/Vue.vue');
const Vuex = () => import('@/views/vue/Vuex.vue');
const routeMap = {
  VueView,
  Vue: VueIndex,
  Vuex,
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const routeHandler = {
  addRoute(parentName, route) {
    const tRoute = route || parentName;
    const tParentName = route && parentName;
    if (tRoute.type === 'menu') {
      router.addRoute({
        path: tRoute.path,
        name: tRoute.name,
        component: routeMap[tRoute.name],
        children: [],
      });
      routeHandler.handleRoutes(tRoute.name, tRoute.children);
    }
    if (tRoute.type === 'link') {
      router.addRoute(tParentName, {
        path: tRoute.path,
        name: tRoute.name,
        component: routeMap[tRoute.name],
        meta: {
          authorities: routeHandler.handleAuthorities(tRoute.children),
        },
      });
    }
  },
  handleAuthorities(authorities) {
    return authorities.map((authority) => authority.symbol);
  },
  handleRoutes(parentName, menus) {
    const tRoutes = menus || parentName;
    const tParentName = menus && parentName;
    if (!(tRoutes instanceof Array)) return;
    tRoutes.forEach((route) => routeHandler.addRoute(tParentName, route));
  },
};

router.beforeEach((to, from, next) => {
  const { hasMenus } = store.getters;
  if (!hasMenus) {
    DemoAPI.getRoutes().then((res) => {
      const { data: { menuList } } = res;
      routeHandler.handleRoutes(menuList);
      store.commit('setMenus', menuList);
      next({ ...to, replace: true });
    });
  } else {
    next();
  }
});

export default router;

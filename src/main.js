import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/iview';

Vue.config.productionTip = false;

/* */
Vue.directive('permission', {
  inserted(el, binding) {
    const {
      history: {
        current: {
          meta: { authorities },
        },
      },
    } = router;
    const flag = binding.value;
    if (!authorities.includes(flag)) el.parentNode.removeChild(el);
  },
});
/* */

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

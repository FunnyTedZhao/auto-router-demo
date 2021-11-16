import Vue from 'vue';
import router from '../router';

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

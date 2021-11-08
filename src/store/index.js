import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menus: [],
  },
  getters: {
    menus: (state) => state.menus,
    hasMenus: (state, getters) => getters.menus.length > 0,
  },
  mutations: {
    setMenus(state, payload) {
      state.menus = payload || [];
    },
  },
  actions: {
  },
  modules: {
  },
});

<template>
  <Menu
    :active-name="activeName"
    theme="light"
    width="auto"
    :open-names="['1']"
  >
    <MenuItem
      name="Home"
      to="/"
    >
      Home
    </MenuItem>
    <ArMenuItem
      v-for="menu in menus"
      :key="menu.path"
      :info="menu"
    />
  </Menu>
</template>

<script>
import { mapGetters } from 'vuex';
import ArMenuItem from './ArMenuItem.vue';

export default {
  name: 'ArMenu',
  components: {
    ArMenuItem,
  },
  computed: {
    ...mapGetters({
      menus: 'menus',
    }),
    activeName() {
      return this.$route.name;
    },
    activePath() {
      return this.$route.path;
    },
  },
  watch: {
    activePath(newValue) {
      console.log(newValue);
      console.log(this.activeName);
      console.log(this.$router);
      console.log(this.$router.getRoutes());
    },
  },
};
</script>

<template>
  <MenuItem
    v-if="info.type === 'link'"
    :name="info.name"
    :to="handlePath(info.path)"
  >
    {{ info.title }}
  </MenuItem>
  <Submenu
    v-else-if="info.type === 'menu'"
    :name="info.name"
  >
    <template slot="title">
      <Icon type=""></Icon>
      {{ info.title }}
    </template>
    <template v-if="info.children.length > 0">
      <ArMenuItem
        v-for="menu in info.children"
        :key="menu.path"
        :info="menu"
        :parentName="info.name"
        :parentPath="handlePath(info.path)"
      />
    </template>
  </Submenu>
</template>

<script>
export default {
  name: 'ArMenuItem',
  props: {
    info: {
      type: Object,
    },
    parentName: {
      type: String,
      default: '',
    },
    parentPath: {
      type: String,
      default: '',
    },
  },
  methods: {
    handlePath(path) {
      return this.parentPath ? `${this.parentPath}/${path}` : path;
    },
  },
  created() {
    console.log(this.handlePath(this.info.path));
  },
};
</script>

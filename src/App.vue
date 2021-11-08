<template>
  <div id="app">
    <div class="layout">
      <Layout class="main-layout">
        <Header>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <ArMenu/>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
              <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
              </Breadcrumb>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <router-view />
              </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
import ArMenu from '@/components/menu/ArMenu.vue';

export default {
  name: 'app',
  components: {
    ArMenu,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss" scoped>
.layout {
  position: relative;

  .main-layout {
    height: 100vh;

    .layout-logo{
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
    }
  }
}
</style>

# Auto Router Demo

#### 路由动态加载
1. 使用[Fast Mock](https://www.fastmock.site/#/)模拟接口数据
```
/* json数据 */
{
    "data": {
        "menuList": [{
            "type": "menu", // 类型，非末级菜单
            "path": "/vue", // 路由地址（有”/“代表从根开始）
            "name": "VueView",  // vue 文件名
            "title": "Vue 全家桶",  // 菜单展示的文字
            /* 子路由 */
            "children": [{
                "type": "link", // 类型，末级菜单（可以点击跳转的）
                "path": "index",
                "name": "Vue",
                "title": "Vue",
                "children": [{
                    "type": "operation",    // 类型，操作类型（按钮权限）
                    "symbol": "LinkVue" // 权限标识
                }]
            }, {
                "type": "link",
                "path": "vuex",
                "name": "Vuex",
                "title": "Vuex",
                "children": [{
                    "type": "operation",
                    "symbol": "LinkVuex"
                }]
            }]
        }]
    },
    "errmsg": "",
    "errcode": 0
}
```

2. 在路由守卫中判断并调用接口
```
/* src/router/index.js */
router.beforeEach((to, from, next) => {
    const { hasMenus } = store.getters; // 从vuex中获取菜单
    if (!hasMenus) {
        /* 菜单不存在，调用接口 */
        DemoAPI.getRoutes().then((res) => {
            const { data: { menuList } } = res;
            routeHandler.handleRoutes(menuList);    // 处理后端返回的数据
            store.commit('setMenus', menuList); // 调用vuex存储路由
            next({ ...to, replace: true });
        });
    } else {
        next();
    }
});
```

3. 使用[addRoute](https://router.vuejs.org/zh/api/#router-addroutes)添加路由
```
/* src/router/index.js */
/* 无父级路由 */
router.addRoute({
    path: tRoute.path,
    name: tRoute.name,
    component: routeMap[tRoute.name],
    children: [],
});
/* 有父级路由 */
router.addRoute(tParentName, {
    path: tRoute.path,
    name: tRoute.name,
    component: routeMap[tRoute.name],
    meta: {
        authorities: routeHandler.handleAuthorities(tRoute.children),   // 末级菜单设置meta，存储按钮权限数据
    },
});
```

#### 自定义指令
1. 创建[自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html#ad)
```
/* src/plugins/directive.js */
Vue.directive('permission', {
  inserted(el, binding) {
    const {
      history: {
        current: {
          meta: { authorities },
        },
      },
    } = router; // 获取当前路由meta中的权限数据
    const flag = binding.value;
    if (!authorities.includes(flag)) el.parentNode.removeChild(el); // 与入参对比，判断是否移除
  },
});
```

2. 使用自定义指令控制按钮级权限
```
/* .vue文件中 */
<template>
    <div class="vuex">
        <h1>Vuex</h1>
        <a v-permission="'LinkVuex'" href="">跳转</a>
    </div>
</template>
```
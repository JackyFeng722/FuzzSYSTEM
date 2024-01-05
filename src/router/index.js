import { createRouter,createWebHashHistory } from "vue-router"
const routes= [
  { 
    name:"App",
    path: '/', 
    redirect:'/home/demonstration' //重定向，访问一开始的根目录 
  },

  { 
    name:"首页",
    path: '/home',  
    component: ()=> import('../view/Home.vue'),
    redirect: "/home/demonstration",
    meta:{
      requireAuth:true
    },
    children:[ 
    {
      name:"实验展示",
      path: 'demonstration',
      component: ()=> import('../components/demonstration.vue'),
    },
    {
      name:"结果评估",
      path: 'result',
      component: ()=> import('../components/result.vue'),
    }, 



    {
      name:"时间",
      path:'time',
      component: ()=> import('../components/Time.vue')
    },
  

    {
      name:"制备模块",
      path: 'preparation',
      component: ()=> import('../components/preparation.vue'),
    },
    {
      name:"系统演示",
      path: 'preparation_3d',
      component: ()=> import('../components/preparation_3d.vue'),
    },
    {
      name:"质量评价模块",
      path: 'evaluate',
      component: ()=> import('../components/evaluate.vue'),
    },
    {
      name:"质量评价结果",
      path: 'evaluate_result',
      component: ()=> import('../components/evaluate_result.vue'),
    },

  ]
     
  },

  { 
 //vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: "/:pathMatch(.*)*",
    component: ()=> import('../view/NotFound.vue')
  }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})



//导出router
 export default  router
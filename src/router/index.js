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
    redirect: "/home/DatasetChoice",
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
      name:"质量评价结果",
      path: 'evaluate_result',
      component: ()=> import('../components/evaluate_result.vue'),
    },

    {
      name:"数据集选择界面",
      path: 'DatasetChoice',
      component: ()=> import('../components/DatasetChoice.vue'),
    },
    
    {
      name:"训练参数设置界面",
      path: 'TrainingSet',
      component: ()=> import('../components/TrainingSet.vue'),
    },
    {
      name:"生成策略和采样选择",
      path: 'GenerateSample',
      component: ()=> import('../components/GenerateSample.vue'),
    },

    {
      name:"测试用例生成界面",
      path: 'TestcaseGeneration',
      component: ()=> import('../components/TestcaseGeneration.vue'),
    },
    
    {
      name:"被测程序选择界面",
      path: 'ChoiceProject',
      component: ()=> import('../components/ChoiceProject.vue'),
    },
    {
      name:"覆盖率分析界面",
      path: 'CoverageAnalysis',
      component: ()=> import('../components/CoverageAnalysis.vue'),
    },
    
    {
      name:"漏洞分析界面",
      path: 'VulnerabilityAnalysis',
      component: ()=> import('../components/VulnerabilityAnalysis.vue'),
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
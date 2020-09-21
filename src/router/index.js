import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import one from '../components/onePage'
import two from '../components/twoPage'
import form from '../components/form'
import login from '../components/login'
import welcome from '../components/Welcome'
import adduser from "../components/adduser";
import deleteuser from "../components/deleteuser";
import modifyuser from "../components/modifyuser";
import addright from "../components/addright";
import deleteright from "../components/deleteright";
import modifyright from "../components/modifyright";
import information from "../components/wheelTakein/information";
import measure from "../components/wheelTakein/measure";
import noright from "../components/noright";
import appearanceInspection from "../components/bearingRepair/bearingRepair";
import bearingCap from "../components/bearingRepair/bearingCap";
import bearingTest from "../components/bearingRepair/bearingTest";
import bearingLoad from "../components/bearingRepair/bearingLoad";
import wheelRounding from "../components/wheelRound/wheelRounding";
import magneticInspection from "../components/ultrasonicInspection/magneticInspection";
import ultrasonicInspection from "../components/ultrasonicInspection/ultrasonicInspection";
import remeasure from "../components/wheelDispatch/remeasure";
import matching from  "../components/wheelDispatch/matching";
import wheel from "../components/manage/wheel";
import query from "../components/manage/query";
import monitor from "../components/manage/monitor";
import sheet from "../components/manage/sheet";
import dispatchCheck from "../components/quality/dispatchCheck";
import qualityProblems from "../components/quality/qualityProblems";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/test',
    name: 'About',
    component: About,
    children:[
      {
        path: '/test/one',
        name: 'one',
        component: one
      },
      {
        path: '/test/two',
        name: 'two',
        component: two
      }
    ]
  },
  {
        path: '/form',
        name:'form',
        component: form
  },
  {
    path: '/login',
    name:"login",
    component: login
  },
  {
    path: '/home',
    name:"home",
    component: Home,
    redirect:'/welcome',
    children: [
        //无权限跳转
      {
        path: '/noright',
        name:"noright",
        component: noright
      },
        //首页
      {
        path: '/welcome',
        name:"welcome",
        component: welcome
      },
        //用户管理
      {
        path: '/adduser',
        name:"adduser",
        component: adduser
      },
      {
        path: '/deleteuser',
        name:"deleteuser",
        component: deleteuser
      },
      {
        path: '/modifyuser',
        name:"modifyuser",
        component: modifyuser
      },
        //权限管理
      {
        path: '/addAuthority',
        name:"addAuthority",
        component: addright
      },
      {
        path: '/deleteAuthority',
        name:"deleteAuthority",
        component: deleteright
      },
      {
        path: '/modifyAuthority',
        name:"modifyAuthority",
        component: modifyright
      },
        //轮对收入
      {
        path: '/information',
        name:"information",
        component: information
      },
      {
        path: '/measure',
        name:"measure",
        component: measure
      },
      //轴承检修
      {
        path: '/appearanceInspection',
        name:"appearanceInspection",
        component: appearanceInspection
      },
      {
        path: '/load',
        name:"load",
        component: bearingLoad
      },
      {
        path: '/capping',
        name:"capping",
        component: bearingCap
      },
      {
        path: '/rollTest',
        name:"rollTest",
        component: bearingTest
      },
        //旋面
      {
        path: '/wheelRounding',
        name: 'wheelRounding',
        component: wheelRounding
      },
      //探伤
      {
        path: '/magneticInspection',
        name:'magneticInspection',
        component: magneticInspection
      },
        //轮对支出
      {
        path: '/ultrasonicInspection',
        name:'ultrasonicInspection',
        component: ultrasonicInspection
      },
      {
        path: '/remeasure',
        name: 'remeasure',
        component: remeasure
      },
      {
        path: '/matching',
        name: 'matching',
        component: matching
      },
        //综合管理
      {
        path: '/query',
        name: 'query',
        component: query
      },
      {
        path: '/wheel',
        name: 'wheel',
        component: wheel
      },
      {
        path: '/monitor',
        name: 'monitor',
        component: monitor
      },
      {
        path: '/sheet',
        name: 'sheet',
        component: sheet
      },
      //质检验收
      {
        path: '/qualityInspection',
        name: 'qualityInspection',
        component: dispatchCheck
      },
      {
        path: '/qualityFeedback',
        name: 'qualityProblems',
        component: qualityProblems
      }
    ]
  }
]

const router = new VueRouter({
//  mode: 'history',
  routes:routes
})
//登录验证
var baseright = ['/home','/welcome','/noright'];
var rightMap;
router.beforeEach((to,from,next)=>{
    if (to.path == '/login') return next();
    var token = sessionStorage.getItem("logintoken");
    if (!token) return next('/login');
    if (rightMap == null){
      rightMap = JSON.parse(sessionStorage.getItem("subrights"));
      var tmp = JSON.parse(sessionStorage.getItem("rights"));
      rightMap = rightMap.concat(tmp,baseright);
    }
    if (!rightMap.includes(to.path)) return next('/noright');
    next();
})

export default router

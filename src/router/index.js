import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/components/Login')
const Home = () => import('@/components/Home')
const Find = () => import('@/components/Find/Find')
const Leaderboard = () => import('@/components/Leaderboard/Leaderboard')
const SongList = () => import('@/components/SongList/SongList')
const Singer = () => import('@/components/Singer/Singer')
const Mv = () => import('@/components/MV/Mv')
const User = () => import('@/components/User/User')
const Search = () => import('@/components/Serach/Search')
const SongDetails = () => import('@/components/SongDetails/SongDetails')
const VideoDetails = () => import('@/components/Video/MvDeatils')
Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/find'
  }, {
    path: '/home/',
    name: 'home',
    redirect: '/find'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home,
    children: [
      // 发现页
      {
        path: '/find',
        component: Find
      },
      // 排行榜页
      {
        path: '/leaderboard',
        component: Leaderboard
      },
      // 歌单页
      {
        path: '/songlist',
        component: SongList
      },
      // 歌手页
      {
        path: '/singer',
        component: Singer
      },
      // Mv页
      {
        path: '/mv',
        component: Mv
      },
      // 用户页
      {
        path: '/user',
        component: User
      },
      // 搜索页
      {
        path: '/search',
        component: Search
      },
      // 歌曲详情
      {
        path: '/songDetails',
        component: SongDetails
      },
      // 视频详情
      {
        path: '/videoDeatils',
        component: VideoDetails
      }
    ]
  }]
})
const vm = new Vue()
// // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 代表将要访问路径
  // from 代表从那个路径跳转而来
  // next 是一个函数，表示放行
  if (to.path === '/user') {
    if (window.sessionStorage.getItem('userInfo') && window.sessionStorage.getItem('token')) {
      return next()
    } else {
      vm.$message.error('请登录')
      return next('/login')
    }
  }
  next()
})

export default router

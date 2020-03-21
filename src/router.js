import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: () =>
        import(/* webpackChunkName: "event-list" */ './views/EventList.vue'),
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: () =>
        import(/* webpackChunkName: "event-create" */ './views/EventCreate.vue')
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: () =>
        import(/* webpackChunkName: "event-show" */ './views/EventShow.vue'),
      props: true,
      // 等待取得資料後才進入此畫面
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(() => next(false))
      }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

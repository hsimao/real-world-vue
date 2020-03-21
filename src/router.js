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
          .catch(error => {
            if (error.response && error.response.status === 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "NotFound" */ './views/NotFound.vue'),
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      /* eslint-disable */
      component: () =>
        import(
          /* webpackChunkName: "NetworkIssue" */ './views/NetworkIssue.vue'
        )
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
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

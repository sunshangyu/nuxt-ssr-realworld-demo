import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8733cac4 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _abb53d5a = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _ca81dd16 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _7f314e96 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _4937dd5c = () => interopDefault(import('..\\pages\\setting' /* webpackChunkName: "" */))
const _abb84b04 = () => interopDefault(import('..\\pages\\edit' /* webpackChunkName: "" */))
const _b19cc7fc = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _8733cac4,
    children: [{
      path: "",
      component: _abb53d5a,
      name: "Home"
    }, {
      path: "/login",
      component: _ca81dd16,
      name: "login"
    }, {
      path: "/register",
      component: _ca81dd16,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _7f314e96,
      name: "profile"
    }, {
      path: "/setting",
      component: _4937dd5c,
      name: "setting"
    }, {
      path: "/edit",
      component: _abb84b04,
      name: "edit"
    }, {
      path: "/article/:slug",
      component: _b19cc7fc,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

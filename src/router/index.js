import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'

import Ad from '@/pages/ad/ad'
import AdAdd from '@/pages/ad/adAdd'
import AdList from '@/pages/ad/adList'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/ad',
      redirect: '/ad/adList'
    },
    {
      path: '/index',
      name: 'Home',
      component: Home
    },
    {
      path: '/ad',
      component: Ad,
      children: [{
          path: 'adList',
          name: 'adList',
          component: AdList
        },
        {
          path: 'adAdd',
          name: 'adAdd',
          component: AdAdd
        }
      ]

    }
  ]
})

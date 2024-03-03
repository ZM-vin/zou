import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/LayoutPage.vue'),
      redirect: '/first',
      children: [
        {
          path: '/first',
          component: () => import('@/views/FirstPage.vue')
        },
        {
          path: '/user',
          component: () => import('@/views/UserPage.vue'),
          redirect: '/user/myarticle',
          children: [
            {
              path: '/user/myarticle',
              component: () => import('@/views/MyArticle.vue')
            },
            {
              path: '/user/mylike',
              component: () => import('@/views/MyLike.vue') 
            }
          ]
        },
        {
          path: '/user/settinguser',
          component: () => import('@/views/SettingUser.vue'),
          redirect: '/user/settinguser/detail',
          children: [
            {
              path: '/user/settinguser/detail',
              component: () => import('@/views/UserDetail.vue')
            },
            {
              path: '/user/settinguser/editor',
              component: () => import('@/views/UserEditor.vue')
            }
          ]
        },
        {
          path: '/article/detail',
          component: () => import('@/views/ArticleDetail.vue')
        }
      ]
    },
    {
      path: '/article',
      component: () => import('@/views/ArticlePage.vue')
    }
  ]
})

export default router

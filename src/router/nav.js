

export default [
  {
    path:'/',
    redux: [],
    component: ()=> import('../layouts/basic'),
    children: [
      {
        path: '/home',
        redux: [],
        component: ()=> import('../pages/home')
      },
      {
        path: '/space',
        redux: [],
        component: ()=> import('../pages/space')
      },
      {
        path: '/time',
        redux: [],
        component: ()=> import('../pages/time')
      },
      {
        path: '/user',
        redux: [],
        component: ()=> import('../pages/user')
      }
    ]
  }
] 
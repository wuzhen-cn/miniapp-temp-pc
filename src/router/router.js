import demo from './demo'

const routes = [
	{
		path: '/',
		redirect: '/baseInfo'
	}, {
		path: '/home',
		name: 'home',
		meta: {
			title: '首页',
			requireLogin: false
		},
		component: () => import('@/view/home.vue')
	},
	...demo
]

export default routes

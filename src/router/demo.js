const demo = [{
    path: '/baseInfo',
    name: 'baseInfo',
    meta: {
        title: '基本信息',
        requireLogin: false
    },
    component: () => import('@/view/demo/baseInfo.vue')
}, {
    path: '/busiInfo',
    name: 'busiInfo',
    meta: {
        title: '业务表单',
        requireLogin: false
    },
    component: () => import('@/view/demo/busiInfo.vue')
}, {
    path: '/materials',
    name: 'materials',
    meta: {
        title: '上传材料',
        requireLogin: false
    },
    component: () => import('@/view/demo/materials.vue')
}, {
    path: '/postInfo',
    name: 'postInfo',
    meta: {
        title: '邮寄信息',
        requireLogin: false
    },
    component: () => import('@/view/demo/postInfo.vue')
}, {
    path: '/success',
    name: 'success',
    meta: {
        title: '成功页',
        requireLogin: false
    },
    component: () => import('@/view/demo/success.vue')
}]

export default demo

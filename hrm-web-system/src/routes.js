import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Department from './views/itsource/department.vue'
import TenantType from './views/sysmanage/tenantType.vue'
import Tenant from './views/sysmanage/tenant.vue'
import staticPageInit from './views/sysmanage/staticPageInit.vue'
import CourseType from './views/course/CourseType.vue'
import Pager from './views/page/Pager.vue'
import Role from './views/itsource/role.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import Course from './views/course/Course.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '首页',
        leaf: true,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '组织机构管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/department', component: Department, name: '部门管理' },
            { path: '/role', component: Role, name: '角色管理' }
        ]
    }
    ,
    {
        path: '/',
        component: Home,
        name: '页面中心',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/site', component: Pager, name: '站点管理' },
            { path: '/pager', component: Pager, name: '页面管理' },
            { path: '/pageConfig', component: Pager, name: '页面配置管理' }
        ]
    }
    ,
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/tenantType', component: TenantType, name: '机构类型'},
            { path: '/tenant', component: Tenant, name: '机构管理' },
            { path: '/form', component: Form, name: '员工管理' },
            { path: '/user', component: user, name: '部门' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '课程中心',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/courseType', component: CourseType, name: '课程类型' },
            { path: '/course', component: Course, name: '课程管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,
        children: [
            { path: '/staticPageInit', component: staticPageInit, name: '静态化页面初始化' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
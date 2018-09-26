// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Datepicker from 'vuejs-datepicker'

import {store} from "./store";
import App from './App'

import ListMass from './components/Mass/List'
import EditMass from './components/Mass/Edit'
import AddMass from './components/Mass/Add'
import ListChurch from './components/Church/List'

import '../node_modules/nprogress/nprogress.css'
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/material-design-icons/iconfont/material-icons.css'


Vue.use(VueFire);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
    {
        name: 'List',
        path: '/',
        component: ListMass
    },
    {
        name: 'Add',
        path: '/add',
        component: AddMass
    },
    {
        name: 'Edit',
        path: '/edit/:id',
        component: EditMass,
        props: true
    },
    {
        name: 'Churches',
        path: '/churches',
        component: ListChurch
    }
];

const router = new VueRouter({ mode: 'history', routes: routes, linkExactActiveClass: "active"});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
});


import '../node_modules/materialize-css/dist/js/materialize.min.js';

new Vue({
    el: '#app',
    components: { App, Datepicker },
    template: '<App/>',
    router,
    store
});

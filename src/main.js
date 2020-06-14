// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import {Form, FormItem, Input,
//   Button, Message, Main, Container,
//   Aside, Header, Row, Col, Menu, MenuItem,
//   Submenu,
//   Breadcrumb,
//   BreadcrumbItem,
//   Card,
//   TableColumn, Table, Switch, Pagination, Dialog,
//   MessageBox} from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import MyServerHttp from './plugins/http'
import moment from 'moment'

Vue.config.productionTip = false
// Vue.prototype.$message = Message

Vue.use(MyServerHttp)
Vue.use(ElementUI)
// Vue.use(Pagination)
// Vue.use(MessageBox)
// Vue.use(Dialog)
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Button)
// Vue.use(Main)
// Vue.use(Aside)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Col)
// Vue.use(Row)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Switch)

// 全局过滤器 - 处理日期
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import RegistroInsumo  from '@/components/RegistroInsumo'
import RegistroProveedor from '@/components/RegistroProveedor'
import MostrarInsumo from '@/components/MostrarInsumo'
import DetalleCompra from '@/components/DetalleCompra'
import MostrarOrden from '@/components/MostrarOrden'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      	path: '/',
      	name: 'Login',
      	component: Login

    },
    {
    	  path: '/login',
      	name: 'Login',
      	component: Login
    },
    {
      path:'/registro-insumo',
      name: 'RegistroInsumo',
      component:RegistroInsumo
    },
    {
      path:'/registro-proveedor',
      name: 'RegistroProveedor',
      component:RegistroProveedor
    },
    {
      path:'/mostrar-insumo',
      name: 'MostrarInsumo',
      component:MostrarInsumo
    },
    {
      path:'/detalle-compra',
      name: 'DetalleCompra',
      component:DetalleCompra
    },
    {
      path:'/mostrar-orden',
      name: 'MostrarOrden',
      component:MostrarOrden
    }
  ]
})

export default router

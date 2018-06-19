import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import RegistroInsumo  from '@/components/RegistroInsumo'
import RegistroProveedor from '@/components/RegistroProveedor'
import MostrarInsumo from '@/components/MostrarInsumo'
import DetalleCompra from '@/components/DetalleCompra'
import MostrarOrden from '@/components/MostrarOrden'
import ModificarInsumo from '@/components/ModificarInsumo'
import RegistroUsuario from '@/components/RegistroUsuario'
import MostrarOrdenAlmacen from '@/components/MostrarOrdenAlmacen'
import DetalleCompraA from '@/components/DetalleCompraA'
import RegistroProducto from '@/components/RegistroProducto'
import MostrarProducto from '@/components/MostrarProducto'

Vue.use(Router)

const router = new Router({
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
      path:'/modificar-insumo',
      name: 'ModificarInsumo',
      component:ModificarInsumo
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
    },
    {
      path:'/registro-usuario',
      name: 'RegistroUsuario',
      component:RegistroUsuario
    },
    {
      path:'/mostrar-ordenAlmacen',
      name: 'MostrarOrdenAlmacen',
      component:MostrarOrdenAlmacen
    },
    {
      path:'/detalle-compraA',
      name: 'DetalleCompraA',
      component:DetalleCompraA
    },
    {
      path:'/registro-producto',
      name: 'RegistroProducto',
      component:RegistroProducto
    },
    {
      path:'/mostrar-producto',
      name:'MostrarProducto',
      component:MostrarProducto
    }
  ]
})

export default router

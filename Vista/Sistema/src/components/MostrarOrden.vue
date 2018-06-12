<template>

<div v-if ="User!=null">
     <div class="container">
<div class="columns">
    <div class="column"></div>
    <div class="column">
    <h5 class="title is-5">Ordenes de Compra</h5> 
    </div>
    <div class="column"></div>
</div>
</div>


<div class="container">

  <div class="columns">
    <div class="column"></div>
    <div class="column is-four-fifths">

      <table class="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th title="RFC_Prov">RFC Provedor</th>
            <th title="id_orden">No. de orden</th>
            <th title="Fecha_compra">Fecha de compra</th>
            <th title="Total">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr class=" hoverable" v-for="compra in compras">
                  <td v-on:click="routerLinkToDetails">{{compra.ProveedoreRfcProveedor}}</td>
                  <td>{{compra.No_compra}}</td>
                  <td>{{compra.Fecha_compra}}</td>
                  <td>{{compra.Total}}</td>
                </tr>
        </tbody>

      </table>      
    </div>
    <div class="column"></div>
  </div>
</div>
</div>
<div v-else>
  <br>
  <h1>No se ha iniciado sesión</h1>
  <router-link :to="{name: 'Login'}">Inicia sesión</router-link>
</div>

</template>

<script>
  import{GLOBAL} from '../Servicios/Global'
  export default {
    data(){
      return{
        compras:{},
        User:''
      }
    },
    created: function(){
      this.User=localStorage.getItem('UsuarioLogueado')
      if(this.User!=null){
        this.consultar()
      }

    },
    methods:{
        consultar(){
        let uri = GLOBAL.url 
        var conexion=uri+'mostrar-orden'
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          
          console.log(response.data)
          this.compras=response.data
          
        })
        .catch((err)=>{
           alert("No se encontraron productos")
        })
      },
      routerLinkToDetails() {
    this.$router.push({ path: '/detalle-compra' });
     }
    }
  }
</script>

<style>
    body {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }

    main {
      flex: 1 0 auto;
    }

    body {
      background: #fff;
    }

    .input-field input[type=text]:focus + label {
      color: #e91e63;
    }

    .input-field input[type=text]:focus, {
      border-bottom: 2px solid #e91e63;
      box-shadow: none;
    }
  </style>
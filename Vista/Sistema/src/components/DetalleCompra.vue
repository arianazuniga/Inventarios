<template>
<div v-if ="User!=null">
<div class="container">
<div class="columns">
    <div class="column"></div>
    <div class="column">
    <h5 class="title is-4">Detalles de orden de compra</h5>
    <br>
    </div>
    <div class="column"></div>
</div>
</div>
<div class="container">
<div class="columns">
    <div class="column">
      <h5 class="title is-5">Detalles del proveedor</h5>
    </div>
</div>
</div>


<div class="container">
<div class="columns">
    <div class="column">
      <div class="field">
      <label class="label">RFC del proveedor</label>
      <div class="control">
        <input class="input" type="text" disabled=true v-model="compras.ProveedoreRfcProveedor">
      </div>
    </div>

    </div>
    <div class="column">
      <div class="field">
      <label class="label">Razón Social</label>
      <div class="control">
        <input class="input" type="text" disabled=true v-model="compras.Proveedore.Razon_social">
      </div>
    </div>
 
    </div>
    <div class="column">
       <div class="field">
       <label class="label">No. de Compra</label>
        <div class="control">
       <input class="input" type="text" disabled=true v-model="compras.No_compra">
        </div>
      </div>
    </div>
</div>


<div class="columns">
    <div class="column">
      <div class="field">
      <label class="label">Fecha de compra</label>
      <div class="control">
        <input class="input" type="text" disabled=true v-model="compras.Fecha_compra">
      </div>
    </div>
 
    </div>
    <div class="column">
      <div class="field">
      <label class="label">Fecha de entrega</label>
      <div class="control">
      <input class="input" type="text" disabled=true v-model="compras.Fecha_entrega">
      </div>
      </div>
  
      </div>
      <div class="column">
      <div class="field">
      <label class="label">Subtotal</label>
      <div class="control">
      <input class="input" type="text" disabled=true v-model="compras.Subtotal">
      </div>
      </div>
     
      </div>
</div>

<div class="columns">
    <div class="column">
    <div class="field">
      <label class="label">IVA</label>
      <div class="control">
        <input class="input" type="text" disabled=true v-model="compras.Iva">
      </div>
    </div>
    </div>
  
    <div class="column">
      <div class="field">
      <label class="label">Total</label>
      <div class="control">
      <input class="input" type="text" disabled=true v-model="compras.Total">
      </div>
      </div>
      </div>
</div>
</div>


<div class="container">
<div class="columns">
    <div class="column">
      <h5 class="title is-5">Lista de detalles de compra</h5>
    </div>
</div>
</div>

<div class="container">

  <div class="columns">
    <div class="column"></div>
    <div class="column is-four-fifths">

      <table class="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th title="Id_insumo">Id insumo</th>
            <th title="Nombre_insumo">Nombre del insumo</th>
            <th title="Color_insumo">Color del insumo</th>
            <th title="Cantidad">Cantidad</th>
            <th title="Unidad_medida">Unidad de medida</th>
          </tr>
        </thead>
        <tbody>
         <tr v-for="compra in compras">
          <td v-for="co in compras">{{co.Cantidad}}</td>

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
        User:'',
        id:'C001',
        compras:{}
      }
    },
    created: function(){
      this.User=localStorage.getItem('UsuarioLogueado')
      if(this.User!=null){
       this.consultarD()
      }

    },
    methods:{
      consultarD(){
        let uri = GLOBAL.url 
        var conexion=uri+'compras/'+this.id
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          
          this.compras=response.data[0]
          console.log(response.data)
          
        })
        .catch((err)=>{
           alert("No se encontraron productos")
        })
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
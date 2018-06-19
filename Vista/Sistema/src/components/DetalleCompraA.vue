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
        <input class="input" type="text" disabled=true v-model="datosProveedor.Razon_social">
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
        <input class="input" type="text" disabled=true v-model="compras.Iva" >
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
         <tr v-for="compra in compras.Detalle_Compras">
         <td v-for="(itemInSaleDetail, key, index ) in compra"  
                  v-if="key=='Insumo'" >
                  {{itemInSaleDetail.Id_insumo}}
                </td>
          <td v-for="(itemInSaleDetail, key, index ) in compra"  
                  v-if="key=='Insumo'" >
                  {{itemInSaleDetail.Nombre}}
                </td>
                <td v-for="(itemInSaleDetail, key, index ) in compra"  
                  v-if="key=='Insumo'" >
                  {{itemInSaleDetail.Color}}
                </td>
                <td>
                  {{compra.Cantidad}}
                </td>
                <td v-for="(itemInSaleDetail, key, index ) in compra"  
                  v-if="key=='Insumo'" >
                  {{itemInSaleDetail.Unidad_medida}}
                </td>
         </tr>
        </tbody>
      </table>
    </div>
    <div class="column"></div>
  </div>
</div>

<div class="container" id="app">
  <div class="modal" v-bind:class="[active]">
    <div class="modal-background"></div>
    <div class="modal-content">

      <div class="column">
      <div class="column is-four-fifths">
        <div class="control">
          <label class="label has-text-white" >Ingresa tu contraseña para poder aprobar la orden</label>
          <label class="label has-text-white" >Contraseña Usuario</label>
          <input class="input" type="password" id="contrasenia" />
           <p>
            <button class='button is-link is-rigth' id="showModal" v-on:click="validarU">Aceptar</button>
          </p>
           </div>
         </div>
       </div>
    </div>
    <button class="modal-close"></button>
  </div>
</div>


<div class="container">
<div class="columns">
    <div class='column is-two-fifths'></div>
    <div>
      <br>
      <br>
      <button type='submit' id='btn_registro_insumo' class='button is-primary is-medium' v-on:click="activar">Aprobar</button>
      <br>
      <br>
      </div>
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
        id:'',
        status:'true',
        compras:{},
        datosProveedor:{},
        active:''
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
        var conexion=uri+'compras/'+ this.$route.params.id
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          this.compras=response.data[0]
          this.datosProveedor=response.data[0].Proveedore
          if(this.compras.Aprobado){
            document.getElementById('btn_registro_insumo').disabled=true
          } 

        })
        .catch((err)=>{
           alert("No se encontraron productos")
        })

        if(this.compras.Aprobado){
            document.getElementById('btn_registro_insumo').disabled=true
        }
      },
      aprobar(){
        
        let uri = GLOBAL.url 
        var conexion=uri+'aprobar-ordenA/'+ this.$route.params.id+'/'+this.status
        this.axios.put(conexion,'', {headers: {authorization:localStorage.getItem('token')}})
        .then((response)=>{
          document.getElementById('btn_registro_insumo').disabled=true
          alert('Aprobada')
          //this.active=''
        })
        .catch((err)=>{
          console.log(err)
           alert("Error al aprobar orden")

        })
      },
      validarU(){
        var usuarios={}
        let uri = GLOBAL.url
        var conexion= uri+'login'
        var usuario=JSON.parse(localStorage.getItem('UsuarioLogueado'))
        var contrasenia=document.getElementById('contrasenia').value
        console.log(usuario.Rfc_usuario)
        console.log(contrasenia)
        usuarios.Rfc_usuario=usuario.Rfc_usuario
        usuarios.Contrasenia=contrasenia
        console.log(usuarios)
       this.axios.post(conexion,usuarios)
       .then((response)=>{
       this.active=''
       this.aprobar()       
      })
      .catch((err)=>{
        alert(err)
      })
       },
       activar(){
        this.active='is-active'
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
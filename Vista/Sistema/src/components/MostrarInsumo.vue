<template>
<div class="columns">
<div v-if ="User!=null">
      <br>
      <div class="columns">
        <div class="column"></div>
        <div class="column is-two-fifths">
          <h5 class="is-size-1">Consulta de insumos</h5>
        </div>
        <div class="column"></div>
      </div>
      <br>
      <div class="columns">
        <div class="column">
            <div class="field">
              <label class="label">Id Insumo</label>
              <div class="control">
                <input class="input" id="Id_insumo" type="text" v-on:keyup="buscarInsumo" v-model="id">
              </div>
            </div>
          </div>
        <div class="column is-three-fifths"></div>
      </div>

      <div class="container"> 
            <table class=" table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th scope="col">Id Insumo</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Color</th>
                  <th scope="col">Unidad</th>
                  <th scope="col">Estante</th>
                  <th scope="col">Valor Horizontal</th>
                  <th scope="col">Valor Vertical</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Punto de reorden</th>
                </tr>
              </thead>

              <tbody>
                <tr class=" hoverable" v-for="insumo in insumos">
                  <td><router-link :to="{name:'ModificarInsumo', params:{id: insumo.Id_insumo}}"> {{insumo.Id_insumo}}</router-link></td>
                  <td>{{insumo.Nombre}}</td>
                  <td>{{insumo.Color}}</td>
                  <td>{{insumo.Unidad_medida}}</td>
                  <td>{{insumo.Estante}}</td>
                  <td>{{insumo.Valor_Horizontal}}</td>
                  <td>{{insumo.Valor_Vertical}}</td>
                  <td>{{insumo.Stock}}</td>
                  <td>{{insumo.Punto_Reorden}}</td>
                </tr>
              </tbody>
            </table>
      </div>
      <div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      hhhhhhh
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">Save changes</button>
      <button class="button">Cancel</button>
    </footer>
  </div>
</div>
</div>
<div v-else>
  <br>
  <h1>No se ha iniciado sesión</h1>
  <router-link :to="{name: 'Login'}">Inicia sesión</router-link>
</div>
</div>
</template>

<script>
  import{GLOBAL} from '../Servicios/Global'
  export default {
    data(){
      return{
        insumos:{},
        User:'',
        id:''
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
        var conexion=uri+'mostrar-insumo'
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          
          this.insumos=response.data
          
        })
        .catch((err)=>{
           alert("No se encontraron productos")
        })
      },

      buscarInsumo(){
        let uri = GLOBAL.url 
        var conexion=uri+'mostrar-insumo/'+this.id
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
            this.insumos=response.data
            if(this.insumos=='')
            {
              alert("No se encontraron productos")
            }
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
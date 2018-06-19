<template>
<div class="columns">
<div v-if ="User!=null">
<div class="column"></div>
<div class="container">
<div class="columns">
    <div class="column"></div>
    <div class="column">
    <h5 class="title is-5">Catalogo de productos</h5>
    <br>
    </div>
    <div class="column"></div>
    </div>
    </div>

<div class="container">
<div class="column is-one-fifth" >
  <div class="card">
    <div class="card-image">
    <figure class="image ">
    <img src="https://www.bigbanguniforms.com/181-home_default/camisa-azul-blusa-azul.jpg" alt="Placeholder image">
    </figure>
    </div>
    <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://www.bigbanguniforms.com/181-home_default/camisa-azul-blusa-azul.jpg" alt="Placeholder image">
        </figure>
      </div>


<div class="media-content">
        <p class="title is-4"></p>
        <p class="subtitle is-6"></p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing

 elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>


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
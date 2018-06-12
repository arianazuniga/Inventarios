<template>
  <div class="columns">
   <div class="column"></div>
    <div class="column is-three-fifths">
     <br>
    <h1 class="is-size-1">Login</h1>
    <br>
    <br>
    <form  v-on:submit.prevent="login">
      <div class="column is-two-fifths">
        <div class="control">
        <label class="label">RFC usuario</label>
        <input class="input" type='text' placeholder="RFC" name='usuario' v-model="usuario.Rfc_usuario" id='usuario' pattern="^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))" required />
      </div>
      </div>
      <div class="column is-two-fifths">
        <div class="control">
          <label class="label">Contraseña Usuario</label>
          <input class="input" type='password' placeholder="Contraseña" name='password' v-model="usuario.Contrasenia" id='password' required />
           </div>
         </div>
        <br>
        <div class="column is-two-fifths">
         <div class="column">
          <div class='control'>
            <button type='submit'  class='button is-primary is-rigth'>Aceptar</button>
           </div>
         </div>
        </div>
               
    </form>
    </div>
  </div>
</template>

<script>
import{GLOBAL} from '../Servicios/Global'
import router from './../router'
export default {
  data () {

    return {
     usuario:{}
   }

  },
  created: function(){
      localStorage.clean()

    },
  methods: {
    login(){
      let uri = GLOBAL.url 
      var conexion= uri+'login'
      this.axios.post(conexion,this.usuario)
      .then((response)=>{
        var usuarioResponse= response.data.usuario
        localStorage.setItem('UsuarioLogueado',JSON.stringify(usuarioResponse))

        this.usuario.gethash=true
        
        this.axios.post(conexion,this.usuario)
        .then((response)=>{
          localStorage.setItem('token',response.data.token)
          router.replace('mostrar-insumo')
        })        
      })
      .catch((err)=>{
        alert(err)
      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
  .contenido {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }

    main {
      flex: 1 0 auto;
    }

    .contenido {
      background: #fff;
    }

    .input-field input[type=date]:focus + label
    .input-field input[type=text]:focus + label,
    .input-field input[type=email]:focus + label,
    .input-field input[type=password]:focus + label {
      color: #e91e63;
    }

    .input-field input[type=date]:focus,
    .input-field input[type=text]:focus,
    .input-field input[type=email]:focus,
    .input-field input[type=password]:focus {
      border-bottom: 2px solid #e91e63;
      box-shadow: none;
    }
</style>

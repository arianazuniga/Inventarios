<template>
 <div class="columns" v-if="User!=null">
   <div class="column"></div>
    <div class="column is-three-fifths">
     <br>
    <h1 class="is-size-1">Registro Usuario</h1>
    <br>
    <br>
    <form  v-on:submit.prevent="validateBeforeSubmit()" @submit.prevent="limpiar">
      <div class="column is-two-fifths">
        <div class="control">
        <label class="label">RFC usuario</label>
        <input class="input" type='text' placeholder="RFC" @keyup="verificarRfc" name='usuario'id='usuario' pattern="^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))" required v-model="usuario.Rfc_usuario">
         <span v-show="this.rfcUnique" class="help is-danger">El RFC ya está registrado</span>
      </div>
      </div>

       <div class="field">
                <label class="label">Rol</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="usuario.Rol" required>
                        <option value="" disabled selected>Rol</option>
                        <option>Administrador</option>
                        <option>Supervisor de Almacen</option>
                        <option>Supervisor de Almacen Productos Terminados</option>
                        <option>Empleado de Almacen</option>
                        <option>Empleado de Ventas </option>
                        <option>Gerente de Compras</option> 
                    </select>    
                  </div>
                </div>
    </div>

      <div class="column is-two-fifths">
        <div class="control">
          <label class="label">Contraseña</label>
           <input v-validate="'required'" name="password" type="password" class="input" placeholder="Contraseña" v-model="usuario.Contrasenia">
           </div>
      </div>
       
        <div class="column is-two-fifths">
        <div class="control">
          <label class="label">Confirmar Contraseña</label>
          <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password" class="input" placeholder="Confirmar Contraseña" data-vv-as="password">
         </div>
       </div>

       <div class="alert alert-danger" v-show="errors.any()">
    <div v-if="errors.has('password')">
      {{ errors.first('password') }}
    </div>
    <div v-if="errors.has('password_confirmation')">
      {{ errors.first('password_confirmation') }}
    </div>
  </div>
        <div class="column is-two-fifths">
         <div class="column">
          <div class='control'>
            <button type='submit'class='button is-primary is-rigth' id="btn-registrar">Registrar</button>
               
           </div>
         </div>
        </div>        
    </form>
    </div>
    <div class="column"></div>
  </div>
 <div v-else>
     <h1>No se ha iniciado sesión</h1>
      <router-link :to="{name: 'Login'}">Inicia sesión</router-link>
    </div>

</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import{GLOBAL} from '../Servicios/Global'
import router from './../router'

export default {
  data () {

    return {
     usuario:{},
     User:'',
     rfcUnique:'',
   }

  },
  created: function(){
      this.User=localStorage.getItem('UsuarioLogueado')
      if(this.User!=null){
      }

    },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((response)=>{
          this.agregarInsumo()
        })
        .catch(function(e) {
          alert(e)
        })
    },
    agregarInsumo(){
        let uri = GLOBAL.url 
        this.axios.post(uri+'registro-usuario', this.usuario, {headers: {authorization: localStorage.getItem('token')}})
        .then((response) => {
                    
            alert("Usuario "+ this.usuario.Rfc_usuario+" registrado")
            this.usuario={}
            
        })
        .catch((err)=>{
          alert('Error');
          this.usuario={}

        })
    },
    verificarRfc(){
        let uri = GLOBAL.url
        let rfc = this.usuario.Rfc_usuario
        var conexion=uri+'verificar-usuario/'+ rfc
        console.log(conexion)
        var boton = document.getElementById('btn-registrar');
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
          .then((response)=>{
            document.getElementById("btn-registrar").disabled=true;
            this.rfcUnique=true
          })
          .catch((err)=>{
            document.getElementById("btn-registrar").disabled=false;
            this.rfcUnique=false
          })
      },
    limpiar: function(event) {
      
      event.target.reset();
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
<template>

   <div v-if="User!=null" class="columns is-multiline is-mobile">
    <br>

      <div class="column is-two-quarter-quarter"></div>
      <div class="column is-one-quarter">
          <br>
          <div class="column is-two-quarter">
            <h1 class="is-size-1">Registro de proveedores</h1>
          </div>
          
          <br>
          <form v-on:submit.prevent=agregarProveedor @submit.prevent="limpiar">
            <div class="field">
              <label class="label">RFC proveedor</label>
              <div class="control">
                <input  type="text" id="rfc_proveedor" class="input" v-model="proveedor.Rfc_proveedor" pattern="^([A-ZÑ a-zñ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$" v-on:keyup="validarExistencia" required name="rfc">
                <span v-show="this.rfcRegistrado" class="help is-danger">RFC ya se encuentra registrado</span>
              </div>
             </div>

            <div class="field">
             <label class="label">Razon social</label>
             <div class="control">
              <input  type="text" class="input" v-model="proveedor.Razon_social" required>
             </div>
            </div>

            <div class="field">
             <label class="label">E-mail</label>
             <div class="control">
              <input  type="email" id="email_proveedor"class="input" v-model="proveedor.Email" v-on:keyup="validarCorreo" required>
              <span v-show="this.correoRegistrado" class="help is-danger">E-mail ya se encuentra registrado</span>
             </div>
            </div>

            <div class="field">
             <label class="label">Calle </label>
             <div class="control">
              <input type="text" class="input" v-model="proveedor.Calle" required>
             </div>
            </div>

             <div class="field">
             <label class="label">Telefono </label>
             <div class="control">
              <input  type="tel" class="input" v-model="proveedor.Telefono" placeholder="Incluir lada" required pattern="^\d{10}$">
             </div>
            </div>

            <div class="field">
             <label class="label">Colonia </label>
             <div class="control">
              <input type="text" class="input" v-model="proveedor.Colonia" required>
             </div>
            </div>

            <div class="field">
                <label class="label">Ciudad</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="proveedor.Ciudad" required>
                        <option value="" disabled selected>Ciudad</option>
                         <option value="1">Aguascalientes</option>
                         <option value="2">Baja California</option>
                         <option value="3">Baja California Sur</option>
                         <option value="4">Campeche</option>
                         <option value="5">Coahuila de Zaragoza</option>
                         <option value="6">Colima</option>
                         <option value="7">Chiapas</option>
                         <option value="8">Chihuahua</option>
                         <option value="9">CDMX</option>
                         <option value="10">Durango</option>
                         <option value="11">Guanajuato</option>
                         <option value="12">Guerrero</option>
                         <option value="13">Hidalgo</option>
                         <option value="14">Jalisco</option>
                         <option value="15">Estado de México</option>
                         <option value="16">Michoacán de Ocampo</option>
                         <option value="17">Morelos</option>
                         <option value="18">Nayarit</option>
                         <option value="19">Nuevo León</option>
                         <option value="20">Oaxaca</option>
                         <option value="21">Puebla</option>
                         <option value="22">Querétaro</option>
                         <option value="23">Quintana Roo</option>
                         <option value="24">San Luis Potosí</option>
                         <option value="25">Sinaloa</option>
                         <option value="26">Sonora</option>
                         <option value="27">Tabasco</option>
                         <option value="28">Tamaulipas</option>
                         <option value="29">Tlaxcala</option>
                         <option value="30">Veracruz de Ignacio de la Llave</option>
                         <option value="31">Yucatán</option>
                         <option value="32">Zacatecas</option>
                    </select>    
                  </div>
                </div>
              </div>

            <div class="field">
             <label class="label">Número exterior </label>
             <div class="control">
              <input type="text" class="input" v-model="proveedor.Numero" required pattern="[0-9]{1,9}(\.[0-9]{0,2})?$" >
             </div>
            </div>

            <div class="field">
             <label class="label">Código Postal </label>
             <div class="control">
              <input  type="text" class="input" v-model="proveedor.Cp" required pattern="0[1-9][0-9]{3}|[1-4][0-9]{4}|9[0-9][0-9]{3}">
             </div>
            </div>

             <br>
                <div class="columns">
                  <div class="column is-two-fifths"></div>
                  <div class="column">
                    <div class='control'>
                      <button type='submit' id='btn_registro_proveedor' class='button is-primary is-rigth'>Registrar</button>
                    </div>
                  <div class="column is-two-fifths"></div>
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
   </div>
</template>

<script>
import{GLOBAL} from '../Servicios/Global'
export default {
  data(){
    return{
      proveedor:{},
      User:'',
      rfc:'',
      rfcRegistrado:'',
      correoRegistrado:''

    }
  },
  created: function(){
      this.User=localStorage.getItem('UsuarioLogueado')
      if(this.User!=null){
      }

    },
  methods:{
  
    agregarProveedor(){
        let uri = GLOBAL.url;
        this.axios.post(uri+'registro-proveedor', this.proveedor, {headers: {authorization: localStorage.getItem('token')}})
        .then((response) => {
              alert("Proveedor "+ this.proveedor.Razon_social+" registrado")
               this.proveedor={}       
            
        })
        .catch((err)=>{
          alert('Error'+err);
           this.proveedor={}
        })
    },
    limpiar: function(event) {
      
      event.target.reset();
    },

    validarExistencia(){
        
        let uri = GLOBAL.url
        this.rfc = document.getElementById('rfc_proveedor').value
        var conexion=uri+'validar-rfc/'+ this.rfc

        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          document.getElementById("btn_registro_proveedor").disabled=true
          this.rfcRegistrado=true
        })
        .catch((err)=>{
          document.getElementById("btn_registro_proveedor").disabled=false
          this.rfcRegistrado=false
           
        })
      },
      validarCorreo(){
        
        let uri = GLOBAL.url
        this.email = document.getElementById('email_proveedor').value
        var conexion=uri+'validar-email/'+ this.email

        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          document.getElementById("btn_registro_proveedor").disabled=true
          this.correoRegistrado=true
        })
        .catch((err)=>{
          document.getElementById("btn_registro_proveedor").disabled=false
          this.correoRegistrado=false
           
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

    .input-field input[type=text]:focus + label
    .input-field input[type=email]:focus + label {
      color: #e91e63;
    }

    .input-field input[type=text]:focus
    .input-field input[type=email]:focus{
      border-bottom: 2px solid #e91e63;
      box-shadow: none;
    }
  </style>
<template>
  <div class="columns" v-if="User!=null">
    <div class="column"></div>
    <div class="column is-two-fifths">
          <br>
          <h1 class="is-size-1">Registro de insumos</h1>
          <br>
          <form  v-on:submit.prevent=agregarInsumo @submit.prevent="limpiar">
              <div class="field">
                  <label class="label">Id Insumo</label>
                  <div class="control">
    <input class="input" id="Id_insumo" type="text" v-model="insumo.Id_insumo" v-on:keyup="validarExistencia" required pattern="^([A-Z]{1,2})([0-9]{3})([1-9]){1}">
     <span v-show="this.idRegistrado" class="help is-danger">ID ya se encuentra registrado</span>

                  </div>
              </div>
                    
              <div class="field">
                  <label for="lb_Nombre_insumo">Nombre del insumo</label>
                  <div class="control">
                    <input class="input" id="Nombre_insumo" type="text" v-model="insumo.Nombre" required>
                  </div>                    
              </div>
              
              <div class="field">
                <label class="label">Colores</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="insumo.Color" required>
                        <option value="" disabled selected>Color</option>
                        <option>Rojo</option>
                        <option>Amarillo</option>
                        <option>Azul</option>
                        <option>Verde</option> 
                        <option>Morado</option>
                        <option>Ginda</option>
                        <option>Negro</option>
                        <option>Blanco</option>
                        <option>Café</option>
                    </select>    
                  </div>
                </div>
              </div>


               <div class="field">
                <label class="label">Unidad de medida</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="insumo.Unidad_medida" required>
                        <option value="" disabled selected>Unidad</option>
                        <option>Metro</option>
                        <option>Pieza</option>
                        <option>Caja</option>
                        <option>Bolsa</option> 
                    </select>    
                  </div>
                </div>
              </div>
              <br>
                <div class="columns">
                  <div class="column is-two-fifths"></div>
                  <div class="column">
                    <div class='control'>
                      <button type='submit' id='btn_registro_insumo' class='button is-primary is-rigth'>Registrar</button>
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
      insumo:{},
      User:'',
      id:'',
      idRegistrado:''
    }
  },
  created: function(){
      this.User=localStorage.getItem('UsuarioLogueado')
      if(this.User!=null){
      
      }

    },
  methods:{
  
    agregarInsumo(){
        let uri = GLOBAL.url 
        this.axios.post(uri+'registro-insumo', this.insumo, {headers: {authorization: localStorage.getItem('token')}})
        .then((response) => {
                    
            alert("Insumo "+ this.insumo.Nombre+" registrado")
            this.insumo={}
            
        })
        .catch((err)=>{
          alert('Error');
          this.insumo={}

        })
    },
    limpiar: function(event) {
      
      event.target.reset();
    },

    validarExistencia(event){
        let uri = GLOBAL.url 
        this.id = document.getElementById('Id_insumo').value
        var conexion=uri+'validar-IdInsumo/'+ this.id
        
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          document.getElementById("btn_registro_insumo").disabled=true
          this.idRegistrado=true
          
        })
        .catch((err)=>{
          document.getElementById("btn_registro_insumo").disabled=false
          this.idRegistrado=false
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

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
    .input-field input[type=text]:focus + label,
    .input-field input[type=text]:focus + label,
    .input-field input[type=text]:focus + label {
      color: #e91e63;
    }

    .input-field input[type=text]:focus,
    .input-field input[type=text]:focus,
    .input-field input[type=text]:focus,
    .input-field input[type=text]:focus {
      border-bottom: 2px solid #e91e63;
      box-shadow: none;
    }
</style>

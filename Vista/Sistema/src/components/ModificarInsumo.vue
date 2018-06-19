<template>
  <div class="columns" v-if="User!=null">
    <div class="column"></div>
    <div class="column is-two-fifths">
          <br>
          <h1 class="is-size-1">Registro de insumos</h1>
          <br>
          <form  v-on:submit.prevent=validarVacio>
              <div class="field">
                  <label class="label">Id Insumo</label>
                  <div class="control">
    <input class="input" id="Id_insumo" type="text" v-model="insumo.Id_insumo"  disabled="true" pattern="^([A-Z]{1,2}([0-9]{3})([1-9]){1})">
    

                  </div>
              </div>
                    
              <div class="field">
                  <label for="lb_Nombre_insumo">Nombre del insumo</label>
                  <div class="control">
                    <input class="input" id="Nombre_insumo" type="text" v-model="insumo.Nombre" required v-on:keyup="validarE">
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
              <div class="field">
                <label class="label">Estante</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="insumo.Estante" required id="Estante">
                        <option disabled selected>Estante</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>    
                  </div>
                </div>
              </div>
              <br>
              <div class="field">
                  <label class="label" for="lb_Nombre_insumo">Valor Horizontal</label>
                  <div class="control">
                    <input class="input" id="Valor_Horizontal" type="number" min="1" v-model="insumo.Valor_Horizontal" required v-on:keyup="validarPosicion">
                  </div>                    
              </div>
              <div class="field">
                  <label class="label" for="lb_Nombre_insumo">Valor Vertical</label>
                  <div class="control">
                    <input class="input" id="Valor_Vertical" type="number" min="1"  v-model="insumo.Valor_Vertical" required v-on:keyup="validarPosicion">
                    <span v-show="this.posicionOcupada" class="help is-danger">Posición ocupada</span>
                  </div>                    
              </div>
              <div class="field">
                  <label class="label" for="lb_Nombre_insumo">Punto de reorden</label>
                  <div class="control">
                    <input class="input" id="Nombre_insumo" type="number" min="1" v-model="insumo.Punto_Reorden" required>
                  </div>                    
              </div> 
                <div class="columns">
                  <div class="column is-two-fifths"></div>
                  <div class="column">
                    <div class='control'>
                      <button type='submit' id='btn_registro_insumo' class='button is-primary is-rigth'>Actualizar</button>
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
      nombre:'',
      estante:'',
      valorHorizontal:'',
      valorVertical:'',
      posicionOcupada:''
      
    }
  },
  created: function(){
      this.User=localStorage.getItem('UsuarioLogueado')
      if(this.User!=null){
      this.consultar()
      }

    },
  methods:{
    validarVacio(){
      this.nombre= this.insumo.Nombre
        if(this.nombre.trim()===""){
          alert("campo vacio")
           document.getElementById("btn_registro_insumo").disabled=true
        }else{
          this.insumo.Nombre= this.nombre
          this.actualizarInsumo()
        }
    },
    consultar(){
        let uri = GLOBAL.url 
        var conexion=uri+'mostrar-insumo/'+ this.$route.params.id

        console.log('id ruta'+this.$route.params.id)

        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          this.insumo=response.data[0]
          console.log(response.data)

        })
        .catch((err)=>{
           alert("No se encontro insumo")
        })
      },
  
    actualizarInsumo(){
        let uri = GLOBAL.url 
        this.axios.put(uri+'actualizar-insumo/'+this.$route.params.id, this.insumo, {headers: {authorization: localStorage.getItem('token')}})
        .then((response) => {
                    
            alert("Insumo "+ this.insumo.Nombre+" registrado")
           
            
        })
        .catch((err)=>{
          alert('Error');
          //this.insumo={}

        })
    },
    validarPosicion(event){
        let uri = GLOBAL.url 
        this.estante = document.getElementById('Estante').value
        this.valorHorizontal=document.getElementById('Valor_Horizontal').value
        this.valorVertical=document.getElementById('Valor_Vertical').value
        
        var conexion=uri+'validar-posicion/'+ this.estante+'/'+this.valorHorizontal+'/'+this.valorVertical
        console.log(conexion)
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          document.getElementById("btn_registro_insumo").disabled=true
          this.posicionOcupada=true
          
        })
        .catch((err)=>{
          document.getElementById("btn_registro_insumo").disabled=false
          this.posicionOcupada=false
        })
      },
    validarE(event){
     
          document.getElementById("btn_registro_insumo").disabled=false
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

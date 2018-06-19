<template>
  <div class="columns" v-if="User!=null">
    <div class="column"></div>
    <div class="column is-two-fifths">
          <br>
          <h1 class="is-size-1">Registro de productos</h1>
          <br>
          <form  v-on:submit.prevent=agregarProducto>
              <div class="field">
                  <label class="label">Id Producto</label>
                  <div class="control">
    <input class="input" id="Id_insumo" type="text" v-model="producto.Id_producto" v-on:keyup="validarExistencia" required pattern="^([A-Z]{1,2}([0-9]{3})([0-9]){1})" placeholder="Ej. I0001">
     <span v-show="this.idRegistrado" class="help is-danger">ID ya se encuentra registrado</span>

                  </div>
              </div>

              <div class="field">
                  <label class="label">Nombre </label>
                  <div class="control">
                    <input class="input" id="Nombre" type="text" v-model="producto.Nombre"  required>
                  </div>
              </div>

               <div class="field">
                <label class="label">Categoria</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="producto.CategoriaIdCategoria" required>
                        <option v-for='categoria in categorias' :value="categoria.Id_categoria">{{categoria.Nombre}}</option>
                    </select>    
                  </div>
                </div>
              </div>
                    
              <div class="field">
                  <label class= label for="lb_Nombre_insumo">Descripcion</label>
                  <div class="control">
                    <textarea class="textarea" maxlength="80" name="descripcion" id="txtDescripcion" placeholder="Descripción"  v-model="producto.Descripcion"></textarea>
                  </div>                    
              </div>
              
              <div class="field">
                <label class="label">Colores</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="almacen.ColoreIdColor" required>
                        <option v-for='color in colores' :value="color.Id_color">{{color.Nombre}}</option>
                    </select>    
                  </div>
                </div>
              </div>


               <div class="field">
                <label class="label">Talla</label>
                <div class="control">
                  <div class="select">
                    <select class="browser-default" v-model="almacen.TallaIdTalla" required>
                        <option v-for='talla in tallas' :value="talla.Nombre">{{talla.Nombre}}</option> 
                    </select>    
                  </div>
                </div>
              </div>
              <br>
              <div class="field">
           <label for="myfile" class="label"> Imágen de producto</label>
            <div class="file is-boxed">
              <label class="file-label">
                <input class="file-input" required="true" type="file" @change="onFileSelected" name="myfile" v-validate="'image'">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Selecciona una imagen
                  </span>
                </span>
                <span class="help is-danger">{{ errors.first('myfile') }}</span>
              </label>
            </div>
          </div>
          <br>
                <div class="columns">
                  <div class="column is-two-fifths"></div>
                  <div class="column">
                    <div class='control'>
                      <button type='submit' id='btn_registro_producto' class='button is-primary is-rigth'>Registrar</button>
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
      producto:{},
      almacen:{},
      colores:{},
      categorias:{},
      tallas:{},
      User:'',
      id:'',
      idRegistrado:'',
      nombre:''
    }
  },
  created: function(){
      this.User=localStorage.getItem('UsuarioLogueado')
      if(this.User!=null){
       this.obtenerColores()
       this.obtenerCategoria()
       this.obtenerTalla()
      }

    },
  methods:{
    agregarProducto(){
        let uri = GLOBAL.url 
        this.axios.post(uri+'registro-producto', this.producto, {headers: {authorization: localStorage.getItem('token')}})
        .then((response) => {
           this.axios.put(GLOBAL.url+'subir-imagen/'+this.producto.Id_producto, this.formData, {headers: {authorization:localStorage.getItem('token')}})
              .then((response) => {
                this.agregarAlmacen()
              });
            
        })
        .catch((err)=>{
          alert('Error al insertar datos');
          this.producto={}

        })
    },
    agregarAlmacen(){
      let uri = GLOBAL.url 
        this.axios.post(uri+'registro-almacenp', this.almacen, {headers: {authorization: localStorage.getItem('token')}})
        .then((response) => {
                    
            alert("Insumo "+ this.insumo.Nombre+" registrado")
            this.producto={}
            this.almacen={}
            this.limpiar
            
        })
        .catch((err)=>{
          alert('Error al insertar datos');
          this.almacen={}

        })
    },
    limpiar: function(event) {
      
      event.target.reset();
    },
    validarExistencia(event){
        let uri = GLOBAL.url 
        this.id = document.getElementById('Id_insumo').value
        var conexion=uri+'validar-IdProducto/'+ this.id
        
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          document.getElementById("btn_registro_producto").disabled=true
          this.idRegistrado=true
          
        })
        .catch((err)=>{
          document.getElementById("btn_registro_producto").disabled=false
          this.idRegistrado=false
        })
      },
      onFileSelected (event) {
         const file = event.target.files[0];
         const formDataa = new FormData();
         formDataa.append("Imagen", file);
         this.formData= formDataa;
       },
       obtenerColores(){
        let uri = GLOBAL.url 
        var conexion=uri+'obtener-color'
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          
          this.colores=response.data
          console.log(this.colores)
          
        })
        .catch((err)=>{
           //alert("No se encontraron productos")
        })
      },
       obtenerCategoria(){
        let uri = GLOBAL.url 
        var conexion=uri+'obtener-categoria'
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          
          this.categorias=response.data
          
        })
        .catch((err)=>{
           //alert("No se encontraron productos")
        })
      },
      obtenerTalla(){
        let uri = GLOBAL.url 
        var conexion=uri+'obtener-talla'
        this.axios.get(conexion,{headers: {authorization: localStorage.getItem('token')}})
        .then((response)=>{
          
          this.tallas=response.data
          
        })
        .catch((err)=>{
           //alert("No se encontraron productos")
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
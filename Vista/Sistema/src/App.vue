<template>
<div>
	<nav class="navbar has-background-warning">
	  <div class="navbar-brand">
	     <img class="navbar-item"  style="height: 52px;" src="https://fashiop.com/blog/wp-content/uploads/2015/11/cropped-Logo-Fashiop.png" />
	    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
	      <span></span>
	      <span></span>
	      <span></span>
	    </div>
	  </div>

	  <div id="navbarExampleTransparentExample" class="navbar-menu">
	    <div class="navbar-start">
	      <div class="navbar-item has-dropdown is-hoverable">
	        <a class="navbar-link">
	          Opciónes
	        </a>
	        <div class="navbar-dropdown is-boxed">
	          	<router-link :to="{name: 'RegistroInsumo'}" class="navbar-item" >
	          		Registro de insumos
	        	</router-link>
	          	<router-link :to="{name: 'RegistroProveedor'}" class="navbar-item" >
	          		Registro de proveedores
	        	</router-link>
	          	<router-link :to="{name: 'MostrarInsumo'}" class="navbar-item" >
	          		Visualizar insumos
	        	</router-link>
	        	<router-link :to="{name: 'MostrarOrden'}" class="navbar-item" >
	          		Visualizar ordenes
	        	</router-link>
	        </div>
	      </div>
	    </div>

	    <div class="navbar-end">
	      <div class="navbar-item">
	        <div class="field is-grouped">
	          <p class="control">
	            <a class="button is-primary"  href="http://localhost:8080/" @click="limpiar">
	              <span>Cerrar sesión</span>
	            </a>
	          </p>
	        </div>
	      </div>
	    </div>
	  </div>
	</nav>

	<div class="container">
		<router-view>
    	</router-view>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods:{
  	limpiar: function(event) {
      
      localStorage.clear()
    }
  	}
  }
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>

</style>
<template>
  <div id="app" ref="box">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    var thst=this;
    window.addEventListener("scroll",function(e){
        thst.$store.state.menuType=false;
    });
  }
}
</script>

<style lang="scss">
#app {
	font-family:normal 100% "Lucida Grande",Verdana,Lucida,Arial,Helvetica,宋体,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;overflow: hidden;
}
</style>

<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper container">
        <router-link :to="{ name: 'List' }" class="nav-link">Msze</router-link>
        <ul class="right hide-on-med-and-down">
          <router-link :to="{ name: 'List' }" tag="li"><a class="nav-link">Msze</a></router-link>
          <router-link :to="{ name: 'Add' }" tag="li"><a class="nav-link">Dodaj nową msze</a></router-link>
          <router-link :to="{ name: 'Churches' }" tag="li"><a class="nav-link">Kościoły</a></router-link>
        </ul>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
    name: 'App',
    created(){
        this.$store.dispatch('loadMasses');
        this.$store.dispatch('loadChurches');
    }
}
</script>



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.material-icons{
  vertical-align: middle;
}
</style>

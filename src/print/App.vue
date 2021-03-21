<template>
  <div id="app">
    <VegetableTable read-only="true" />
  </div>
</template>

<script>
import VegetableTable from '../components/VegetableTable.vue'

export default {
  name: 'App',
  components: {
    VegetableTable
  },
}
</script>

<style>
#app {
  font-family: Georgia,Times New Roman,Times,serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #ffd100;
  margin-top: 60px;
}

</style>

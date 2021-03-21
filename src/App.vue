<template>
  <div id="app">
    <VegetableTable />
    <p>Zum editieren der Verfügbarkeit einfach in die Zellen klicken</p>
    <p>
    <button v-on:click="openPrintWindow"><font-awesome-icon icon="print" />&nbsp;Druckvorschau</button>
    </p>
    <p>© Sebastian Binder - 2021 - <a title="Zum Code" href="http://github.com/Basti93/vegetables-seasonal-calendar">Github</a></p>
  </div>
</template>

<script>
import VegetableTable from './components/VegetableTable.vue'
import { ipcRenderer } from 'electron'

export default {
  name: 'App',
  components: {
    VegetableTable
  },
  created() {
    console.log('created ')
  },
  methods: {
    openPrintWindow() {
      ipcRenderer.send('open-print-view');
    }
  }
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

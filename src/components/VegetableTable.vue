<template>
  <div>
  <table class="vegetable-table__table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Januar</th>
      <th>Februar</th>
      <th>März</th>
      <th>April</th>
      <th>Mai</th>
      <th>Juni</th>
      <th>Juli</th>
      <th>August</th>
      <th>September</th>
      <th>Oktober</th>
      <th>November</th>
      <th>Dezember</th>
      <th v-if="!readOnly"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(vegetable) in vegetables" :key="vegetable.id">
      <td>{{vegetable.name }}</td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 1), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 1)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 2), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 2)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 3), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 3)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 4), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 4)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 5), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 5)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 6), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 6)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 7), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 7)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 8), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 8)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 9), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 9)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 10), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 10)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 11), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 11)"></td>
      <td class="vegetable-table__cell" :class="[getSeasonClass(vegetable, 12), readOnly ? 'vegetable-table__cell--read-only' : '']" v-on:click="changeSeason(vegetable, 12)"></td>
      <td v-if="!readOnly"><button v-on:click="remove(vegetable.id)">Löschen</button></td>
    </tr>
    </tbody>
  </table>
  <button v-if="!readOnly" v-on:click="add()">Neues Gemüse/Obst hinzufügen</button>
  </div>
</template>

<script>

export default {
  name: 'VegetableTable',
  props: ['readOnly'],
  data: function () {
    return {
      editRowId: undefined,
      lastChanged: Date.now()
    }

  },
  computed: {
    // That's where the magic happens. Even though only the last
    // statement, `lowdb` is returned, `this.lastChanged` is now tracked by Vue
    // as a dependency of `this.db`. When this.lastChanged changes, `this.db`
    // will update wherever it is used in the Vue instance
    db () {
      return this.lastChanged, this.$db
    },
    vegetables () {
      return this.db.get('vegetables')
    },
    //editName() {
      //this.vegetables.find({id: this.editRowId}).assign({name: })
     // this.update()
    //}
  },
  methods: {
    update () {
      this.lastChanged = Date.now()
    },
    add() {
      const newEntry = {"id": this.$nanoid(), "name": "Neu", "type": "fruit", "season": {"fresh": [], "storage": []}}
      this.vegetables
          .push(newEntry)
          .write()
      // When you are done, trigger an update
      this.update()
    },
    remove(id) {
      this.vegetables.remove({ id: id }).write()
      this.update()
    },
    getSeasonFresh(vegetable) {
      return this.vegetables.find({id: vegetable.id}).get('season').get('fresh')
    },
    getSeasonStorage(vegetable) {
      return this.vegetables.find({id: vegetable.id}).get('season').get('storage')
    },
    changeSeason(vegetable, month) {
      if (this.readOnly) {
        return;
      }
      if (!vegetable.season.fresh.includes(month) && !vegetable.season.storage.includes(month)) {
        console.log('change to fresh')
        this.getSeasonFresh(vegetable).push(month).write()
      } else if (vegetable.season.fresh.includes(month)) {
        console.log('change to storage')
        this.getSeasonStorage(vegetable).push(month).write()
        this.getSeasonFresh(vegetable).pull(month).write()
      } else if (vegetable.season.storage.includes(month)) {
        console.log('change to not available')
        this.getSeasonStorage(vegetable).pull(month).write()
      }
      this.update()
    },
    isInSeasonFresh(vegetable, month) {
      return vegetable.season.fresh.includes(month)
    },
    isInSeasonStorage(vegetable, month) {
      return vegetable.season.storage.includes(month)
    },
    getSeasonClass(vegetable, month) {
      return this.isInSeasonFresh(vegetable, month)  ? 'vegetable-table__season--fresh' : this.isInSeasonStorage(vegetable, month) ? 'vegetable-table__season--storage' : '';
    },
    editRow(index) {
      this.editRowId = index
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vegetable-table__table, th, td {
  border: black solid 1px;
}
.vegetable-table__cell {
  cursor: pointer;
}
.vegetable-table__cell--read-only {
  cursor: auto;
}
.vegetable-table__season--fresh {
  background-color: green;
}
.vegetable-table__season--storage {
  background-color: orange;
}
</style>

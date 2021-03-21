<template>
  <div>
    <img src="logo-DE-H_Outline.svg" />
    <h2 v-if="!readOnly"><input style="width: 50%;" type="text" placeholder="Titel" :value="title" @change="onTitleChange"/></h2>
    <h2 class="vegetable-calendar__title" v-else>{{ title}}</h2>
    <p v-if="!readOnly"><input style="width: 50%;"  type="text" placeholder="Unterüberschrift" :value="subheadline" @change="onSubheadlineChange"/></p>
    <p class="vegetable-calendar__subheadline" v-else>{{ subheadline}}</p>
  <table class="vegetable-table__table">
    <thead>
    <tr>
      <th class="vegetable-table__header-cell">Name</th>
      <th class="vegetable-table__header-cell">Jan.</th>
      <th class="vegetable-table__header-cell">Feb.</th>
      <th class="vegetable-table__header-cell">Mär.</th>
      <th class="vegetable-table__header-cell">Apr.</th>
      <th class="vegetable-table__header-cell">Mai</th>
      <th class="vegetable-table__header-cell">Jun.</th>
      <th class="vegetable-table__header-cell">Jul.</th>
      <th class="vegetable-table__header-cell">Aug.</th>
      <th class="vegetable-table__header-cell">Sep.</th>
      <th class="vegetable-table__header-cell">Okt.</th>
      <th class="vegetable-table__header-cell">Nov.</th>
      <th class="vegetable-table__header-cell">Dez.</th>
      <th class="vegetable-table__header-cell" v-if="!readOnly">Löschen</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(vegetable) in vegetables" :key="vegetable.id">
      <td v-if="!readOnly"><input type="text" placeholder="Name" v-model="vegetable.name" @change="onNameChange(vegetable)"/></td>
      <td class="vegetable-table__cell-name" v-else>{{ vegetable.name}}</td>
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
      <td v-if="!readOnly"><button class="vegetable-table__remove-btn" v-on:click="remove(vegetable.id)" title="Löschen"><font-awesome-icon icon="trash" /></button></td>
    </tr>
    </tbody>
  </table>
    <div class="legend">
      <div>Frisch:  </div><span style="width: 50px; height: 25px; background-color: green;">&nbsp;</span>
      <div>Lagernd:  </div><span style="width: 50px; height: 25px; background-color: orange;">&nbsp;</span>
    </div>
    <p><button v-if="!readOnly" v-on:click="add()"><font-awesome-icon icon="plus" />&nbsp;Neues Gemüse/Obst hinzufügen</button></p>
    <p><button v-if="!readOnly" v-on:click="sort()"><font-awesome-icon icon="sort-alpha-down" />&nbsp;Nach Alphabet sortieren</button></p>
  </div>
</template>

<script>

export default {
  name: 'VegetableTable',
  props: ['readOnly'],
  data: function () {
    return {
      lastChanged: Date.now(),
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
    title () {
      return this.db.get('title').value()
    },
    subheadline () {
      return this.db.get('subheadline').value()
    }
  },
  methods: {
    update () {
      this.lastChanged = Date.now()
    },
    add() {
      const newEntry = {"id": this.$nanoid(), "name": "", "type": "fruit", "season": {"fresh": [], "storage": []}}
      this.vegetables
          .push(newEntry)
          .write()
      // When you are done, trigger an update
      this.update()
    },
    sort() {
      const sorted = this.vegetables.value().sort((a, b) => a.name.localeCompare(b.name))
      this.db.set('vegetables', sorted).write()
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
    onNameChange(vegetable) {
      this.vegetables.find({id: vegetable.id}).assign({ name: vegetable.name }).write()
      this.update()
    },
    onTitleChange(ev) {
      this.db.set('title', ev.target.value).write()
      this.update()
    },
    onSubheadlineChange(ev) {
      this.db.set('subheadline', ev.target.value).write()
      this.update()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vegetable-table__table {
  margin: 0 50px;
}

.vegetable-table__table, th, td {
  border: black solid 1px;
}
.vegetable-table__cell {
  cursor: pointer;
  width: 50px;
  height: 25px;
}

.vegetable-table__header-cell {
  padding: 3px;
}

.vegetable-table__cell-name {
  text-align: left;
  padding: 3px;
}

.vegetable-table__remove-btn {
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: red;
}
.vegetable-table__edit-btn {
  cursor: pointer;
  border: none;
  background-color: transparent;
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
.vegetable-calendar__subheadline {
  font-size: 18px;
  line-height: 27px;
  color: #056e7d;
  margin: 0 0 20px;
}
.vegetable-calendar__title {
  color: #056e7d;
  font-size: 36px;
  line-height: 48px;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 10px;
}
.legend {
  display: flex;
}
</style>

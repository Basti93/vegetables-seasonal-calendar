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
    </tr>
    </thead>
    <tbody>
    <tr v-for="vegetable in vegetables" :key="vegetable.name">
      <td>{{ translation(vegetable.name) }}</td>
      <td :class="isInSeasonFresh(vegetable, 1)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 1) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 2)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 2) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 3)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 3) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 4)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 4) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 5)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 5) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 6)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 6) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 7)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 7) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 8)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 8) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 9)  ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 9) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 10) ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 10) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 11) ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 11) ? 'vegetable-table__season--storage' : ''"></td>
      <td :class="isInSeasonFresh(vegetable, 12) ? 'vegetable-table__season--fresh' : isInSeasonStorage(vegetable, 12) ? 'vegetable-table__season--storage' : ''"></td>
    </tr>
    </tbody>
  </table>
  <button v-on:click="addVegetable()">Hinzufügen</button>
  </div>
</template>

<script>

export default {
  name: 'VegetableTable',
  props: {},
  data: function () {
    return {
      vegetables: [],
      translations: [],
      lang: 'de',
    }

  },
  created() {
    console.log(this.$db.get('vegetables').value())
    this.vegetables = this.$db.get('vegetables').value();
    this.translations = this.$db.get('lang_' + this.lang).value();
  },
  methods: {
    async addVegetable() {
      const newEntry = {"name": "Neu", "type": "fruit", "season": {"fresh": [], "storage": []}}
      this.$db.get('vegetables')
          .push(newEntry)
          .write()
          .then(() => {
            this.vegetables.push(newEntry)
          })
    },
    isInSeasonFresh(vegetable, month) {
      console.log(vegetable)
      if (vegetable.season && vegetable.season.fresh) {
        return vegetable.season.fresh.includes(month)
      }
      return false
    },
    isInSeasonStorage(vegetable, month) {
      if (vegetable.season && vegetable.season.storage) {
        return vegetable.season.storage.includes(month)
      }
      return false
    },
    translation(name) {
      let foundTranslation = this.translations.find(o => o.name === name)
      if (foundTranslation) {
        return foundTranslation.translation
      }
      return name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vegetable-table__table, th, td {
  border: black solid 1px;
}
.vegetable-table__season--fresh {
  background-color: green;
}
.vegetable-table__season--storage {
  background-color: orange;
}
</style>

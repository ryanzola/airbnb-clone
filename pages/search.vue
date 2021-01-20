<template>
  <div>
    Results for {{ label }} <br />
    <div style="height: 800px; width: 800px; float: right;" ref="map"></div>
    <div v-if="homes.length > 0">
      <nuxt-link v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`">
        <home-row  :home="home" @mouseover.native="highlightMarker(home.objectID, true)" @mouseout.native="highlightMarker(home.objectID, false)" />
      </nuxt-link>
    </div>
    <div v-else>
      No results found
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Homes around ${this.label}`
    }
  },
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng)
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng
    }
  },
  mounted() {
    this.updateMap();
  },
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng);
    this.homes = data.json.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    this.updateMap();

    next();
  },
  methods: {
    highlightMarker(homeID, isHighlighted) {
      document.getElementsByClassName(`home-${homeID}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
    },
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
    },
    getHomeMarkers() {
      return this.homes.map(home => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID
        }
      })
    }
  }
}
</script>

<style>
.marker {
  background-color: #FFF;
  border: 1px solid lightgrey;
  border-radius: 20px;
  font-weight: bold;
  padding: 5px 8px;
}

.marker-highlight {
  color: #FFF !important;
  background-color: #000;
  border-color: #000;
}
</style>
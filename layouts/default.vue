<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg" alt="nuxt bnb logo">
      </div>
      <div class="app-search">
        <input type="text" ref="citySearch" @changed="changed" placeholder="Enter your address">
        <client-only>
          <template #placeholder>
            <input class="datepicker">
            <span class="-ml-6 mr-2">to</span>
            <input class="datepicker"><br />
          </template>

          <date-picker 
            v-model="range"
            is-range
            timezone="UTC"
            :modelConfig="{ timeAdjust: '00:00:00'}"
          >
            <template v-slot="{ inputValue, inputEvents}">
              <input :value="inputValue.start" v-on="inputEvents.start" class="datepicker">
              <span class="-ml-6 mr-2">to</span>
              <input :value="inputValue.end" v-on="inputEvents.end" class="datepicker"><br />
            </template>
          </date-picker>
        </client-only>
        <button @click="search">
          <img src="/images/icons/search.svg" alt="search for places">
        </button>
      </div>
      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <img src="/images/icons/house.svg" alt="a house">
          <div class="name">Host</div>
          <img :src="user.profileUrl" class="avatar" />
        </template>
        <div v-show="!isLoggedIn" id="googleButton" class="ml-8"></div>
      </div>
    </header>
    <nuxt/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: {
        lat: 0,
        lng: 0,
        label: '',
      },
      range: {
        start: new Date(),
        end: new Date(),
      }
    }
  },
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch)
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    }
  },
  methods: {
    search() {
      if(!this.location.label) return

      this.$router.push({
        name: 'search', 
        query: {
          ...this.location,
          start: this.range.start.getTime() / 1000,
          end: this.range.end.getTime() / 1000
        }
      })
    },
    changed() {
      const place = event.detail
      if(!place.geometry) return;

      this.location.lat = place.geometry.location.lat()
      this.location.lng = place.geometry.location.lng()
      this.location.label = this.$refs.citySearch.value


    }
  }
}
</script>
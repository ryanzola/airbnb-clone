<template>
  <div class="app-wrapper">
    <div class="app-double-column app-property-details">
      <div>
        <h1>{{ home.title }}</h1>
        <div class="app-flex">
          <div class="app-address">
            {{ home.location.address }} {{ home.location.city}} {{ home.location.state }} {{ home.location.country }}
          </div>
          <div class="app-rating">
            {{ home.review }} <span>({{ home.reviewCount }})</span>
          </div>
        </div>
        <div class="app-property-details-footer">
          {{ pluralize(home.guests, 'guest') }} &middot;
          {{ pluralize(home.bedrooms, 'room') }} &middot;
          {{ pluralize(home.beds, 'bed') }} &middot;
          {{ pluralize(home.bathrooms, 'bath') }}
        </div>
      </div>
      <div>
        <div class="app-price">
          ${{ home.pricePerNight}}<span> / night</span>
        </div>

        <client-only>
          <date-picker 
            v-model="range"
            is-range
            timezone="UTC"
            :modelConfig="{ timeAdjust: '00:00:00'}"
            class="app-search"
          >
            <template v-slot="{ inputValue, inputEvents}">
              <input :value="inputValue.start" v-on="inputEvents.start" class="datepicker">
              <input :value="inputValue.end" v-on="inputEvents.end" class="datepicker">
            </template>
          </date-picker>
        </client-only>

        <button class="app-big-button" @click="checkout">Request to book</button>
      </div>
    </div>
  </div>
</template>

<script>
import pluralize from '~/utils/pluralize';

export default {
  props: {
    home: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      range: {
        start: null,
        end: null
      }
    }
  },
  mounted() {
    if(this.$route.query.result == 'success') {
      alert('Success!')
    }
  },
  methods: {
    pluralize,
    checkout() {
      const start = this.range.start.getTime() / 1000;
      const end = this.range.end.getTime() / 1000;

      this.$stripe.checkout(this.home.objectID, start, end);
    }
  }
}
</script>
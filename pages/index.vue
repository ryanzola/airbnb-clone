<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float: left; margin: 10px;">
      <nuxt-link :to="`/home/${ home.objectID }`"><home-card :home="home" /></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Home Page",
      meta: [{
          name: "description",
          content: "this is a home page",
          hid: "description"
        }]
    }
  },
  async asyncData({ $dataApi }) {
    return {
      homes: (await $dataApi.getHomes()).json.hits
    }
  }
}
</script>
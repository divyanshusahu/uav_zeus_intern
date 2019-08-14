<template>
  <v-app>
    
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Fixed Wing/Hydrbid UAV</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        href="https://www.zeusnumerix.com"
        target="_blank"
      >
        <img src="./assets/images/zeus.png" class="zeus_logo">
      </v-btn>
    </v-toolbar>

    
    <v-content>
      <mainpage />
    </v-content>

    <uavfooter />

  </v-app>
</template>

<script>
import mainpage from './components/mainpage.vue'
import uavfooter from './components/uavfooter.vue'
export default {
  name: 'App',
  components: {
    mainpage,
    uavfooter
  }
}
</script>

<style>
  @import './assets/css/style.css';
</style>

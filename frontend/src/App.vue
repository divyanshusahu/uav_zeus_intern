<template>
  <v-app>
    
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>UAV</span>
        <!--<span class="font-weight-light">MATERIAL DESIGN</span>-->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        href="https://www.zeusnumerix.com"
        target="_blank"
      >
        <!--<span class="mr-2">Latest Release</span>-->
        <img src="./assets/images/zeus.png">
      </v-btn>
    </v-toolbar>

    
    <v-content>
      <mainpage />
    </v-content>
  
  </v-app>
</template>

<script>
import mainpage from './components/mainpage.vue'
export default {
  name: 'App',
  components: {
    mainpage
  }
}
</script>

<style>
  @import './assets/css/style.css';
</style>

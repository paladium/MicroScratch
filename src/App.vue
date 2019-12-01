<template>
  <md-app>
    <md-app-toolbar class="md-primary">
      <span class="md-title">MicroScratch</span>
    </md-app-toolbar>

    <md-app-drawer md-permanent="full">
      <md-toolbar class="md-transparent" md-elevation="0"></md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Run</span>
        </md-list-item>

        <md-list-item @click="showAddDialog">
          <md-icon>add</md-icon>
          <span class="md-list-item-text">Add block</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Help</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content style="padding: 0;">
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  showAddDialog() {
    console.log("add dialog");
  }
}
</script>
<style lang="scss">
.md-app {
  min-height: 100vh;
}
.md-drawer {
  width: 150px !important;
}
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    accent: md-get-palette-color(white, A200),
    theme: "dark"
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
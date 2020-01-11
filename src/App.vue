<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <span class="md-title">MicroScratch</span>
                </div>
                <div class="md-toolbar-section-end">
                    <md-field>
                        <label for="example">Example</label>
                        <md-select @md-selected="exampleChanged" name="example" id="movie">
                            <md-option :value="example.id" v-for="example in examples" :key="example.name">{{example.name}}</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
        </md-app-toolbar>

        <md-app-drawer md-permanent="full">
            <md-toolbar class="md-transparent" md-elevation="0"></md-toolbar>

            <md-list>
                <md-list-item @click="showRunDialog">
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
import {addTwoNumbers} from '@/store/examples'

@Component
export default class App extends Vue {

    examples = [
        {name: "Add two numbers", value: addTwoNumbers, id: 1}
    ];

    showAddDialog() {
        this.$store.commit("setShowAddDialog", true);
    }
    showRunDialog() {
        this.$store.commit("setShowRunDialog", true);
    }
    exampleChanged(id: number)
    {
        const example = this.examples.find((x) => x.id == id)!;
        console.log(example);
        //Apply the example
        this.$store.dispatch("loadExample", example.value);
    }
}
</script>
<style lang="scss">
.md-app {
    max-height: 100vh;
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
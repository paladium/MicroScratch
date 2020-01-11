<template>
    <div class="control">
        <!-- <md-field>
            <md-select>
                <md-option value="+">+ add two numbers</md-option>
                <md-option value="-">- substract two numbers</md-option>
                <md-option value="/">/ divide first number by second</md-option>
                <md-option value="*">* multiple two numbers</md-option>
            </md-select>
        </md-field> -->
        <select class="md-select md-menu" v-model="currentOperation">
            <option value="+">+ add two numbers</option>
            <option value="-">- substract two numbers</option>
            <option value="/">/ divide first number by second</option>
            <option value="*">* multiply two numbers</option>
        </select>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as Rete from 'rete'

@Component
export default class NumberRobotSelector extends Vue {

   @Prop()
   node!: Rete.Node;

   mounted()
   {
       console.log(this.node);
   }

   get currentOperation()
   {
       return this.node.data.value as string;
   }
   set currentOperation(value: string)
   {
       this.node.data.value = value;
   }

}
</script>
<template lang="html">
<div class="node" :class="[selected(), node.name, getNodeClass()] | kebab">
    <div class="title">{{node.name}}</div>
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
        <div class="output-title">{{output.name}}</div>
        <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
    </div>
    <!-- Controls-->
    <div class="control" v-for="control in controls()" v-control="control"></div>
    <!-- Inputs-->
    <div class="input" v-for="input in inputs()" :key="input.key">
        <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
        <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
        <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
    </div>
</div>
</template>

<script>
import mixin from "rete-vue-render-plugin/src/mixin";
import Socket from "rete-vue-render-plugin/src/Socket.vue";
export default {
  mixins: [mixin],
  components: {
    Socket
  },
  methods: {
    getNodeClass() {
      // const color = this.node.data.messageNode.color;
      // return color == null ? "default-node-color" : `node-color-${color}`;
      return "default-node-color";
    }
  }
};
</script>

<style lang="sass" scoped>
@import "rete-vue-render-plugin/src/vars"
.default-node-color
  background: rgb(50, 50, 50)
.node
  border: 2px solid orangered
  border-radius: 10px
  cursor: pointer
  min-width: $node-width
  height: auto
  padding-bottom: 6px
  box-sizing: content-box
  position: relative
  user-select: none
  box-shadow: 0 0 10px pink, 0 0 20px orangered, 0 0 40px red, 0 0 80px magenta
  &:hover
    background: lighten(rgb(50, 50, 50),4%)
  &.selected
    background: #FFA000
    border-color: #e3c000
  .title
    color: white
    font-family: sans-serif
    font-size: 18px
    padding: 8px
  .output
    text-align: right
  .input
    text-align: left
  .input-title,.output-title
    vertical-align: middle
    color: white
    display: inline-block
    font-family: sans-serif
    font-size: 14px
    margin: $socket-margin
    line-height: $socket-size
  .input-control
    z-index: 1
    width: calc(100% - #{$socket-size + 2*$socket-margin})
    vertical-align: middle
    display: inline-block
  .control
    padding: $socket-margin $socket-size/2 + $socket-margin
</style>

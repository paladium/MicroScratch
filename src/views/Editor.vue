<template>
  <div class="home">
    <div id="canvas" ref="canvas"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import CustomNode from "@/components/CustomNode.vue";
class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  builder(node: any) {
    return node;
  }
  worker() {}
}

@Component
export default class Editor extends Vue {
  private editor!: Rete.NodeEditor;
  mounted() {
    const container = this.$refs["canvas"];

    this.editor = new Rete.NodeEditor("demo@0.1.0", container as HTMLElement);
    this.editor.use(ConnectionPlugin);
    this.editor.use(VueRenderPlugin, { component: CustomNode });
    const numComponent = new NumComponent();
    this.editor.register(numComponent);
    this.editor.addNode(new Rete.Node("Number"));
  }
}
</script>
<style lang="css" scoped>
#canvas{
    height: 100vh;
    width: 100%;
    background: url('../assets/circuit.svg');
}
</style>
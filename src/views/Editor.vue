<template>
    <div class="home">
        <div id="canvas" ref="canvas"></div>
        <md-dialog :md-active.sync="showAddDialog">
            <md-dialog-title>Add new block</md-dialog-title>
            <md-dialog-content>
                <md-list>
                    <md-list-item @click="addBlock('input')">
                        <md-icon>
                            <img src="@/assets/keyboard.svg" alt />
                        </md-icon>
                        <span class="md-list-item-text">Input, e.g - number, name, location</span>
                    </md-list-item>
                    <md-list-item @click="addBlock('numberRobot')">
                        <md-icon>
                            <img src="@/assets/robot.svg" alt />
                        </md-icon>
                        <span
                            class="md-list-item-text"
                        >NumberRobot - can do lots of things with numbers</span>
                    </md-list-item>
                    <md-list-item @click="addBlock('printer')">
                        <md-icon>
                            <img src="@/assets/conversation.svg" alt />
                        </md-icon>
                        <span class="md-list-item-text">Printer - can text back to you anything</span>
                    </md-list-item>
                </md-list>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button @click="showAddDialog = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
        <beautiful-chat
            :participants="[{id: 'bot', name: 'Raspberry PI', imageUrl: 'https://image.flaticon.com/icons/svg/1587/1587565.svg'}]"
            :isOpen="chatOpened"
            :open="openBot"
            :close="closeBot"
            :showEmoji="true"
            :alwaysScrollToBottom="true"
            :onMessageWasSent="messageSent"
            :messageList="messages"
            class="chat-window"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import CustomNode from "@/components/CustomNode.vue";
import NumberRobotSelector from "@/components/NumberRobotSelector.vue";
const outputSocket = new Rete.Socket("OutputSocket");

class InputComponent extends Rete.Component {
    constructor() {
        super("input");
    }

    builder(node: any) {
        return node;
    }
    worker() {}
}
class NumberRobotComponent extends Rete.Component {
    constructor() {
        super("numberRobot");
    }

    builder(node: any) {
        return node;
    }
    worker() {}
}

class PrinterComponent extends Rete.Component {
    constructor() {
        super("printer");
    }
    builder(node: any) {
        return node;
    }
    worker() {}
}

class NumberControl extends Rete.Control {
    constructor(key: string, node: Rete.Node) {
        super(key);
        (this as any).render = "vue";
        (this as any).component = NumberRobotSelector;
        (this as any).props = {
            ikey: key,
            node: node
        };
    }
}

@Component
export default class Editor extends Vue {
    private editor!: Rete.NodeEditor;
    chatOpened: boolean = false;
    messages: Array<any> = [];
    private webSocket!: WebSocket;
    mounted() {
        const container = this.$refs["canvas"];

        this.editor = new Rete.NodeEditor(
            "demo@0.1.0",
            container as HTMLElement
        );
        this.editor.use(ConnectionPlugin);
        this.editor.use(VueRenderPlugin, { component: CustomNode });
        this.editor.register(new InputComponent());
        this.editor.register(new NumberRobotComponent());
        this.editor.register(new PrinterComponent());
        this.webSocket = new WebSocket("ws://localhost:8000/bot");
        this.webSocket.onopen = (e) => {
            this.webSocket.send("cool");
        };
        this.webSocket.onmessage = (e) => {
            console.log(e);
        };
    }
    get showAddDialog() {
        return this.$store.state.showAddDialog;
    }
    set showAddDialog(value: boolean) {
        this.$store.commit("setShowAddDialog", value);
    }
    addBlock(block: string) {
        const node = new Rete.Node(block);
        if (block == "input") {
            const out = new Rete.Output("num", "Then", outputSocket);
            node.addOutput(out);
        } else if (block == "numberRobot") {
            const out = new Rete.Output("num", "Then", outputSocket);
            node.addOutput(out);
            node.addInput(new Rete.Input("input1", "a", outputSocket, false));
            node.addInput(new Rete.Input("input2", "b", outputSocket, false));
            node.addControl(new NumberControl("operation", node));
        } else if ((block = "printer")) {
            const input = new Rete.Input("string", "To print", outputSocket);
            node.addInput(input);
        }
        this.editor.addNode(node);
    }
    messageSent(e: any) {
        this.messages = [
            ...this.messages,
            e
        ];
    }
    openBot() {
        this.chatOpened = true;
    }
    closeBot() {
        this.chatOpened = false;
    }
}
</script>
<style lang="css" scoped>
#canvas {
    height: 100vh;
    width: 100%;
    background: url("../assets/circuit.svg");
}
</style>
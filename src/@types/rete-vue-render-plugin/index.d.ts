declare module "rete-vue-render-plugin"
{
    import { NodeEditor } from 'rete';

    function install(editor: any): void;
    const _default: {
        name: string;
        install: typeof install;
    };
    export default _default;
}

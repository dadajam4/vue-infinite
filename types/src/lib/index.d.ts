import { PluginObject } from 'vue/types';
export * from './components/DDInfiniteScroll';
export interface DDVueInfiniteOptions {
    containerName?: string;
}
declare const plugin: PluginObject<DDVueInfiniteOptions>;
export default plugin;

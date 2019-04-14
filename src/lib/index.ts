import { PluginObject } from 'vue/types';
import { DDInfiniteScroll } from './components';

export * from './components/DDInfiniteScroll';

export interface DDVueInfiniteOptions {
  containerName?: string;
}

const DEFAULT_CONTAINER_NAME = (DDInfiniteScroll as any).options.name;

const plugin: PluginObject<DDVueInfiniteOptions> = {
  installed: false,

  install(Vue, opts = {}) {
    if (this.installed) return;

    Vue.component(
      opts.containerName || DEFAULT_CONTAINER_NAME,
      DDInfiniteScroll,
    );

    this.installed = true;
  },
};

export default plugin;

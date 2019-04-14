<template>
  <div class="item">
    <h1>{{ title }}</h1>
    <p>Try browser back!!!</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
    <p>dummy text...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'item-view',
  scrollToTop: true,
})
export default class Item extends Vue {
  get title() {
    return this.$route.params.id;
  }

  destroyed() {
    console.warn(`destroyed [${this.$options.name}]`);
  }
}
</script>

<style lang="scss" scoped>
</style>

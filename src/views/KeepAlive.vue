<template>
  <div class="keep-alive-view">
    <nuxt-child keep-alive :keep-alive-props="{ include: 'list-view' }"></nuxt-child>
    <!--
    It is surely rendered in this way.
    <keep-alive include="list-view">
      <router-view></router-view>
    </keep-alive>
    -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'keep-alive-view',
})
export default class KeepAliveView extends Vue {}
</script>

<style lang="scss" scoped>
</style>

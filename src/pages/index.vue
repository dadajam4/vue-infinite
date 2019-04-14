<template>
  <div class="home">
    <ol>
      <li>
        <router-link to="basic">basic</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'keepalive-index' }">keepalive</router-link>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'home-view',
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  text-align: left;
  width: 640px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>

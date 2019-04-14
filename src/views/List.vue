<template>
  <div class="playground">
    <div class="playground__header">
      <router-link
        class="playground__header__tab"
        :class="{ 'playground__header__tab--active': t.active }"
        :to="t.to"
        replace
        v-for="t in computedTags"
        :key="t.name"
      >{{ t.name }}</router-link>
    </div>
    <dd-infinite-scroll
      class="my-scroll"
      v-model="pages"
      :page="page"
      @change:page="page = $event"
      :request="onInfiniteRequest"
      margin-top="100"
      max-active-page="3"
      page-class="my-page"
      loading-color="rgba(0, 0, 0, .5)"
    >
      <template v-slot:page="slotProps">
        <h2 class="my-page__title">Page: {{ slotProps.page }}</h2>
        <div class="my-page__items">
          <div
            class="my-item"
            :class="{ [`my-item--${tab}`]: true }"
            v-for="item in slotProps.data"
            :key="item.id"
          >
            <div class="my-item__inner">
              <div class="my-item__body">
                <h3 class="my-item__name">
                  <router-link
                    :to="{
                      path: ($route.path + '/' + item.id).replace(/[\/]+/g, '/'),
                    }"
                  >{{ item.id }}</router-link>
                </h3>
                <mock-expansion>
                  <p>Dummy Text...</p>
                  <p>Dummy Text...</p>
                  <p>Dummy Text...</p>
                  <p>Dummy Text...</p>
                  <p>Dummy Text...</p>
                </mock-expansion>
              </div>
            </div>
          </div>
        </div>
      </template>
    </dd-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { RequestTarget, RequestResult, PageData } from '~/lib';
import MockExpansion from '~/components/MockExpansion';

interface Item {
  id: string;
}

interface DummyApiResult {
  total: number;
  items: Item[];
}

const ITEM_PER_PAGE = 24;
const NUM_OF_DUMMY_ITEMS = 124;
const DUMMY_WAIT = 500;

function dummyApi(page: number): Promise<DummyApiResult> {
  return new Promise<DummyApiResult>(resolve => {
    setTimeout(() => {
      const items: Item[] = [];
      const offset = (page - 1) * ITEM_PER_PAGE;
      for (let i = 0; i < ITEM_PER_PAGE; i++) {
        const realIndex = offset + i;
        if (realIndex > NUM_OF_DUMMY_ITEMS - 1) break;
        const item: Item = {
          id: 'item-' + realIndex,
        };
        items.push(item);
      }
      resolve({
        total: NUM_OF_DUMMY_ITEMS,
        items,
      });
    }, DUMMY_WAIT);
  });
}

type Tab = 'inline' | 'block';

interface ListViewData {
  page: number;
  tab: Tab;
  pages: PageData[];
  tabs: Tab[];
}

@Component({
  name: 'list-view',
  components: {
    MockExpansion,
  },

  // @see: https://github.com/nuxt/nuxt.js/issues/3267#issuecomment-427824422
  data(this: ListView): ListViewData {
    return {
      page: this.page === undefined ? 0 : this.page,
      tab: this.tab === undefined ? 'inline' : this.tab,
      pages: this.pages === undefined ? [] : this.pages,
      tabs: ['inline', 'block'],
    };
  },
})
export default class ListView extends Vue {
  page!: number;
  tab!: Tab;
  pages!: PageData[];
  tabs!: Tab[];

  get computedTags() {
    const { $route } = this;
    const { query } = $route;

    return this.tabs.map(tab => {
      const to = {
        ...$route,
        query: {
          ...query,
          tab,
        },
      };
      return {
        name: tab,
        to,
        active: tab === this.tab,
      };
    });
  }

  @Watch('page')
  onChangePage(page: number) {
    if (page) {
      const { $route, $router } = this;
      const newRoute = {
        ...$route,
        query: {
          ...$route.query,
          page: String(page),
        },
      };
      $router.replace(newRoute);
    }
  }

  @Watch('$route.query', { immediate: true })
  async onChangeQuery(query: any) {
    let { page = 1, tab = 'inline' } = query;
    this.page = parseInt(page, 10);
    this.tab = tab;
  }

  protected async onInfiniteRequest(
    target: RequestTarget,
  ): Promise<RequestResult> {
    const { page } = target;
    const res = await dummyApi(page);
    const { total, items } = res;
    if (items.length === 0) return;

    const offset = ITEM_PER_PAGE * (page - 1);
    const isFinished = offset + items.length === total;

    return {
      page,
      data: res.items,
      finished: isFinished,
    };
  }

  destroyed() {
    console.warn(`destroyed [${this.$options.name}]`);
  }
}
</script>

<style lang="scss" scoped>
.playground {
  &__header {
    background: #faa;
    height: 100px;
    display: flex;
    align-items: stretch;
    justify-content: center;

    &__tab {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;

      &--active {
        font-weight: bold;
        pointer-events: none;
      }
    }
  }
}

.my-scroll {
  width: 640px;
  max-width: 100%;
  margin: 0 auto;
}

/deep/ .my-page {
  border-bottom: solid 1px #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;

  &__title {
    color: #f00;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
  }
}

/deep/ .my-item {
  width: (100 / 3) * 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  &__body {
    padding: 20px 0;
  }

  &__name {
    margin: 0;
  }

  &--block {
    width: 100%;
  }
}
</style>

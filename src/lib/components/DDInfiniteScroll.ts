import { CreateElement, VNode } from 'vue';
import { Component, Prop, Model, Vue } from 'vue-property-decorator';
import DDInfinitePage from './DDInfinitePage';
import DDInfiniteLoading from './DDInfiniteLoading';
import Scroller from '@dadajam4/scroller';
import { isPromise, toNumber, error } from '../utils';

let scroller: Scroller = null as any;

export type LoadingType = 'prev' | 'next';

export interface DebounceDefine {
  prev: number;
  next: number;
}

export interface RequestTarget {
  page: number;
  type: LoadingType;
  scroll: DDInfiniteScroll;
}

export type RequestResult<M = any> = PageData<M> | void;

export type DDInfiniteScrollRequest<M = any> = (
  target: RequestTarget,
) => RequestResult<M>;

export interface PageData<M = any> {
  page: number;
  data?: M;
  finished?: boolean;
}

export interface ComputedPageData<M = any> extends PageData<M> {
  active: boolean;
}

export interface LoadingScopedProps {
  type: LoadingType;
  scroll: DDInfiniteScroll;
  color?: string;
  height: number;
  value: boolean;
}

export const MIN_DEBOUNCE = 0;

@Component({
  name: 'dd-infinite-scroll',
})
export default class DDInfiniteScroll<M = any> extends Vue {
  $refs!: {
    pages: DDInfinitePage[];
    prevLoading: DDInfiniteLoading;
    nextLoading: DDInfiniteLoading;
  };

  @Prop({
    type: Object,
    default: () => {
      if (!scroller)
        scroller = new Scroller({
          scrollSizeOvserver: {
            interval: 500,
            width: false,
          },
        });
      return scroller;
    },
  })
  scroller!: Scroller;
  @Model('update:pages', { type: Array, required: true }) pages!: PageData<M>[];
  @Prop({ type: Number, default: 1 }) page!: number;
  @Prop({ type: String, default: 'div' }) tag!: string;
  @Prop({ type: String }) pageTag?: string;
  @Prop({ type: String }) pageClass?: string;
  @Prop({ type: Object }) pageAttrs?: object;
  @Prop({ type: String }) loadingColor?: string;
  @Prop({ type: [String, Number], default: 70 }) loadingHeight!:
    | string
    | number;
  @Prop({ type: [String, Number], default: 0 }) triggerPerHeight!:
    | string
    | number;
  @Prop({ type: [String, Number], default: 0 }) marginTop!: string | number;
  @Prop({ type: [String, Number], default: 0 }) marginBottom!: string | number;
  @Prop({
    type: [String, Number, Object],
    default: (): DebounceDefine => {
      return { prev: MIN_DEBOUNCE, next: MIN_DEBOUNCE };
    },
  })
  debounce!: string | number | DebounceDefine;
  @Prop({ type: [Number, String], default: 50 }) pageJudgePosition!:
    | string
    | number;

  @Prop({ type: Function, required: true }) request!: DDInfiniteScrollRequest;
  @Prop({ type: [Number, String] }) maxActivePage?: number | string;

  get computedActivePages(): ComputedPageData<M>[] {
    return this.computedPages.filter(p => p.active);
  }

  get computedPages(): ComputedPageData<M>[] {
    const { computedMaxActivePage, currentPage } = this;

    const pages = this.pages.sort((a, b) => {
      if (a.page < b.page) return -1;
      if (a.page > b.page) return 1;
      return 0;
    });

    let offsetFrom = 0;
    let offsetTo = Infinity;
    const { length } = pages;
    if (computedMaxActivePage !== undefined && length) {
      const firstPage = pages[0];
      const lastPage = pages[length - 1];
      const minPage = firstPage.page;
      const maxPage = lastPage.page;
      const isEven = computedMaxActivePage % 2 === 0;
      const half = Math.floor(computedMaxActivePage / 2);
      offsetFrom = Math.max(currentPage - half + (isEven ? 1 : 0), minPage);
      offsetTo = Math.min(offsetFrom + computedMaxActivePage - 1, maxPage);
      const diff = computedMaxActivePage - (offsetTo - offsetFrom + 1);
      if (diff > 0) offsetFrom = Math.max(offsetFrom - diff, minPage);
    }

    return pages.map(p => {
      const { page } = p;
      return {
        ...p,
        active: offsetFrom <= page && page <= offsetTo,
      };
    });
  }

  get computedMaxActivePage(): number | undefined {
    const { maxActivePage } = this;
    if (typeof maxActivePage === 'number') return maxActivePage;
    if (maxActivePage === undefined || maxActivePage === '') return;
    return parseInt(maxActivePage, 10);
  }

  get computedDebounce(): DebounceDefine {
    let { debounce } = this;
    if (typeof debounce !== 'object') {
      const value = toNumber(debounce);
      debounce = { prev: value, next: value };
    }

    return {
      prev: Math.max(debounce.prev, MIN_DEBOUNCE),
      next: Math.max(debounce.next, MIN_DEBOUNCE),
    };
  }

  get finished(): boolean {
    return this.internalFinished;
  }

  set finished(finished: boolean) {
    if (this.internalFinished !== finished) {
      this.internalFinished = finished;
      this.$emit('finish');
    }
  }

  get computedLoadingHeight(): number {
    return toNumber(this.loadingHeight);
  }

  get computedTriggerPerHeight(): number {
    return toNumber(this.triggerPerHeight);
  }

  get margin(): { top: number; bottom: number } {
    return {
      top: toNumber(this.marginTop),
      bottom: toNumber(this.marginBottom),
    };
  }

  get triggerHeight(): number {
    const { computedLoadingHeight, computedTriggerPerHeight } = this;
    const triggerHeight = Math.floor(
      computedLoadingHeight * computedTriggerPerHeight,
    );
    return Math.max(triggerHeight, 1);
  }

  get computedPageTag(): string | void {
    const { tag } = this;
    if (tag === 'ol' || tag === 'ul') return 'li';
    return this.pageTag;
  }

  get currentPage(): number {
    return this.internalPage;
  }

  set currentPage(page: number) {
    const before = this.internalPage;
    if (before !== page) {
      this.internalPage = page;
      this.$emit('change:page', page);
    }
  }

  get computedPageJudgePosition(): number {
    return toNumber(this.pageJudgePosition) / 100;
  }

  get hasPrevious(): boolean {
    const page = this.computedPages[0];
    return !!page && page.page !== 1;
  }

  get paused(): boolean {
    return this.innerPaused;
  }

  pageAt(page: number): ComputedPageData<M> | undefined {
    return this.computedPages.find(p => p.page === page);
  }

  private isDestroyed: boolean = false;
  private internalPage: number = this.page;
  private internalFinished: boolean = false;
  private loadingActive = { prev: false, next: false };
  private debounceId: { prev: null | number; next: null | number } = {
    prev: null,
    next: null,
  };
  private requestErrors: { prev: any; next: any } = { prev: null, next: null };
  private innerPaused: boolean = false;

  private setPageData(page: PageData<M>) {
    const pages = this.pages.slice();
    const oldData = pages.find(p => p.page === page.page);
    if (oldData) {
      const index = pages.indexOf(oldData);
      pages[index] = page;
    } else {
      pages.push(page);
    }

    this.$emit('update:pages', pages);
  }

  private createPages(h = this.$createElement): VNode[] {
    const {
      computedPages,
      $scopedSlots,
      computedPageTag,
      pageClass,
      pageAttrs,
      currentPage,
    } = this;

    const pageSlot = $scopedSlots.page;
    if (!pageSlot)
      throw error('A v-slot:page is necessary for this component to work.');

    const $pages = computedPages.map(page => {
      const { active } = page;
      let height: number | undefined;

      if (!this.$isServer) {
        const oldVm =
          this.$refs.pages && this.$refs.pages.find(p => p.page === page.page);
        if (!active) {
          if (oldVm) {
            if (oldVm.active) {
              height = (oldVm.$el as HTMLElement).offsetHeight;
            } else {
              height = oldVm.height;
            }
          }
        } else if (page.page < currentPage) {
          const beforeHeight = oldVm ? (oldVm.height as number) : 0;
          this.$nextTick(() => {
            if (this.isDestroyed) return;
            const newVm =
              oldVm || this.$refs.pages.find(p => p.page === page.page);
            if (!newVm) return;
            const newHeight = (newVm.$el as HTMLElement).offsetHeight;
            const diff = newHeight - beforeHeight;
            if (Math.abs(diff) > 0) {
              const gotoTop = this.scroller.scrollTop + diff;
              this.scroller.scrollTop = gotoTop;
            }
          });
        }
      }

      const children = active ? pageSlot(page) : undefined;
      return h(
        DDInfinitePage,
        {
          class: pageClass,
          props: {
            page: page.page,
            tag: computedPageTag,
            active,
            height,
          },
          attrs: {
            'data-dd-infinite-page': page.page,
            ...pageAttrs,
          },
          key: page.page,
          ref: 'pages',
          refInFor: true,
        },
        children,
      );
    });
    return $pages;
  }

  private clearDebounce(type?: LoadingType) {
    if (!type) {
      this.clearDebounce('prev');
      this.clearDebounce('next');
      return;
    }

    const id = this.debounceId[type];
    if (id !== null) {
      clearTimeout(id);
      this.debounceId[type] = null;
    }
  }

  private async safeGetRequestResult(
    page: number,
    type: LoadingType,
  ): Promise<RequestResult<M>> {
    let result = this.request({ page, type, scroll: this });
    if (isPromise(result)) result = await result;
    result && this.setPageData(result);
    return result;
  }

  private async requestPrev(page: number): Promise<void> {
    try {
      await this.safeGetRequestResult(page, 'prev');
    } catch (err) {
      this.requestErrors.prev = err;
      throw err;
    }
  }

  private async requestNext(page: number): Promise<void> {
    try {
      const result = await this.safeGetRequestResult(page, 'next');
      this.finished =
        !result || (typeof result.finished === 'boolean' && result.finished);
    } catch (err) {
      this.requestErrors.next = err;
      throw err;
    }
  }

  private setDebounce(type: LoadingType) {
    if (this.$isServer) return;
    if (this.debounceId[type] === null) {
      this.debounceId[type] = window.setTimeout(async () => {
        if (this.isDestroyed) return;
        this.loadingActive[type] = true;
        const isPrev = type === 'prev';
        const ammount = isPrev ? -1 : 1;
        const page = this.page + ammount;
        let error: any;

        try {
          if (isPrev) {
            await this.requestPrev(page);
          } else {
            await this.requestNext(page);
          }
        } catch (err) {
          error = err;
        }

        this.debounceId[type] = null;
        this.loadingActive[type] = false;

        if (error) throw error;
      }, this.computedDebounce[type]);
    }
  }

  private checkCurrentPage() {
    if (this.$isServer) return;
    const { scroller, computedPageJudgePosition, margin, $refs } = this;
    const { scrollTop, containerHeight } = scroller;

    const { pages } = $refs;
    if (!pages) return;

    const areaHeight = containerHeight - margin.top - margin.bottom;
    const judgePosition =
      areaHeight * computedPageJudgePosition + margin.top + scrollTop;

    let minDistance: number | null = null;
    let $currentPage: DDInfinitePage | null = null;

    for (let i = 0, l = pages.length; i < l; i++) {
      const $page = pages[i];
      const $el = $page.$el as HTMLElement;
      const { offsetTop, offsetHeight } = $el;
      const distance = Math.min(
        Math.abs(judgePosition - offsetTop),
        Math.abs(judgePosition - (offsetTop + offsetHeight)),
      );

      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        $currentPage = $page;
      }
    }
    if ($currentPage) {
      this.currentPage = $currentPage.page;
    }
  }

  private pause() {
    if (this.paused) return;
    this.innerPaused = true;
  }

  private resume() {
    if (!this.paused) return;
    this.$nextTick(() => {
      this.scroller.update();
      this.scrollTick();
    });
    this.innerPaused = false;
  }

  private scrollTick() {
    if (this.$isServer || this.paused || this.isDestroyed) return;

    const {
      scroller,
      margin,
      triggerHeight,
      computedLoadingHeight,
      hasPrevious,
      finished,
    } = this;
    this.checkCurrentPage();
    const { scrollTop, scrollBottom } = scroller;

    if (hasPrevious) {
      const visibleTopHeight = Math.max(
        computedLoadingHeight + margin.top - scrollTop,
        0,
      );
      const isActive = visibleTopHeight >= triggerHeight;
      if (isActive) {
        this.setDebounce('prev');
      } else {
        this.clearDebounce('prev');
      }
    }

    if (!finished) {
      const visibleBottomHeight = Math.max(
        computedLoadingHeight - scrollBottom - margin.bottom,
        0,
      );
      const isActive = visibleBottomHeight >= triggerHeight;
      if (isActive) {
        this.setDebounce('next');
      } else {
        this.clearDebounce('next');
      }
    }
  }

  private start() {
    this.scroller.immediate('scroll', this.scrollTick, { tag: this });
  }

  private stop() {
    this.scroller.off('scroll', { tag: this });
    this.clearDebounce();
  }

  private async initialLoad() {
    const { page } = this;
    const promiseList: Promise<any>[] = [];
    if (page > 0) {
      promiseList.push(this.requestNext(page));
      if (page > 1) promiseList.push(this.requestPrev(page - 1));
    }
    await promiseList;
  }

  private createLoading(type: LoadingType, h = this.$createElement): VNode {
    const props: LoadingScopedProps = {
      type,
      scroll: this,
      color: this.loadingColor,
      height: this.computedLoadingHeight,
      value: this.loadingActive[type],
    };
    const loadingSlot = this.$scopedSlots.loading;
    const children = loadingSlot ? loadingSlot(props) : undefined;

    return h(
      DDInfiniteLoading,
      {
        props,
        attrs: {
          'dd-infinite-loading': type,
        },
        ref: type + 'Loading',
      },
      children,
    );
  }

  protected async created() {
    await this.initialLoad();
  }

  protected mounted() {
    this.start();
  }

  protected activated() {
    this.resume();
  }

  protected deactivated() {
    this.pause();
  }

  protected beforeDestroy() {
    this.stop();
    this.isDestroyed = true;
  }

  protected render(h: CreateElement) {
    const pages = this.createPages();
    const $pages = h(
      this.tag,
      {
        attrs: {
          'dd-infinite-pages': '',
        },
      },
      pages,
    );
    const children: VNode[] = [];
    if (this.hasPrevious) children.push(this.createLoading('prev'));
    children.push($pages);
    if (!this.finished) children.push(this.createLoading('next'));

    return h(
      'div',
      {
        attrs: {
          'dd-infinite-scroll': '',
        },
      },
      children,
    );
  }
}

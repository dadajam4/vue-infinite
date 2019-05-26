import { CreateElement, VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import DDInfinitePage from './DDInfinitePage';
import DDInfiniteLoading from './DDInfiniteLoading.vue';
import Scroller from '@dadajam4/scroller';
export declare type LoadingType = 'prev' | 'next';
export interface DebounceDefine {
    prev: number;
    next: number;
}
export interface RequestTarget {
    page: number;
    type: LoadingType;
    scroll: DDInfiniteScroll;
}
export declare type RequestResult = PageData | void;
export declare type DDInfiniteScrollRequest = (target: RequestTarget) => RequestResult;
export interface PageData {
    page: number;
    data?: any;
    finished?: boolean;
}
export interface ComputedPageData extends PageData {
    active: boolean;
}
export interface LoadingScopedProps {
    type: LoadingType;
    scroll: DDInfiniteScroll;
    color?: string;
    height: number;
    value: boolean;
}
export declare const MIN_DEBOUNCE = 0;
export default class DDInfiniteScroll extends Vue {
    $refs: {
        pages: DDInfinitePage[];
        prevLoading: DDInfiniteLoading;
        nextLoading: DDInfiniteLoading;
    };
    scroller: Scroller;
    pages: PageData[];
    page: number;
    tag: string;
    pageTag?: string;
    pageClass?: string;
    pageAttrs?: object;
    loadingColor?: string;
    loadingHeight: string | number;
    triggerPerHeight: string | number;
    marginTop: string | number;
    marginBottom: string | number;
    debounce: string | number | DebounceDefine;
    pageJudgePosition: string | number;
    request: DDInfiniteScrollRequest;
    maxActivePage?: number | string;
    readonly computedActivePages: ComputedPageData[];
    readonly computedPages: ComputedPageData[];
    readonly computedMaxActivePage: number | undefined;
    readonly computedDebounce: DebounceDefine;
    finished: boolean;
    readonly computedLoadingHeight: number;
    readonly computedTriggerPerHeight: number;
    readonly margin: {
        top: number;
        bottom: number;
    };
    readonly triggerHeight: number;
    readonly computedPageTag: string | void;
    currentPage: number;
    readonly computedPageJudgePosition: number;
    readonly hasPrevious: boolean;
    readonly paused: boolean;
    pageAt(page: number): ComputedPageData | undefined;
    private isDestroyed;
    private internalPage;
    private internalFinished;
    private loadingActive;
    private debounceId;
    private requestErrors;
    private innerPaused;
    private setPageData;
    private createPages;
    private clearDebounce;
    private safeGetRequestResult;
    private requestPrev;
    private requestNext;
    private setDebounce;
    private checkCurrentPage;
    private pause;
    private resume;
    private scrollTick;
    private start;
    private stop;
    private initialLoad;
    private createLoading;
    protected created(): Promise<void>;
    protected mounted(): void;
    protected activated(): void;
    protected deactivated(): void;
    protected beforeDestroy(): void;
    protected render(h: CreateElement): VNode;
}

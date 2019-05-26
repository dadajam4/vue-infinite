import { CreateElement } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class DDInfiniteLoading extends Vue {
    $style: {
        [key: string]: string;
    };
    type: string;
    tag: string;
    color?: string;
    height: number;
    transition: string | number;
    value: boolean;
    readonly computedTransition: string;
    readonly styles: {
        color: string | undefined;
        height: string;
        opacity: string;
        transition: string;
    };
    readonly spinnerSize: number;
    protected render(h: CreateElement): import("vue").VNode;
}

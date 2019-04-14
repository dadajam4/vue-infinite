import { CreateElement } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class DDInfinitePage extends Vue {
    page: number;
    tag: string;
    active: boolean;
    height?: number;
    readonly styles: {
        height: string;
    } | undefined;
    protected render(h: CreateElement): import("vue").VNode;
}

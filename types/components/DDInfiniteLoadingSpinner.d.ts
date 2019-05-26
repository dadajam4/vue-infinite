import { CreateElement, VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class DDInfiniteLoadingSpinner extends Vue {
    $style: {
        [key: string]: string;
    };
    button: boolean;
    indeterminate: boolean;
    rotate: number | string;
    size: number | string;
    width: number | string;
    value: number | string;
    readonly calculatedSize: number;
    readonly circumference: number;
    readonly classes: object;
    readonly normalizedValue: number;
    readonly radius: number;
    readonly strokeDashArray: number;
    readonly strokeDashOffset: string;
    readonly strokeWidth: number;
    readonly styles: object;
    readonly svgStyles: object;
    readonly viewBoxSize: number;
    private genCircle;
    private genSvg;
    protected render(h: CreateElement): VNode;
}

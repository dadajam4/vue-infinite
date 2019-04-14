import { CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import DDInfiniteLoadingSpinner from './DDInfiniteLoadingSpinner.vue';

const MIN_SPINNER_HEIGHT = 32;

@Component({
  name: 'dd-infinite-loading',
})
export default class DDInfiniteLoading extends Vue {
  $style!: { [key: string]: string };

  @Prop({ type: String, required: true }) type!: string;
  @Prop({ type: String, default: 'div' }) tag!: string;
  @Prop({ type: String }) color?: string;
  @Prop({ type: Number, required: true }) height!: number;
  @Prop({ type: [String, Number], default: 250 }) transition!: string | number;
  @Prop({ type: Boolean }) value!: boolean;

  get computedTransition(): string {
    let { transition } = this;
    if (typeof transition === 'number') transition = String(transition);
    if (transition.match(/^[\d]+$/)) transition += 'ms';
    if (transition.match(/^[\d]+m?s$/)) transition = 'opacity ' + transition;
    return transition;
  }

  get styles() {
    const { height, computedTransition } = this;
    return {
      color: this.color,
      height: height + 'px',
      opacity: this.value ? '1' : '0',
      transition: computedTransition,
    };
  }

  get spinnerSize(): number {
    const { height } = this;
    let size = height * 0.6;
    if (size < MIN_SPINNER_HEIGHT) size = Math.min(height, MIN_SPINNER_HEIGHT);
    return size;
  }

  protected render(h: CreateElement) {
    const defaultSlot = this.$slots.default;
    const children = defaultSlot || [
      h(DDInfiniteLoadingSpinner, {
        props: {
          size: this.spinnerSize,
          indeterminate: true,
        },
      }),
    ];

    return h(
      this.tag,
      {
        staticClass: this.$style['dd-infinite-loading'],
        style: this.styles,
      },
      children,
    );
  }
}

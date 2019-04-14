import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'dd-infinite-loading-spinner',
})
export default class DDInfiniteLoadingSpinner extends Vue {
  $style!: { [key: string]: string };

  @Prop(Boolean) button!: boolean;
  @Prop(Boolean) indeterminate!: boolean;
  @Prop({ type: [Number, String], default: 0 }) rotate!: number | string;
  @Prop({ type: [Number, String], default: 32 }) size!: number | string;
  @Prop({ type: [Number, String], default: 4 }) width!: number | string;
  @Prop({ type: [Number, String], default: 0 }) value!: number | string;

  get calculatedSize(): number {
    return Number(this.size) + (this.button ? 8 : 0);
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get classes(): object {
    return {
      [this.$style['dd-infinite-loading-spinner--indeterminate']]: this
        .indeterminate,
      [this.$style['dd-infinite-loading-spinner--button']]: this.button,
    };
  }

  get normalizedValue(): number {
    if (this.value < 0) {
      return 0;
    }

    if (this.value > 100) {
      return 100;
    }

    return parseFloat(this.value as string);
  }

  get radius(): number {
    return 20;
  }

  get strokeDashArray(): number {
    return Math.round(this.circumference * 1000) / 1000;
  }

  get strokeDashOffset(): string {
    return ((100 - this.normalizedValue) / 100) * this.circumference + 'px';
  }

  get strokeWidth(): number {
    return (Number(this.width) / +this.size) * this.viewBoxSize * 2;
  }

  get styles(): object {
    return {
      height: `${this.calculatedSize}px`,
      width: `${this.calculatedSize}px`,
    };
  }

  get svgStyles(): object {
    return {
      transform: `rotate(${Number(this.rotate)}deg)`,
    };
  }

  get viewBoxSize(): number {
    return this.radius / (1 - Number(this.width) / +this.size);
  }

  private genCircle(
    h: CreateElement,
    name: string,
    offset: string | number,
  ): VNode {
    return h('circle', {
      class: this.$style[`dd-infinite-loading-spinner__${name}`],
      attrs: {
        fill: 'transparent',
        cx: 2 * this.viewBoxSize,
        cy: 2 * this.viewBoxSize,
        r: this.radius,
        'stroke-width': this.strokeWidth,
        'stroke-dasharray': this.strokeDashArray,
        'stroke-dashoffset': offset,
      },
    });
  }

  private genSvg(h: CreateElement): VNode {
    const children = [
      this.indeterminate || this.genCircle(h, 'underlay', 0),
      this.genCircle(h, 'overlay', this.strokeDashOffset),
    ];

    return h(
      'svg',
      {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: `${this.viewBoxSize} ${this.viewBoxSize} ${2 *
            this.viewBoxSize} ${2 * this.viewBoxSize}`,
        },
      },
      children,
    );
  }

  protected render(h: CreateElement): VNode {
    const info = h(
      'div',
      { staticClass: this.$style['dd-infinite-loading-spinner__info'] },
      this.$slots.default,
    );
    const svg = this.genSvg(h);

    return h(
      'div',
      {
        staticClass: this.$style['dd-infinite-loading-spinner'],
        attrs: {
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          'aria-valuenow': this.indeterminate
            ? undefined
            : this.normalizedValue,
        },
        class: this.classes,
        style: this.styles,
        on: this.$listeners,
      },
      [svg, info],
    );
  }
}

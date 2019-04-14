import { CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'dd-infinite-page',
})
export default class DDInfinitePage extends Vue {
  @Prop({ type: Number, required: true }) page!: number;
  @Prop({ type: String, default: 'div' }) tag!: string;
  @Prop({ type: Boolean }) active!: boolean;
  @Prop({ type: [Number] }) height?: number;

  get styles() {
    const { height } = this;
    return height === undefined ? undefined : { height: height + 'px' };
  }

  protected render(h: CreateElement) {
    return h(
      this.tag,
      {
        style: this.styles,
      },
      this.$slots.default,
    );
  }
}

import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'mock-expansion',
})
export default class MockExpansion extends Vue {
  @Prop({ type: String, default: 'Toggle' }) activatorLabel!: string;

  private active: boolean = false;

  protected render(h: CreateElement) {
    const children: VNode[] = [
      h(
        'button',
        {
          on: {
            click: (e: MouseEvent) => {
              e.stopPropagation();
              this.active = !this.active;
            },
          },
        },
        this.activatorLabel,
      ),
    ];

    if (this.active) {
      children.push(h('div', undefined, this.$slots.default));
    }

    return h('div', undefined, children);
  }
}

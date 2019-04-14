import { CreateElement, VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class MockExpansion extends Vue {
    activatorLabel: string;
    private active;
    protected render(h: CreateElement): VNode;
}

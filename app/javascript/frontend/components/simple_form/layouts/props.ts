import { PropType } from 'vue';
import Validations from '../Validations';

export const props = defineProps({
label: { type: String, required: false },
code: { type: String, required: true },
validations: { type: Object as PropType<Validations>, required: false },
validation: { type: Object as PropType<Validation>, required: false },
disableds: { type: Object, required: false, default: () => ({}) },
});

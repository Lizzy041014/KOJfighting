import axios from 'axios';
import { ref } from 'vue';

interface OptionType {
    value: number;
    label: string;
}



let totalpagesizeRef = ref(0);
let currentPage = ref(1);
let options = ref<OptionType[]>([]);
let selectedLabels = ref<number[]>([]);
let onSelectChange = (selectedValues: number[]) => {
    selectedLabels.value = selectedValues;
};

let getLabelClass = (difficulty: string) => {
    switch (difficulty) {
        case '低':
            return 'label-success';
        case '中':
            return 'label-info';
        case '高':
            return 'label-warning';
        default:
            return '';
    }
};

export {
    totalpagesizeRef,
    currentPage,
    options,
    selectedLabels,
    onSelectChange,
    getLabelClass,

};
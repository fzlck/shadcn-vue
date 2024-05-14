<script setup lang="ts">
import { computed } from 'vue'

import type { Column } from '@tanstack/vue-table'
import type { Order } from '../data/schema'


interface FilterProps {
  column?: Column<Order, any> 
}

const props = defineProps<FilterProps>()

const selectedValues = computed(() => (props.column?.getFilterValue()))
console.log(selectedValues)

// props.column.setFilterValue('apprehended')


import { ref } from 'vue';

const selectedOption = ref<string | null>(null);
const options = [
  { label: 'Option 1', value: 'apprehended' },
  { label: 'Option 2', value: 'completed' },
  { label: 'Option 3', value: 'closed' },
  // Add more options as needed
];

function handleOptionChange(): void {
  if (selectedOption.value) {
    props.column?.setFilterValue(selectedOption.value);
    // console.log(selectedOption.value)
    // alert(`Selected label: ${options.find(opt => opt.value === selectedOption.value)?.label}`);
  }

}

const selectedValue = computed(() => props.column?.getFilterValue())
console.log(selectedValue);


</script>

<template>
 <div>
    <select v-model="selectedValue" @change="handleOptionChange">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <button @click="column?.setFilterValue(undefined)">Clear</button>
  </div>
  
</template>

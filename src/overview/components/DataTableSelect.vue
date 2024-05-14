<script setup lang="ts">
import { computed } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Column } from '@tanstack/vue-table';
import type { Order } from '../data/schema'


// Define props

interface DataTableSelectProps {
  placeholder: string;
  label: string;
  options: {value: string; label: string}[];
  column: any
}
const props = defineProps<DataTableSelectProps>();
console.log(props.column)
const valueChange = (value: any) => console.log(value);
// const columnFilterValue = props.column?.getFilterValue()
// console.log(columnFilterValue)



</script>

<template>
  <Select @change="valueChange">
    <SelectTrigger class="w-[180px] h-8 mb-2">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ label }}</SelectLabel>
        <SelectItem
          v-for="option in options"
          :value="option.value"
          :key="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

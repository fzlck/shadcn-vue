<script setup lang="ts">

import { ref } from 'vue';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const emit = defineEmits(['update:week', 'update:year']);
const selectedWeek = ref('');
const selectedYear = ref('');

const weeks = Array.from({ length: 52 }, (_, i) => i + 1 < 10 ? `0${String(i + 1)}`: String(i + 1));
const startYear = 2010;
const endYear = 2100;
const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => String(startYear + i));


const handleYearChange = (year: any) => {
  selectedYear.value = year;
  emit('update:year', year);
};

const handleWeekChange = (week: any) => {
  selectedWeek.value = week;
  emit('update:week', week);
};


</script>

<template>
  <div class="flex space-x-1">
    <div class="w-1/2">
      <Select v-model="selectedYear" @update:modelValue="handleYearChange">
        <SelectTrigger class="h-8">
          <SelectValue placeholder="----" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="-">----</SelectItem>
            <SelectItem v-for="year in years" :key="year" :value="year">{{ year }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="w-1/2">
      <Select v-model="selectedWeek" id="week" @update:modelValue="handleWeekChange">
        <SelectTrigger class="h-8">
          <SelectValue placeholder="--" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="-">--</SelectItem>
            <SelectItem v-for="week in weeks" :key="week" :value="week">{{ week }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ref, watch, onMounted } from 'vue';

interface PlannedDeliveryWeek {
  plannedDeliveryWeek: string | undefined,
}

const props = defineProps<PlannedDeliveryWeek>();
const emit = defineEmits(['update:plannedDeliveryWeek']);

const selectedWeek = ref('');
const selectedYear = ref('');

const initializeValues = () => {
  if (props.plannedDeliveryWeek) {
    const deliveryWeek = props.plannedDeliveryWeek.split('-');
    selectedYear.value = deliveryWeek[0];
    selectedWeek.value = deliveryWeek[1];
  }
};

onMounted(initializeValues);

watch(() => props.plannedDeliveryWeek, (newVal) => {
  if (newVal) {
    initializeValues();
  }
});

const weeks = Array.from({ length: 52 }, (_, i) => (i + 1 < 10 ? `0${String(i + 1)}` : String(i + 1)));
const startYear = 2010;
const endYear = 2100;
const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => String(startYear + i));

watch([selectedYear, selectedWeek], ([newYear, newWeek]) => {
  if (newYear && newWeek) {
    emit('update:plannedDeliveryWeek', `${newYear}-${newWeek}`);
  }
});

const handleYearChange = (year: string) => {
  selectedYear.value = year;
};

const handleWeekChange = (week: string) => {
  selectedWeek.value = week;
};
</script>

<template>
  <div class="flex space-x-1">
    <div class="w-1/2">
      <Select v-model="selectedYear" @update:modelValue="handleYearChange">
        <SelectTrigger>
          <SelectValue :placeholder="$t('yyyy')" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="year in years" :key="year" :value="year">{{ year }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="w-1/2">
      <Select v-model="selectedWeek" @update:modelValue="handleWeekChange">
        <SelectTrigger>
          <SelectValue placeholder="WW" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="week in weeks" :key="week" :value="week">{{ week }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>


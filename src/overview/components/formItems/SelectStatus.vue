<script setup lang="ts">
import SelectComponent from './SelectComponent.vue';
import { statuses } from '../../data/data';

interface SelectStatusProps {
  componentField: any,
}
const props = defineProps<SelectStatusProps>();
</script>

<template>
  <SelectComponent 
    :componentField="props.componentField" 
    :placeholder="$t('select_status')" 
    :options="statuses" 
  />
</template>
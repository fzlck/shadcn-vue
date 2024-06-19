<script setup lang="ts">
import SelectComponent from './SelectComponent.vue';
import { dealers } from '../../data/data';

interface SelectStatusProps {
  componentField: any,
}
const props = defineProps<SelectStatusProps>();
</script>

<template>
  <SelectComponent 
    :componentField="props.componentField" 
    :placeholder="$t('select_dealer')" 
    :options="dealers"
  />
</template>
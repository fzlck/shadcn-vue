<script setup lang="ts">
import { FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectComponentProps {
  componentField: any,
  placeholder: string,
  options: Array<any>
}

const props = defineProps<SelectComponentProps>();
</script>

<template>
  <Select v-bind="props.componentField">
    <FormControl>
      <SelectTrigger>
        <SelectValue :placeholder="props.placeholder" />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="option in props.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped>
</style>

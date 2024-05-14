<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FormControl,
} from '@/components/ui/form'

import { dealers } from '../data/data';
interface DealerOption {
  label: string
  value: string
}

const dealerOptions: DealerOption[] = dealers

interface SelectDealerProps {
  modelValue: string
  'onUpdate:modelValue': (value: string) => void
}

const props = defineProps<SelectDealerProps>()
const emit = defineEmits(['update:modelValue'])


const handleValueChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
<Select v-model="props.modelValue" @update:value="handleValueChange">
    <FormControl>
      <SelectTrigger>
        <SelectValue placeholder="Select a dealer">
          <!-- <SelectValueLabel> -->
            {{ dealerOptions.find((option) => option.value === props.modelValue)?.label || 'Select a dealer' }}
          <!-- </SelectValueLabel> -->
        </SelectValue>
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="option in dealerOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
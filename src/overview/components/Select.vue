<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ref } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
}

const props = defineProps<Props>()

const selectedOption = ref<Option | null>(null)

const handleOptionSelect = (option: Option) => {
  selectedOption.value = option
  alert(selectedOption);
}
</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue v-if="selectedOption" :placeholder="selectedOption.label" />
      <SelectValue v-else placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Options</SelectLabel>
        <SelectItem
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
          @click="handleOptionSelect(option)"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
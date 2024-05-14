<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { Order } from '../data/schema'
import { Input } from '@/components/ui/input'

interface DataTableInputFilterProps {
  table: Table<Order>
  column: string,
  placeholder: string,
}
const props = defineProps<DataTableInputFilterProps>()

</script>

<template>
  <Input :placeholder="placeholder" :model-value="(table.getColumn(column)?.getFilterValue() as string) ?? ''"
    class="h-8 w-[100px] lg:w-[150px]" @input="table.getColumn(column)?.setFilterValue($event.target.value)" />
</template>
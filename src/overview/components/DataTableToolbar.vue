<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { Order } from '../data/schema'

import { statuses, dealers } from '../data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import { Cross2Icon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import OrderDetailsForm from './OrderDetailsForm.vue'

import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

interface DataTableToolbarProps {
  table: Table<Order>
}
const props = defineProps<DataTableToolbarProps>()

const { t } = useI18n();
const router = useRouter();

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)


</script>

<template>
  <div class="flex items-center justify-between">
    <Button variant="outline" class="shadow-md" @click="router.push('/new-order')">{{ t('new_order') }}</Button>
    <div class="flex flex-1 items-center space-x-2">
      <!-- <Input
        placeholder="Filter Com_No"
        :model-value="(table.getColumn('com_no')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[150px]"
        @input="table.getColumn('com_no')?.setFilterValue($event.target.value)"
      /> -->
      <!-- <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      /> -->
      <!-- <Input
        placeholder="Filter Order Date"
        :model-value="(table.getColumn('order_date')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[150px]"
        @input="table.getColumn('order_date')?.setFilterValue($event.target.value)"
      /> -->
      <!-- <DataTableFacetedFilter
        v-if="table.getColumn('dealer')"
        :column="table.getColumn('dealer')"
        title="Dealer"
        :options="dealers"
      /> -->
      <!-- <Input
        placeholder="Filter Last Status"
        :model-value="(table.getColumn('last_status')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[150px]"
        @input="table.getColumn('last_status')?.setFilterValue($event.target.value)"
      />
      <Input
        placeholder="Filter Address"
        :model-value="(table.getColumn('address')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[150px]"
        @input="table.getColumn('address')?.setFilterValue($event.target.value)"
      />
      <Input
        placeholder="Filter Customer"
        :model-value="(table.getColumn('customer')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[150px]"
        @input="table.getColumn('customer')?.setFilterValue($event.target.value)"
      />
      <Input
        placeholder="Filter Salesman"
        :model-value="(table.getColumn('salesman')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[150px]"
        @input="table.getColumn('salesman')?.setFilterValue($event.target.value)"
      />
      <Input
        placeholder="Filter Date of Installation"
        :model-value="(table.getColumn('date_of_installation')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[180px]"
        @input="table.getColumn('date_of_installation')?.setFilterValue($event.target.value)"
      />
      <Input
        placeholder="Filter Planned Delivery Week"
        :model-value="(table.getColumn('planned_delivery_week')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[100px] lg:w-[200px]"
        @input="table.getColumn('planned_delivery_week')?.setFilterValue($event.target.value)"
      /> -->

      <!-- <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button> -->
    </div>
    <!-- <DataTableViewOptions :table="table" /> -->
  </div>
</template>
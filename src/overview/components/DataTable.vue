<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table';
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';

import { ref } from 'vue';
import type { Order } from '../data/schema';

import DataTablePagination from './DataTablePagination.vue';
import DataTableFacetedFilter from './DataTableFacetedFilter.vue';

import { valueUpdater, cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import WeekFilter from './WeekFilter.vue';
import DataTableToolbar from './DataTableToolbar.vue';

interface DataTableProps {
  columns: ColumnDef<any>[];
  data: any[];
}
const props = defineProps<DataTableProps>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  enableRowSelection: true,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
});

console.log(table.getHeaderGroups());

const selectedYear = ref('');
const selectedWeek = ref('');
const handleWeekUpdate = (week: string) => {
  if (week === '-') {
    selectedWeek.value = '';
  } else {
    selectedWeek.value = week;
  }
  table.getColumn('planned_delivery_week')?.setFilterValue(`${selectedYear.value}-${selectedWeek.value}`)
};
const handleYearUpdate = (year: string) => {
  if (year === '-') {
    selectedYear.value = '';
  } else {
    selectedYear.value = year;
  }
  table.getColumn('planned_delivery_week')?.setFilterValue(`${selectedYear.value}-${selectedWeek.value}`)
};
</script>

<template>
  <div class="space-y-2">
    <DataTableToolbar :table="table"/>
    <div class="rounded-md border-dark">
      <div class="h-[75vh] relative overflow-auto rounded-md">
        <Table>
          <TableHeader class="sticky z-20 top-0">
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead v-for="header in headerGroup.headers" :key="header.id" :class="cn(header.column.columnDef.meta?.sticky ?? '', 'bg-slate-800')">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                  class="mt-1 text-[#E0E4EE]"
                />
                <div class="my-2">
                  <template
                    v-if="
                      header.column.columnDef.meta?.filterVariant === 'select'
                    "
                  >
                    <DataTableFacetedFilter
                      v-if="table.getColumn(header.id)"
                      :column="table.getColumn(header.id)"
                      :title="header.column.columnDef.meta?.title"
                      :options="header.column.columnDef.meta?.options"
                    />
                  </template>
                  <template v-else-if="header.column.columnDef.meta?.filterVariant === 'week'">
                    <WeekFilter @update:year="handleYearUpdate" @update:week="handleWeekUpdate"/>
                  </template>
                  <template v-else>
                    <Input
                      class="h-8"
                      v-if="table.getColumn(header.id)?.getCanFilter()"
                      :model-value="(table.getColumn(header.id)?.getFilterValue() as string) ?? ''"
                      :type="
                        header.column.columnDef.meta?.filterVariant || 'text'
                      "
                      @input="table.getColumn(header.id)?.setFilterValue($event.target.value)"
                    />
                  </template>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() && 'selected'"
              >
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" :class="cn(cell.column.columnDef.meta?.sticky ?? '')">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
            </template>

            <TableRow v-else>
              <TableCell :colspan="columns.length" class="h-24 text-center"
                >{{ $t('no_results') }}</TableCell
              >
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    <DataTablePagination :selectable="true" :table="table" />
  </div>
</template>

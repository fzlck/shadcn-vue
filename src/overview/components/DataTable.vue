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

import {ref} from 'vue';
import type {Order} from '../data/schema';

import DataTablePagination from './DataTablePagination.vue';
import DataTableFacetedFilter from './DataTableFacetedFilter.vue';

import {valueUpdater} from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Input} from '@/components/ui/input';


interface DataTableProps {
  columns: ColumnDef<Order, any>[];
  data: Order[];
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
import CalendarWithSelect from './CalendarWithSelect.vue';
</script>

<template>
  <div class="space-y-4">
    <div class="rounded-md border">
      <div class="h-[78vh] relative overflow-auto">
        <Table>
          <TableHeader class="sticky z-20 top-0 bg-slate-100">
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                  class="mt-1"
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
                  <template v-else>
                    <Input
                      class="h-8"
                      v-if="table.getColumn(header.id)?.getCanFilter()"
                      :model-value="(table.getColumn(header.id)?.getFilterValue() as string) ?? ''"
                      :type="
                        header.column.columnDef.meta?.filterVariant || 'text'
                      "
                      @input="
                        if (header.column.columnDef.meta?.filterVariant === 'week') {
                          let week = $event.target.value
                          if (week === '') {
                            table.getColumn(header.id)?.setFilterValue('')
                          }
                          if (week) {
                            const weekRegex = /^(\d{4})-W(\d{1,2})$/
                            const isValidWeekFormat = week.match(weekRegex)
                            if (isValidWeekFormat) {
                              table.getColumn(header.id)?.setFilterValue(week)
                            } else {
                              const otherWeekRegex = /^(\d{4})-?(\d{1,2})$/
                              const match = week.match(otherWeekRegex);
                              if (match !== null) {
                                const [, year, weekNum] = match;
                                const validWeek = `${year}-W${weekNum}`;
                                table.getColumn(header.id)?.setFilterValue(validWeek);
                              }
                            }
                          }
                        } else {
                          table
                            .getColumn(header.id)
                            ?.setFilterValue($event.target.value)
                        }
                      "
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
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
            </template>

            <TableRow v-else>
              <TableCell :colspan="columns.length" class="h-24 text-center"
                >No results.</TableCell
              >
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>

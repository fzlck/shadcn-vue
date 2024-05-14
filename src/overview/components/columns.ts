import type { ColumnDef, RowData } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Component } from 'vue'

import { statuses, dealers } from '../data/data'
import type { Order } from '../data/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'

declare module '@tanstack/vue-table' {
  // allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'select' | 'date' | 'week',
    options?: {
      label: string
      value: string
      icon?: Component
    }[]
    title?: string
  }
}


const formatDate = (dateString: string) => {
  if (!dateString) {
    return
  }
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`
}

const formatWeek = (weekString: string) => {
  if (!weekString) {
    return
  }
  const [year, weekPart] = weekString.split('-W');
  const week = weekPart.replace('W', '');

  return `${year}-${week}`;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'type',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-28', column, title: 'Type' }),
    cell: ({ row }) => h('div', { class: 'w-28' }, row.getValue('type')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'com_no',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-24', column, title: 'Com_No' }),
    cell: ({ row }) => h('div', { class: 'w-24' }, row.getValue('com_no')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),

    cell: ({ row }) => {
      const status = statuses.find(
        status => status.value === row.getValue('status'),
      )

      if (!status)
        return null

      return h('div', { class: 'flex w-[120px] items-center' }, [
        status.icon && h(status.icon, { class: 'mr-2 h-4 w-4 text-muted-foreground' }),
        h('span', status.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'select',
      options: statuses,
      title: 'Select Status',
    }
  },
  {
    accessorKey: 'order_date',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: 'Order Date' }),
    cell: ({ row }) => h('div', { class: 'w-20' }, formatDate(row.getValue('order_date'))),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'date'
    }
  },
  {
    accessorKey: 'dealer',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Dealer' }),
    cell: ({ row }) => {
      const dealer = dealers.find(
        dealer => dealer.value === row.getValue('dealer')
      )
      if (!dealer)
        return null

      return h('div', { class: 'flex w-[120px] items center'}, [
        h('span', dealer.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'select',
      options: dealers,
      title: 'Select Dealer',

    }
  },
  {
    accessorKey: 'last_status',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: 'Last Status' }),
    cell: ({ row }) => h('div', { class: 'w-36' }, formatDate(row.getValue('last_status'))),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'date'
    }
  },
  {
    accessorKey: 'address',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-40', column, title: 'Address' }),
    cell: ({ row }) => h('div', { class: 'w-40' }, row.getValue('address')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: 'Customer' }),
    cell: ({ row }) => h('div', { class: 'w-36' }, row.getValue('customer')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'salesman',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: 'Salesman' }),
    cell: ({ row }) => h('div', { class: 'w-36' }, row.getValue('salesman')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date_of_installation',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: 'Date of Installation' }),
    cell: ({ row }) => h('div', { class: 'w-36' }, formatDate(row.getValue('date_of_installation'))),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'date'
    }
  },
  {
    accessorKey: 'planned_delivery_week',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-44', column, title: 'Planned Delivery Week' }),
    cell: ({ row }) => h('div', { class: 'w-44' }, formatWeek(row.getValue('planned_delivery_week'))),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'week'
    }
  },
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
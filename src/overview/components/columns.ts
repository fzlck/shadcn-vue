import { useTranslation } from '../../i18n.utils';
const t = useTranslation();

import type { ColumnDef, RowData } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Component } from 'vue'

import { statuses, dealers } from '../data/data'
import type { Order } from '../data/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { convertToDDMMYYYY } from '@/lib/utils';

declare module '@tanstack/vue-table' {
  // allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'select' | 'date' | 'week',
    options?: {
      label: string
      value: string
      icon?: Component
    }[]
    title?: string,
    sticky?: string,
  }
}


const formatDate = (dateString: string) => {
  if (!dateString) {
    return
  }
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'type',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-28', column, title: t('type') }),
    cell: ({ row }) => h('div', { class: 'w-28' }, row.getValue('type')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'com_no',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-24', column, title: t('com_no') }),
    cell: ({ row }) => h('div', { class: 'w-24' }, row.getValue('com_no')),
    enableSorting: false,
    enableHiding: false,
    meta: {
      sticky: 'sticky left-0 bg-slate-400'
    },
    filterFn: (row, com_no, value) => {
      return (row.getValue(com_no)?.toString() as string).includes(value);
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: t('status') }),

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
      title: 'select_status',
    }
  },
  {
    accessorKey: 'order_date',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: t('order_date') }),
    cell: ({ row }) => h('div', { class: 'w-20' }, convertToDDMMYYYY(row.getValue('order_date'))),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'date'
    }
  },
  {
    accessorKey: 'dealer',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: t('dealer') }),
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
      title: 'select_dealer',

    }
  },
  {
    accessorKey: 'last_status',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: t('last_status') }),
    cell: ({ row }) => h('div', { class: 'w-36' }, convertToDDMMYYYY(row.getValue('last_status'))),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'date'
    }
  },
  {
    accessorKey: 'address',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-40', column, title: t('address') }),
    cell: ({ row }) => h('div', { class: 'w-40' }, row.getValue('address')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: t('customer') }),
    cell: ({ row }) => h('div', { class: 'w-36' }, row.getValue('customer')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'salesman',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: t('salesman') }),
    cell: ({ row }) => h('div', { class: 'w-36' }, row.getValue('salesman')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date_of_installation',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-36', column, title: t('date_of_installation') }),
    cell: ({ row }) => h('div', { class: 'w-36' }, formatDate(row.getValue('date_of_installation'))),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'date'
    }
  },
  {
    accessorKey: 'planned_delivery_week',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-44', column, title: t('planned_delivery_week') }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('planned_delivery_week')),
    enableSorting: false,
    enableHiding: false,
    meta: {
      filterVariant: 'week'
    },
    filterFn: (row, id, value) => {
      return (row.getValue(id) as string[]).includes(value);
    },
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
    meta: {
      sticky: 'sticky right-0 bg-slate-400'
    }
  },
]
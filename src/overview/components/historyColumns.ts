import { useTranslation } from '../../i18n.utils';
const t = useTranslation();
import { h } from 'vue'

import type { ColumnDef } from '@tanstack/vue-table'
import DataTableColumnHeader from './DataTableColumnHeader.vue'


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'order_no',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-16', column, title: t('order_no') }),
    cell: ({ row }) => h('div', { class: 'w-16' }, row.getValue('order_no')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: 'Status' }),
    cell: ({ row }) => h('div', { class: 'w-28' }, row.getValue('status')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: t('comment') }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('comment')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sent_to',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: t('sent_to') }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('sent_to')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'document_type',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-28', column, title: t('document_type') }),
    cell: ({ row }) => h('div', { class: 'w-28' }, row.getValue('document_type')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'file_name',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: t('file_name') }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('file_name')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'created_by',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: t('created_by') }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('created_by')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date_created',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-30', column, title: t('date_created') }),
    cell: ({ row }) => h('div', { class: 'w-30' }, row.getValue('date_created')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'changed_by',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-28', column, title: t('changed_by') }),
    cell: ({ row }) => h('div', { class: 'w-28' }, row.getValue('changed_by')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: () => {
      const url = `/`;
      const linkText = 'Details';
      return h('a', { href: url, class: 'text-blue-500 hover:underline' }, linkText);
    },
  }
]
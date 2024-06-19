import { useTranslation } from '../../i18n.utils';
const t = useTranslation();
import { convertDate } from '@/lib/utils';
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

import EditObject from './EditObject.vue'
import DataTableColumnHeader from '@/overview/components/DataTableColumnHeader.vue'


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-16', column, title: 'name' }),
    cell: ({ row }) => h('div', { class: 'w-16' }, row.getValue('name')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'version',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: 'version' }),
    cell: ({ row }) => h('div', { class: 'w-28' }, row.getValue('version')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdDate',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-32', column, title: 'created' }),
    cell: ({ row }) => {
      const formattedDate = convertDate(row.getValue('createdDate'), 'de-DE');
      return h('div', { class: 'w-40' }, formattedDate || '');
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'lastModifiedDate',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-32', column, title: 'modified' }),
    cell: ({ row }) => {
      const formattedDate = convertDate(row.getValue('lastModifiedDate'), 'de-DE');
      return h('div', { class: 'w-40' }, formattedDate || '');
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => h(EditObject, { row })
  }
]
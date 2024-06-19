<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';

import { DotsHorizontalIcon } from '@radix-icons/vue';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/toast';
const { toast } = useToast();

import navigate from '@/router/navigate';

import { useWorkflowStore } from '@/stores/workflowStore';

const workflowStore = useWorkflowStore();

interface DataTableRowActionsProps {
  row: Row<any>;
}
const props = defineProps<DataTableRowActionsProps>();

const openDetails = () => {
  navigate.order(props.row.original.id);
}

const deleteWorkflow = async () => {
  await workflowStore.deleteWorkflow(props.row.original.id);

  if (workflowStore.error) {
    toast({ description: workflowStore.error, variant: 'destructive' });
  } else {
    toast({ description: 'Order deleted successfully' });
  }
}

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
        <DropdownMenuItem @click="openDetails">Details</DropdownMenuItem>
        <DropdownMenuItem @click="deleteWorkflow">{{ $t('delete') }}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

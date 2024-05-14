<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import { orderSchema } from '../data/schema';
import type { Order } from '../data/schema';

import { dealers } from '../data/data';

import { DotsHorizontalIcon } from '@radix-icons/vue';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import Select from './Select.vue';

import { Input } from '@/components/ui/input';

import OrderDetailsForm from './OrderDetailsForm.vue';

interface DataTableRowActionsProps {
  row: Row<Order>;
}
const props = defineProps<DataTableRowActionsProps>();
const order = computed(() => orderSchema.parse(props.row.original));

const datum = ref('');
const woche = ref('');
const selectedDealer = ref('');

console.log(selectedDealer);
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[150px]">
        <DialogTrigger class="w-full">
          <DropdownMenuItem>Details</DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuContent>
      <DialogContent class="max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Order - Details</DialogTitle>
          <!-- <OrderDetailsForm />  -->

          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <OrderDetailsForm class="mt-2" :rowData="row.original" />


        <!-- <DialogFooter>
          <Button>Save Order</Button>
          <Button variant="destructive">Cancel</Button>
          <Button variant="outline">History</Button>
          <Button variant="outline">Print</Button>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>

        </DialogFooter> -->
      </DialogContent>
    </DropdownMenu>
  </Dialog>
</template>

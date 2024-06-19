<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import { ref } from 'vue';
import { DotsHorizontalIcon } from '@radix-icons/vue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
const { toast } = useToast();

import CreatePropertyDialog from './CreatePropertyDialog.vue'
import PropertiesTable from './PropertiesTable.vue';

import { columns } from './propertiesColumns';

import { useObjectDefinitionsStore } from '@/stores/objectDefinitionStore';
import { usePropertyDefinitionsStore } from '@/stores/propertyStore';

interface EditObjectProps {
  row: Row<any>;
}
const props = defineProps<EditObjectProps>();
const editedName = ref<string>(props.row.original.name);

const objectStore = useObjectDefinitionsStore();
const propertyStore = usePropertyDefinitionsStore();

const handleDelete = async () => {
  try {
    await objectStore.deleteObjectDefinition(props.row.original.id);
  } catch (error) {
    console.error('Failed to delete object:', error);
  }
};

const updateObjectName = async () => {
  try {
    const updatedObject = { ...props.row.original, name: editedName.value };
    await objectStore.updateObjectDefinition(updatedObject);
    if (objectStore.error) {
      toast({ description: objectStore.error, variant: 'destructive' })
      editedName.value = props.row.original.name;
    } else {
      toast({ description: 'Object name updated successfully' })
    }
  } catch (error) {
    console.error('Failed to update object name:', error);
  }
};

const openEditTable = () => {
  objectStore.setSelectedObjectId(props.row.original.id);
  propertyStore.fetchPropertyDefinitions(props.row.original.id);
}


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
          <DropdownMenuItem @click="openEditTable">Edit</DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem @click="handleDelete">Delete</DropdownMenuItem>
      </DropdownMenuContent>
      <DialogContent class="max-w-screen-lg overflow-auto">
        <DialogHeader>
          <DialogTitle>Properties</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div class="flex space-x-4">
          <Input id="name" placeholder="name" v-model="editedName" @change="updateObjectName" />
          <CreatePropertyDialog :objectId="props.row.original.id"/>
        </div>
        <div v-if="propertyStore.loading">
          <div class="grid grid-cols-5 gap-4">
            <Skeleton v-for="cell in 35" :key="cell" class="h-10" />
          </div>
        </div>
        <div v-else>
          <PropertiesTable :data="propertyStore.propertyDefinitions" :columns="columns" />
        </div>
      </DialogContent>
    </DropdownMenu>
  </Dialog>
</template>
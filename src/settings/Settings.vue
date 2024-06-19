<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton';

import ObjectDefinitionTable from './components/ObjectDefinitionTable.vue';
import { columns } from './components/objectColumns';

import { useObjectDefinitionsStore } from '@/stores/objectDefinitionStore';

const store = useObjectDefinitionsStore();

onMounted(async () => {
  await store.fetchObjectDefinitions();
});

</script>

<template>
  <Tabs default-value="object" class="w-full">
    <TabsList class="grid w-full grid-cols-4">
      <TabsTrigger value="object">
        Object Definition
      </TabsTrigger>
    </TabsList>
    <TabsContent value="object">
      <div class="flex-1 flex-col space-y-6 p-6 md:flex">
        <div class="flex items-center justify-between space-y-0">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-slate-800">
              Object Definitions
            </h1>
          </div>
        </div>
        <div v-if="store.loading">
          <div class="grid grid-cols-5 gap-4">
            <Skeleton v-for="cell in 15" :key="cell" class="h-10 bg-slate-400" />
          </div>
        </div>
        <div v-else>
          <ObjectDefinitionTable :data="store.objectDefinitions" :columns="columns"/>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</template>
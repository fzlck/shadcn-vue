<script setup lang="ts">
import { onMounted  } from 'vue';
import DataTable from './components/DataTable.vue';
import { columns } from './components/columns';
import { Skeleton } from '@/components/ui/skeleton';


import { useWorkflowStore } from '@/stores/workflowStore';
const store = useWorkflowStore();

onMounted(async () => {
  store.fetchWorkflows();
});
</script>

<template>
  <div class="flex-1 flex-col space-y-6 p-6 md:flex">
    <div class="flex items-center justify-between space-y-0">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-800">
          {{ $t('order', 2) }} - {{ $t('overview') }}
        </h1>
      </div>
    </div>
    <DataTable v-if="!store.loading" :data="store.workflows" :columns="columns" />
    <div v-else>
      <Skeleton class="h-10 w-32 bg-slate-400"/>
      <div class="grid grid-cols-9 gap-4 mt-2 mb-8">
        <Skeleton class="h-6 w-10 bg-slate-400"/>
        <Skeleton class="h-6 w-24 bg-slate-400"/>
        <Skeleton class="h-6 w-20 bg-slate-400"/>
        <Skeleton class="h-6 w-32 bg-slate-400"/>
        <Skeleton class="h-6 w-20 bg-slate-400"/>
        <Skeleton class="h-6 w-32 bg-slate-400"/>
        <Skeleton class="h-6 w-20 bg-slate-400"/>
        <Skeleton class="h-6 w-20 bg-slate-400"/>
        <Skeleton class="h-6 w-32 bg-slate-400"/>
      </div>
      <div class="grid grid-cols-9 gap-8">
        <Skeleton v-for="cell in 90" :key="cell" class="h-6 bg-slate-400" />
      </div>
    </div>
  </div>
</template>
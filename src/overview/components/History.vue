<script setup lang="ts">
import { Button } from '@/components/ui/button';

import HistoryDataTable from './HistoryDataTable.vue';
import { columns } from './historyColumns';
import { History } from '../data/schema';
import orders from '../data/orders.json'

import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';

const route = useRoute();
const router = useRouter();
const id = route.params.com_no;
const orderStore = useOrderStore();
const orderHistoryData = orderStore.getOrderHistoryData;

const tableData = orders.filter((order: any) => order.com_no === id)
let history: History[] = tableData.flatMap((order) => order.history || []);
if (orderHistoryData?.length) {
  history = orderHistoryData;
}
orderStore.setOrderHistoryData(history);

const gotoDetails = () => {
  router.push(`/details/${id}`);
}

</script>
<template>
   <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-2xl font-bold tracking-tight text-slate-800">
        {{ $t('order', 1) }} - {{ $t('history') }}
      </h1>
      <Button variant="outline" @click="gotoDetails">{{ $t('back') }}</Button>
    </div>
    <HistoryDataTable :data="history" :columns="columns"/>
  </div>
</template>

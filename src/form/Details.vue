<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/ui/button/Button.vue';

import DetailsMultiStepForm from './components/DetailsMultiStepForm.vue';

import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore';

import orders from '@/overview/data/orders.json';


const route = useRoute()
const id = route.params.com_no;
const orderStore = useOrderStore();
let orderData = orderStore.getOrderData;

if (!orderData || orderData.com_no !== id) {
  orderData = (orders.filter((order) => order.com_no === id))[0]
}
orderStore.setOrderData(orderData);

const { 
  type,
  com_no,
  status,
  order_date,
  dealer,
  last_status,
  address,
  customer,
  salesman,
  date_of_installation,
  planned_delivery_week,
  order_type,
} = orderData || {};

const orderDetails = ref({
  type: type || '',
  com_no: com_no || '',
  status: status || '',
  order_date: order_date || '',
  dealer: dealer || '',
  last_status: last_status || '',
  address: address || '',
  customer: customer || '',
  salesman: salesman || '',
  date_of_installation: date_of_installation || '',
  planned_delivery_week: planned_delivery_week || '',
  order_type: order_type || '',
});

</script>

<template>
  <div class="p-6">
  <div class="flex justify-between mb-4">
    <h1 class="text-2xl font-bold tracking-tight text-slate-800">
      {{ $t('order', 1) }} - Details
    </h1>
    <Button variant="outline">{{ $t('back') }}</Button>
  </div>
  <DetailsMultiStepForm v-model="orderDetails" />
</div>

</template>


<style scoped></style>

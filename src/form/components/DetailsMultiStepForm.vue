<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate'

import { object, string, number } from 'yup';

import { Button } from '@/components/ui/button'
import BaselineData from './BaselineData.vue';
import OrderForm from './OrderForm.vue';
import LiftOptions from './LiftOptions.vue';
import Attachments from './Attachments.vue';


const orderSchema = [
  object({
    dealer: string(),
    status: string(),
    order_date: string(),
    order_type: string(),
    com_no: string(),
    date_of_installation: string(),
    planned_delivery_week: string(),
  }),
  object({
    salesman: string(),
    customer: string(),
    order_no: string(),
    transport: string(),
    photo_survey: string(),
    address: string(),
  }),
  object({
    side_of_installation: string(),
    key_switch: string(),
    rail_fixing: string(),
    remark: string(),
  }),
];


const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', orderDetails: any): void;
}>();

const orderDetails = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

const currentStep = ref(0);
const activeSchema = computed(() => orderSchema[currentStep.value]);

const { handleSubmit } = useForm({
  validationSchema: activeSchema,
  initialValues: orderDetails.value,
  keepValuesOnUnmount: true,
});

const next = handleSubmit((values) => {
  console.log(currentStep.value);
  if (currentStep.value === 3) {
    console.log(JSON.stringify(values));
    alert("Form submitted");
  } else {
    currentStep.value++;
  }
});

const isLastStep = computed(() => {
  return currentStep.value === 3;
});

const hasPrevious = computed(() => {
  return currentStep.value > 0;
});

const prev = () => {
  if (currentStep.value === 0) {
    return;
  }
  currentStep.value--;
};


</script>

<template>
  <div :class="[
      'p-6 mt-6 mb-10 bg-white m-auto rounded-md shadow-md',
      currentStep === 3 ? 'w-fit' : 'w-1/3'
    ]"
  >
    <form @submit="next">
      <!-- <div class="grid grid-cols-3"> -->
        <!-- <div class="min-h-[600px] mr-4 bg-slate-300 rounded-md flex items-center justify-center">
          <div class="flex flex-col space-y-4">
            <div class="flex flex-row space-x-2 items-center justify-center">
              <h1 class="font-medium">{{ $t('baseline_data') }}</h1>
            </div>

          </div>
        </div> -->
        <div class="min-h-[600px] col-span-2">
          <BaselineData v-if="currentStep === 0" v-model="orderDetails" />
          <OrderForm v-if="currentStep === 1" v-model="orderDetails" />
          <LiftOptions v-if="currentStep === 2" v-model="orderDetails" />
          <Attachments v-if="currentStep === 3" v-model="orderDetails" />
        </div>
      <!-- </div> -->

      <div class="mt-8 flex justify-end space-x-2">
        <Button class="shadow-sm" variant="outline" type="button" @click="prev" v-if="hasPrevious">{{ $t('previous') }}</Button>
        <Button type="submit">{{ isLastStep ? $t('save_order') : $t('next') }}</Button>
        <Button v-if="isLastStep" variant="destructive">{{ $t('cancel_order') }}</Button>
        <Button v-if="isLastStep" variant="outline" >{{ $t('history') }}</Button>
        <Button v-if="isLastStep" variant="outline">{{ $t('print') }}</Button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
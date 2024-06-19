<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';
import { dealers, statuses, products } from '@/overview/data/data';
import DatePicker from '@/overview/components/DatePicker.vue';
import WeekSelector from '@/overview/components/WeekSelector.vue';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


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

const { value: dealer, errorMessage: dealerError } = useField(
  'dealer',
  () => orderDetails.value.dealer,
  {
    syncVModel: false,
  }
);

const { value: status, errorMessage: statusError } = useField(
  'status',
  () => orderDetails.value.status,
  {
    syncVModel: false,
  }
);

const { value: order_date, errorMessage: orderDateError } = useField(
  'order_date',
  () => orderDetails.value.order_date,
  {
    syncVModel: false,
  }
);

const { value: order_type, errorMessage: orderTypeError } = useField(
  'order_type',
  () => orderDetails.value.order_type,
  {
    syncVModel: false,
  }
);

const { value: date_of_installation, errorMessage: dateOfInstallationError } = useField(
  'date_of_installation',
  () => orderDetails.value.date_of_installation,
  {
    syncVModel: false,
  }
);

const { value: planned_delivery_week, errorMessage: plannedDeliveryWeekError } = useField(
  'planned_delivery_week',
  () => orderDetails.value.planned_delivery_week,
  {
    syncVModel: false,
  }
);

const updateOrderDetails = () =>
  (orderDetails.value = { ...orderDetails.value, 
    dealer: dealer.value,
    status: status.value,
    order_date: order_date.value,
    order_type: order_type.value,
    date_of_installation: date_of_installation.value,
   });

watch(dealer, updateOrderDetails);
watch(status, updateOrderDetails);
watch(order_date, updateOrderDetails);
watch(order_type, updateOrderDetails);
watch(date_of_installation, updateOrderDetails)
watch(planned_delivery_week, updateOrderDetails)

const handleDeliveryWeekChange = (deliveryWeek: string) => {
  orderDetails.value = { ...orderDetails.value, planned_delivery_week: deliveryWeek}
};

</script>

<template>
  <div class="grid gap-2">
    <h1 class="font-semibold mb-2">{{ t('baseline_data') }}</h1>
    <FormField v-slot="{ componentField }" name="dealer">
      <FormItem>
        <FormLabel>{{ t('dealer') }}</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue :placeholder="t('select_dealer')" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="option in dealers" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="order_type">
      <FormItem>
        <FormLabel>{{ t('product') }}</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue :placeholder="t('select_product')" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="option in products" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="status">
      <FormItem>
        <FormLabel>Status</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue :placeholder="t('select_status')" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="option in statuses" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="com_no">
      <FormItem>
        <FormLabel>{{ t('com_no') }}</FormLabel>
        <FormControl>
          <Input disabled type="text" :placeholder="t('commission_no')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid grid-flow-col gap-1">
      <FormField name="order_date">
        <FormItem>
          <FormLabel>{{ t('order_date') }}</FormLabel>
          <DatePicker 
            v-model="order_date"
            @update:modelValue="updateOrderDetails"
            :label="t('order_date')"
          />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="date_of_installation">
        <FormItem>
          <FormLabel>{{ t('date_of_installation') }}</FormLabel>
          <DatePicker 
            v-model="date_of_installation"
            @update:modelValue="updateOrderDetails"
            :label="t('date_of_installation')"
          />
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField name="planned_delivery_week">
      <FormItem>
        <FormLabel>{{ t('planned_delivery_week') }}</FormLabel>
        <WeekSelector :plannedDeliveryWeek="planned_delivery_week as string" @update:plannedDeliveryWeek="handleDeliveryWeekChange" />
      </FormItem>
    </FormField>
  </div>
</template>



<style scoped>

</style>
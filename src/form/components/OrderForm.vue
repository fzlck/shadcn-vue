<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';
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

const { value: salesman, errorMessage: salesmanError } = useField(
'salesman',
  () => orderDetails.value.salesman,
  {
    syncVModel: false,
  }
);
const { value: customer, errorMessage: customerError } = useField(
  'customer',
  () => orderDetails.value.customer,
  {
    syncVModel: false,
  }
);
const { value: order_number, errorMessage: orderNumberError } = useField(
  'order_number',
  () => orderDetails.value.order_number,
  {
    syncVModel: false,
  }
);
const { value: transport, errorMessage: transportError } = useField(
  'transport',
  () => orderDetails.value.transport,
  {
    syncVModel: false,
  }
);
const { value: photo_survey, errorMessage: photoSurveyError } = useField(
  'photo_survey',
  () => orderDetails.value.photo_survey,
  {
    syncVModel: false,
  }
);
const { value: address, errorMessage: addressError } = useField(
  'address',
  () => orderDetails.value.address,
  {
    syncVModel: false,
  }
);

const updateOrderDetails = () =>
  (orderDetails.value = { ...orderDetails.value, 
    salesman: salesman.value,
    customer: customer.value,
    order_number: order_number.value,
    transport: transport.value,
    photo_survey: photo_survey.value,
    address: address.value
   });

watch(salesman, updateOrderDetails);
watch(customer, updateOrderDetails);
watch(order_number, updateOrderDetails);
watch(transport, updateOrderDetails);
watch(photo_survey, updateOrderDetails)
watch(address, updateOrderDetails)


</script>

<template>
  <div class="grid gap-2">
    <h1 class="font-semibold mb-2">{{ t('order_form') }}</h1>
    <FormField v-slot="{ componentField }" name="salesman">
      <FormItem>
        <FormLabel>{{ t('salesman') }}</FormLabel>
        <FormControl>
          <Input type="text" :placeholder="t('name_of_salesman')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="customer">
      <FormItem>
        <FormLabel> {{ t('customer') }}</FormLabel>
        <FormControl>
          <Input type="text" :placeholder="t('name_of_customer')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="order_number">
      <FormItem>
        <FormLabel>{{ t('order_number') }}</FormLabel>
        <FormControl>
          <Input type="text" placeholder="" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="transport">
      <FormItem>
        <FormLabel>Transport</FormLabel>
        <FormControl>
          <Input type="text" placeholder="" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="photo_survey">
      <FormItem>
        <FormLabel> {{ t('photo_survey') }}</FormLabel>
        <FormControl>
          <Input type="text" placeholder="" v-bind="componentField" />
        </FormControl>
        <FormDescription>{{ t('pls_always_send') }}</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>{{ t('delivery_address') }}</FormLabel>
        <FormControl>
          <Textarea
            placeholder=""
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>



<style scoped>

</style>
<script setup lang="ts">
import { computed, h, ref, onMounted, watch } from 'vue';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Order } from '../data/schema'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// dropzone component
import Vue3Dropzone from '@jaxtheprime/vue3-dropzone';
import '@jaxtheprime/vue3-dropzone/dist/style.css'

import WeekSelector from './WeekSelector.vue';
import DatePicker from './DatePicker.vue';

import { dealers, statuses, products } from '../data/data';
import orders from '../data/orders.json'

import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore';
import { useWorkflowStore } from '@/stores/workflowStore';

import SelectStatus from './formItems/SelectStatus.vue';
import SelectProduct from './formItems/SelectProduct.vue';
import SelectDealer from './formItems/SelectDealer.vue';

const { t } = useI18n();
const route = useRoute()
const router = useRouter();
const id = route.params.id;

const orderStore = useOrderStore();
const workflowStore = useWorkflowStore();
let orderData = orderStore.getOrderData;

const formSchema = toTypedSchema(z.object({
  type: z.string(),
  com_no: z.number().optional().nullable(),
  status: z.string().optional(),
  order_date: z.string().optional(),
  dealer: z.string().optional(),
  last_status: z.string().optional(),
  address: z.string().optional(),
  customer: z.string().optional(),
  salesman: z.string().optional(),
  date_of_installation: z.string().optional(),
  planned_delivery_week: z.string().optional(),
  order_type: z.string().optional(),
  order_number: z.string().optional(),
  transport: z.string().optional(),
  photo_survey: z.string().optional(),
  side_of_installation: z.string().optional(),
  key_switch: z.string().optional(),
  rail_fixing: z.string().optional(),
  remark: z.string().optional()
}))

let {
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


const {handleSubmit, values, setFieldValue} = useForm({
  validationSchema: formSchema,
  initialValues: {
    type: type || '',
    com_no: com_no || null,
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
  }
})


onMounted(async () => {
  if (id) {
    await workflowStore.fetchWorkflowById(id);
    if (workflowStore?.currentWorkflow) {
      const wf = workflowStore.currentWorkflow;
      
      setFieldValue('type', wf?.type);
      setFieldValue('com_no', wf?.com_no);
      setFieldValue('status', wf?.status);
      order_date = wf?.order_date.split('T')[0];
      setFieldValue('order_date', wf?.order_date.split('T')[0]);
      setFieldValue('dealer', wf?.dealer);
      setFieldValue('last_status', wf?.last_status.split('T')[0]);
      setFieldValue('address', wf?.address);
      setFieldValue('customer', wf?.customer);
      setFieldValue('salesman', wf?.salesman);
      date_of_installation = wf?.date_of_installation;
      setFieldValue('date_of_installation', wf?.date_of_installation);
      setFieldValue('planned_delivery_week', wf?.planned_delivery_week);
      planned_delivery_week = wf?.planned_delivery_week;
      setFieldValue('order_type', wf?.order_type);
    } 
  }
});

const handleDeliveryWeekChange = (deliveryWeek: string) => {
  setFieldValue('planned_delivery_week', deliveryWeek);
};

const onSubmit = handleSubmit(async (values) => {
  let description, variant: 'default' | 'destructive';
  const { 
    status, key_switch, order_number, photo_survey, rail_fixing, remark, side_of_installation, transport,
    ...remainingValues
  } = values;
  let formattedOrderDate;
  if (values.order_date) {
    const orderDate = new Date(values.order_date)
    formattedOrderDate = orderDate.toISOString(); 
  }
  // create if no id in route, edit otherwise
  if (!id) {
    const newWorkflow = {
      ...remainingValues,
      type: 'stairliftOrder',
      order_date: formattedOrderDate || '',
      last_status: formattedOrderDate || '',
    }
    await workflowStore.addWorkflow(newWorkflow);

    if (workflowStore.error) {
      description = workflowStore.error;
      variant = 'destructive';
    } else {
      description = 'Order created successfully';
      variant = 'default';
    }
    toast({ description, variant });
    return;
  }

  const updatedWorkflow = {
    ...remainingValues,
    id: id,
    order_date: formattedOrderDate || '',
    last_status: formattedOrderDate || '',
  }
  await workflowStore.updateWorkflow(updatedWorkflow);

  if (workflowStore.error) {
    description = workflowStore.error;
    variant = 'destructive';
  } else {
    description = 'Order updated successfully';
    variant = 'default';
  }
  toast({ description, variant });
});

const goToHistory = () => {
  let mockData = orders.filter(order => order.com_no === "22014006")[0]
  orderStore.setOrderHistoryData(mockData.history);
  router.push(`/history/${mockData.com_no}`);
}

const files = ref([]);

</script>

<template>
  <div v-if="workflowStore.loading" class="flex items-center justify-center min-h-screen">
    <h1 class="animate-pulse text-lg font-bold tracking-tight text-slate-800">
      {{ $t('loading_details') }}
    </h1>
  </div>
  <div v-else class="p-6">
    <form @submit="onSubmit">
      <div class="flex justify-between mb-2">
        <h1 class="text-2xl font-bold tracking-tight text-slate-800">
          {{ $t('order', 1) }} - Details
        </h1>
        <div class="flex space-x-2">
          <Button type="button" variant="outline" @click="router.push('/')">{{ t('back') }}</Button>
        </div>
      </div>
      <div class="grid gap-2 grid-cols-2">
        <div>
          <h1 class="font-semibold mb-2">{{ t('baseline_data') }}</h1>
          <div class="grid gap-2 grid-cols-3">
            <FormField v-slot="{ componentField }" name="dealer">
              <FormItem>
                <FormLabel>{{ t('dealer') }}</FormLabel>
                <SelectDealer :componentField="componentField" />
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="status">
              <FormItem>
                <FormLabel>Status</FormLabel>
                <SelectStatus :componentField="componentField" />
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField name="order_date">
              <FormItem>
                <FormLabel>{{ t('order_date') }}</FormLabel>
                <DatePicker 
                  v-model="order_date"
                  @update:modelValue="(v) => setFieldValue('order_date', v)"
                  :label="t('order_date')"
                />
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="order_type">
              <FormItem>
                <FormLabel>{{ t('product') }}</FormLabel>
                <SelectProduct :componentField="componentField" />
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="com_no">
              <FormItem>
                <FormLabel>{{ t('com_no') }}</FormLabel>
                <FormControl>
                  <Input :disabled="id" type="number" :placeholder="t('commission_no')" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField name="date_of_installation">
              <FormItem>
                <FormLabel>{{ t('date_of_installation') }}</FormLabel>
                <DatePicker 
                  v-model="date_of_installation"
                  @update:modelValue="(v) => setFieldValue('date_of_installation', v)"
                  :label="t('date_of_installation')"
                />
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField name="planned_delivery_week">
              <FormItem>
                <FormLabel>{{ t('planned_delivery_week') }}</FormLabel>
                <WeekSelector :plannedDeliveryWeek="planned_delivery_week" @update:plannedDeliveryWeek="handleDeliveryWeekChange" />
              </FormItem>
            </FormField>
          </div>
          <h1 class="font-semibold my-2">{{ t('order_form') }}</h1>
          <div class="grid gap-2 grid-cols-3">
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
                    class="resize-none"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <h1 class="font-semibold my-2">{{ t('lift_options') }}</h1>
          <div class="grid gap-2 grid-cols-2">
            <FormField v-slot="{ componentField }" name="side_of_installation">
              <FormItem>
                <FormLabel>{{ t('side_of_installation') }}</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="t('select_side_of_installation')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="option in ['Left', 'Right']" :key="option" :value="option">
                        {{ option }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="key_switch">
              <FormItem>
                <FormLabel>{{ t('key_switch') }}</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="t('select_key_switch')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="option in ['Yes', 'No']" :key="option" :value="option">
                        {{ option }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="rail_fixing">
              <FormItem>
                <FormLabel>{{ t('rail_fixing') }}</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="t('select_rail_fixing')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="option in ['Stages']" :key="option" :value="option">
                        {{ option }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="remark">
              <FormItem>
                <FormLabel>{{ t('remark') }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="bg-slate-100 max-w-screen rounded-md p-1">
          <Tabs defaultValue="dimensions" className="w-[400px]">
            <TabsList class="">
              <TabsTrigger value="dimensions">{{ t('dimensions') }}</TabsTrigger>
              <TabsTrigger value="draft">{{ t('draft') }}</TabsTrigger>
              <TabsTrigger value="orders">{{ t('orders_drawings') }}</TabsTrigger>
              <TabsTrigger value="drawing_internal">{{ t('drawing_internal') }}</TabsTrigger>
              <TabsTrigger value="delivery_note">{{ t('delivery_note') }}</TabsTrigger>
  
            </TabsList>
            <TabsContent value="dimensions">
            </TabsContent>
            <TabsContent value="draft"></TabsContent>
            <TabsContent value="orders"></TabsContent>
            <TabsContent value="drawing_internal"></TabsContent>
            <TabsContent value="delivery_note"></TabsContent>
          </Tabs>
          <!--demo dropzone-->
          <Vue3Dropzone v-model="files" multiple width="100%" height="400px" imgWidth="45%" imgHeight="200px" :showSelectButton="false" class="text-slate-400">
            <template #title>
              <span>{{ t('drop_your_files_here') }}</span>
            </template>
            <template #description>
              <span class="text-gray-600 text-sm">{{ t('files_5mb') }}</span>
            </template>
          </Vue3Dropzone>
        </div>
      </div>
      <div class="flex space-x-2 my-2 justify-end">
        <Button type="button" @click="onSubmit">{{ t('save_order') }}</Button>
        <Button type="button" v-if="id" variant="destructive">{{ t('cancel_order') }}</Button>
        <Button type="button" v-if="id" variant="outline" @click="goToHistory">{{ t('history') }}</Button>
        <Button type="button" v-if="id" variant="outline">{{ t('print') }}</Button>
      </div>
    </form>
  </div>
</template>

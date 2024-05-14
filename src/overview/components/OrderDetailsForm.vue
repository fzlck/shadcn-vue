<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { computed, h, ref } from 'vue';
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';
import { toDate } from 'radix-vue/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Order } from '../data/schema'
import SelectDealers from './SelectDealers.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { dealers, statuses, products } from '../data/data';




interface OrderDetailsFormProps {
  rowData: Order;
}
const props = defineProps<OrderDetailsFormProps>();

const formSchema = toTypedSchema(z.object({
  type: z.string(),
  com_no: z.string(),
  status: z.string(),
  order_date: z.string(),
  dealer: z.string(),
  last_status: z.string(),
  address: z.string(),
  customer: z.string(),
  salesman: z.string(),
  date_of_installation: z.string(),
  planned_delivery_week: z.string(),
  order_type: z.string(),
  order_number: z.string().optional(),
  transport: z.string().optional(),
  photo_survey: z.string().optional(),
  side_of_installation: z.string().optional(),
  key_switch: z.string().optional(),
  rail_fixing: z.string().optional(),
  remark: z.string().optional()


}))

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
} = props.rowData;


const {handleSubmit, values, setFieldValue} = useForm({
  validationSchema: formSchema,
  initialValues: {
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
  }
})
const df = new DateFormatter('de-DE', {
  dateStyle: 'long',
});
const value = computed({
  get: () => (values.order_date ? parseDate(values.order_date) : undefined),
  set: (val) => val,
});
const installationDateValue = computed({
  get: () => (values.date_of_installation ? parseDate(values.date_of_installation) : undefined),
  set: (val) => val,
});
const placeholder = ref();


console.log(props.rowData)

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})



</script>

<template>
  <form @submit="onSubmit">
    <h1 class="font-semibold mb-2">Baseline Data</h1>
    <div class="grid gap-1 grid-cols-3">
      <FormField v-slot="{ componentField }" name="dealer">
        <FormItem>
          <FormLabel>Dealer</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a dealer" />
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
      <FormField v-slot="{ componentField }" name="status">
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
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
      <FormField name="order_date">
      <FormItem>
        <FormLabel>Order Date</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[240px] ps-3 text-start font-normal',
                    !value && 'text-muted-foreground'
                  )
                "
              >
                <span>{{
                  value ? df.format(toDate(value)) : 'Pick a date'
                }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="value"
              calendar-label="Date of order"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="new CalendarDate(2900, 1, 1)"
              @update:model-value="
                (v) => {
                  if (v) {
                    setFieldValue('order_date', v.toString());
                  } else {
                    setFieldValue('order_date', undefined);
                  }
                }
              "
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="order_type">
        <FormItem>
          <FormLabel>Order Type</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select order type" />
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
      <FormField v-slot="{ componentField }" name="com_no">
        <FormItem>
          <FormLabel>COM-No</FormLabel>
          <FormControl>
            <Input disabled type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="date_of_installation">
      <FormItem>
        <FormLabel>Installation Date</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[240px] ps-3 text-start font-normal',
                    !installationDateValue && 'text-muted-foreground'
                  )
                "
              >
                <span>{{
                  installationDateValue ? df.format(toDate(installationDateValue)) : 'Pick a date'
                }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="installationDateValue"
              calendar-label="Date of installation"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="new CalendarDate(2900, 1, 1)"
              @update:model-value="
                (v) => {
                  if (v) {
                    setFieldValue('date_of_installation', v.toString());
                  } else {
                    setFieldValue('date_of_installation', undefined);
                  }
                }
              "
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
      </FormField>
      
    </div>
    <h1 class="font-semibold mt-4">Order Form</h1>
    <div class="grid gap-1 grid-cols-3">
      <FormField v-slot="{ componentField }" name="salesman">
        <FormItem>
          <FormLabel>Salesman</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Name of Salesman" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="customer">
        <FormItem>
          <FormLabel>Customer</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Name of Customer" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="order_number">
        <FormItem>
          <FormLabel>Order Number</FormLabel>
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
          <FormLabel>Photo Survey</FormLabel>
          <FormControl>
            <Input type="text" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormDescription>Please always send with your surveys the form "Control Dimensions" too</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>Delivery Address</FormLabel>
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
    <h1 class="font-semibold mt-4 mb-2">Lift Options</h1>
    <div class="grid gap-1 grid-cols-2">
      <FormField v-slot="{ componentField }" name="side_of_installation">
        <FormItem>
          <FormLabel>Side of Installation</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select side of installation" />
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
          <FormLabel>Key Switch</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select key switch" />
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
          <FormLabel>Rail Fixing</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select rail fixing" />
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
          <FormLabel>Remark</FormLabel>
          <FormControl>
            <Input type="text" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

    </div>
  <Button type="submit" class="mt-4">
    Submit
  </Button>
  </form>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';

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

const { value: side_of_installation, errorMessage: installationSideError } = useField(
  'side_of_installation',
  () => orderDetails.value.side_of_installation,
  {
    syncVModel: false,
  }
);

const { value: key_switch, errorMessage: keySwitchError } = useField(
  'key_switch',
  () => orderDetails.value.key_switch,
  {
    syncVModel: false,
  }
);

const { value: rail_fixing, errorMessage: railFixingError } = useField(
  'rail_fixing',
  () => orderDetails.value.rail_fixing,
  {
    syncVModel: false,
  }
);

const { value: remark, errorMessage: remarkError } = useField(
  'remark',
  () => orderDetails.value.remark,
  {
    syncVModel: false,
  }
);

const updateOrderDetails = () =>
  (orderDetails.value = { ...orderDetails.value, 
    side_of_installation: side_of_installation.value,
    key_switch: key_switch.value,
    rail_fixing: rail_fixing.value,
    remark: remark.value,
   });

watch(side_of_installation, updateOrderDetails);
watch(key_switch, updateOrderDetails);
watch(rail_fixing, updateOrderDetails);
watch(remark, updateOrderDetails);

</script>

<template>
  <div class="grid gap-2">
    <h1 class="font-semibold mb-2">{{ t('lift_options') }}</h1>
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
</template>



<style scoped>

</style>
<script setup lang="ts">
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
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  FormControl,
} from '@/components/ui/form';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { computed, ref } from 'vue';

interface DatePickerProps {
  modelValue: any,
  label: string,
}
const props = defineProps<DatePickerProps>()
const emit = defineEmits(['update:modelValue'])

const df = new DateFormatter(t('date_locale'), {
  dateStyle: 'long',
});
const placeholder = ref()
const value = computed({
  get: () => props.modelValue ? parseDate(props.modelValue) : undefined,
  set: (val) => {
    if (val) {
      emit('update:modelValue', val.toString())
    } else {
      emit('update:modelValue', undefined)
    }
  },
})

</script>

<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <FormControl>
          <Button
            variant="outline"
            :class="
              cn(
                'w-full ps-3 text-start font-normal',
                !value && 'text-muted-foreground'
              )
            "
          >
            <span>{{
              value ? df.format(toDate(value as any)) : t('pick_a_date')
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
          :calendar-label="label"
          initial-focus
          :min-value="new CalendarDate(1900, 1, 1)"
          :max-value="new CalendarDate(2900, 1, 1)"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
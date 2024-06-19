<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const { locale } = useI18n({ useScope: 'global' });

const languages = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
];

const changeLocale = (newLocale: string) => {
  locale.value = newLocale;
};
</script>

<template>
  <div class="w-[100%]">
    <Select v-model="locale" @update:modelValue="changeLocale">
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="lang in languages" :key="lang.value" :value="lang.value">{{ lang.label }}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

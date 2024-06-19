<script setup lang="ts">
import { ref } from 'vue';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// dropzone component
import Vue3Dropzone from '@jaxtheprime/vue3-dropzone';
import '@jaxtheprime/vue3-dropzone/dist/style.css';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const files = ref([]);
</script>

<template>
 <div class="max-w-screen rounded-md">
    <Tabs defaultValue="dimensions" class="w-full">
      <TabsList class="flex-wrap justify-start">
        <TabsTrigger value="dimensions">{{ t('dimensions') }}</TabsTrigger>
        <TabsTrigger value="draft">{{ t('draft') }}</TabsTrigger>
        <TabsTrigger value="orders">{{ t('orders_drawings') }}</TabsTrigger>
        <TabsTrigger value="drawing_internal">{{ t('drawing_internal') }}</TabsTrigger>
        <TabsTrigger value="delivery_note">{{ t('delivery_note') }}</TabsTrigger>
      </TabsList>
      <div class="mt-6">
        <TabsContent value="dimensions">
        </TabsContent>
        <TabsContent value="draft"></TabsContent>
        <TabsContent value="orders"></TabsContent>
        <TabsContent value="drawing_internal"></TabsContent>
        <TabsContent value="delivery_note"></TabsContent>
      </div>
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
</template>



<style scoped>

</style>
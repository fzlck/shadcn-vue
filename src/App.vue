<script setup lang="ts">
import { useRoute } from 'vue-router'
import Menu from '@/menu/menu.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'

const route = useRoute()
</script>

<template>
  <div class="flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4 bg-white">
        <Menu></Menu>
      </div>
    </div>
    <div class="flex-1 bg-slate-300">
      <main>
        <router-view />
      </main>
    </div>
  </div>
  <Toaster />
</template>

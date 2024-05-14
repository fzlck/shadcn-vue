<script setup lang="ts">
/* NOTES: div is commented out to make sticky header work
*  Reference: https://github.com/shadcn-ui/ui/issues/1151
*/
 
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  
  <!-- <div class="relative w-full overflow-auto"> -->
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  <!-- </div> -->
</template>

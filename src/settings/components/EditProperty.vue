<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { DotsHorizontalIcon } from '@radix-icons/vue';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { AutoForm } from '@/components/ui/auto-form'
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
const { toast } = useToast();

import { useObjectDefinitionsStore } from '@/stores/objectDefinitionStore';
import { usePropertyDefinitionsStore } from '@/stores/propertyStore';

interface EditPropertyProps {
  row: Row<any>;
}
const props = defineProps<EditPropertyProps>();

const { id } = props.row.original;

const objectStore = useObjectDefinitionsStore();
const propertyStore = usePropertyDefinitionsStore();
const objectId = objectStore.getSelectedObjectId();

const schema = z.object({
  minimum: z.number().optional().nullable(),
  maximum:  z.number().optional().nullable(),
  exclusiveMinimum: z.number().optional().nullable(),
  exclusiveMaximum: z.number().optional().nullable(),
  multipleOf: z.number().optional().nullable(),
  minLength: z.number().optional().nullable(),
  maxLength: z.number().optional().nullable(),
  pattern: z.string().optional().nullable(),
})

const form = useForm({
  initialValues: props.row.original,
  validationSchema: toTypedSchema(schema),
})

async function onSubmit(values: Record<string, any>) {
  const updatedRow = {...props.row.original, 
    minimum: values.minimum || null,
    maximum: values.maximum || null,
    exclusiveMinimum: values.exclusiveMinimum || null,
    exclusiveMaximum: values.exclusiveMaximum || null,
    multipleOf: values.multipleOf || null,
    minLength: values.minLength || null,
    maxLength: values.maxLength || null,
    pattern: values.pattern || null,
  }
  await propertyStore.updatePropertyDefinition(objectId as number, id, updatedRow);
  
  if (propertyStore.error) {
    toast({ description: propertyStore.error, variant: 'destructive' })
  } else {
    toast({ description: 'Property updated succesfully'})
  }
}

const setFieldValues = async () => {
  await propertyStore.fetchPropertyById(objectId as number, id);
  const prop = propertyStore.currentProperty;
  form.setFieldValue('minimum', prop?.minimum);
  form.setFieldValue('maximum', prop?.maximum);
  form.setFieldValue('exclusiveMinimum', prop?.exclusiveMinimum);
  form.setFieldValue('exclusiveMaximum', prop?.exclusiveMaximum);
  form.setFieldValue('multipleOf', prop?.multipleOf);
  form.setFieldValue('minLength', prop?.minLength);
  form.setFieldValue('maxLength', prop?.maxLength);
  form.setFieldValue('pattern', prop?.pattern);
};

const deleteProperty = async () => {
  await propertyStore.deletePropertyDefinition(objectId as number, id);

  if (propertyStore.error) {
    toast({ description: propertyStore.error, variant: 'destructive' })
  } else {
    toast({ description: 'Property deleted succesfully'})
  }
};

</script>

<template>
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[150px]">
        <DialogTrigger class="w-full">
          <DropdownMenuItem @click="setFieldValues">Edit</DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem @click="deleteProperty">Delete</DropdownMenuItem>
      </DropdownMenuContent>
      <DialogContent class="sm:max-w-[555px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property: {{ props.row.original.name }}</DialogTitle>
          <DialogDescription>
            Make changes to your property here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div v-if="propertyStore.fetchByIdLoading" class="grid grid-cols-1 gap-2" v-for="cell in 8" :key="cell">
          <Skeleton class="h-4 w-20" />
          <Skeleton class="h-10" />
        </div>
        
        <div v-else class="flex justify-center w-full">
          <AutoForm
            class="w-full space-y-2"
            :field-config="{
              minimum: { label: 'minimum' },
              maximum: { label: 'maximum' },
              exclusiveMinimum: { label: 'exclusiveMinimum' },
              exclusiveMaximum: { label: 'exclusiveMaximum' },
              multipleOf: { label: 'multipleOf' },
              minLength: { label: 'minLength' },
              maxLength: { label: 'maxLength' },
              pattern: { label: 'pattern' }
            }"
            :schema="schema"
            :form="form"
            @submit="onSubmit"
          >
            <div class="flex justify-end mt-2">
              <DialogClose asChild>
                <Button class="" type="submit">
                  Save
                </Button>
              </DialogClose>
            </div>
          </AutoForm>
        </div>
      </DialogContent>
    </DropdownMenu>
  </Dialog>
</template>

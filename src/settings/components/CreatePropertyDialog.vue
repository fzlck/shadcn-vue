<script setup lang="ts">

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toast'
const { toast } = useToast();
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { AutoForm } from '@/components/ui/auto-form'

import { usePropertyDefinitionsStore } from '@/stores/propertyStore'

interface CreatePropertyDialogProps {
  objectId: number,
}
const props = defineProps<CreatePropertyDialogProps>();

const propertyStore = usePropertyDefinitionsStore();

const schema = z.object({
  name: z.string().optional(),
  type: z.enum(['integer', 'string', 'enum']).optional().nullable(),
  format: z.enum(['date']).optional().nullable(),
  required: z.boolean().optional(),
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
  validationSchema: toTypedSchema(schema),
})

async function onSubmit(values: Record<string, any>) {
  const newProperty = {...values, 
    minimum: values.minimum || null,
    maximum: values.maximum || null,
    exclusiveMinimum: values.exclusiveMinimum || null,
    exclusiveMaximum: values.exclusiveMaximum || null,
    multipleOf: values.multipleOf || null,
    minLength: values.minLength || null,
    maxLength: values.maxLength || null,
    pattern: values.pattern || null,
  }
  await propertyStore.addPropertyDefinition(props.objectId, newProperty);
  if (propertyStore.error) {
    toast({ description: propertyStore.error, variant: 'destructive'})
  } else {
    toast({ description: 'Property definition created successfully' })
  }
  await propertyStore.fetchPropertyDefinitions(props.objectId);
  console.log(values);
}

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>
        Create new property
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[555px] max-h-[100vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create property</DialogTitle>
        <DialogDescription>
          Create a new property here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <AutoForm
        class="w-full space-y-2"
        :field-config="{
          name: { label: 'name'},
          type: { label: 'type'},
          format: {label: 'format'},
          required: { label: 'required'},
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
      <div class="flex justify-end">
        <DialogClose asChild>
          <Button class="" type="submit">
            Save
          </Button>
        </DialogClose>
      </div>
      </AutoForm>
    </DialogContent>
  </Dialog>
</template>
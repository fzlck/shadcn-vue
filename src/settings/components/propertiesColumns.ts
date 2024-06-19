import { useTranslation } from '../../i18n.utils';
const t = useTranslation();
import { h, ref, defineComponent, computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTableColumnHeader from '@/overview/components/DataTableColumnHeader.vue'
import EditProperty from './EditProperty.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Input from '@/components/ui/input/Input.vue';
import { useToast } from '@/components/ui/toast';
const { toast } = useToast();

import { usePropertyDefinitionsStore } from '@/stores/propertyStore';
import { useObjectDefinitionsStore } from '@/stores/objectDefinitionStore';
const objectStore = useObjectDefinitionsStore();
const propertyStore = usePropertyDefinitionsStore();

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-16', column, title: 'name' }),
    cell: defineComponent({
      props: ['row'],
      setup(props) {
        const nameValue = ref(props.row.getValue('name'));
        const originalValue = ref(props.row.original.name);
  
        const handleBlur = async (event: any) => {
          const newValue = event.target.value;

          if (newValue !== originalValue.value) {
            const objectId = objectStore.getSelectedObjectId();
            const updatedRow = { ...props.row.original, name: newValue };
  
            await propertyStore.updatePropertyDefinition(objectId as number, props.row.original.id, updatedRow);
  
            if (propertyStore.error) {
              toast({ description: propertyStore.error, variant: 'destructive' });
              nameValue.value = originalValue.value;
            } else {
              originalValue.value = newValue;
              props.row.original.name = newValue;
              toast({ description: 'Name updated successfully' });
            }
          }
        };
  
        return () =>
          h(Input, {
            id: 'name',
            placeholder: 'name',
            modelValue: nameValue.value,
            'onUpdate:modelValue': (value) => {
              nameValue.value = value;
            },
            'onBlur': handleBlur,
          });
      },
    }) as unknown as ColumnDef<any>['cell'],
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: 'type' }),
    cell: defineComponent({
      props: ['row'],
      setup(props) {
        const selectedType = ref(props.row.getValue('type'));
        const options = ['integer', 'string', 'enum'];

        const handleChange = async (newValue: any) => {
          selectedType.value = newValue;
          const objectId = objectStore.getSelectedObjectId();
          const updatedRow = { ...props.row.original, type: newValue};

          await propertyStore.updatePropertyDefinition(objectId as number, props.row.original.id, updatedRow);

          if (propertyStore.error) {
            selectedType.value = props.row.original.type;
            toast({description: propertyStore.error, variant: 'destructive'});
          } else {
            props.row.original.type = newValue;
            toast({description: 'Type updated successfully'});
          }
        };

        return () =>
          h(
            'div',
            { class: 'w-28' },
            h(
              Select,
              {
                modelValue: selectedType.value,
                'onUpdate:modelValue': handleChange,
              },
              {
                default: () => [
                  h(SelectTrigger, null, { default: () => h(SelectValue, { placeholder: 'type' }) }),
                  h(SelectContent, null, {
                    default: () =>
                      h(SelectGroup, null, {
                        default: () =>
                          options.map((option) =>
                            h(SelectItem, { key: option, value: option }, () => option)
                          ),
                      }),
                  }),
                ],
              }
            )
          );
      },
    }) as unknown as ColumnDef<any>['cell'],
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'format',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: 'format' }),
    cell: defineComponent({
      props: ['row'],
      setup(props) {
        const selectedFormat = ref(props.row.getValue('format'));
        const options = ['date'];

        const handleChange = async (newValue: any) => {
          selectedFormat.value = newValue;
          props.row.original.format = newValue;
          const objectId = objectStore.getSelectedObjectId();
          const updatedRow = { ...props.row.original, format: newValue};

          await propertyStore.updatePropertyDefinition(objectId as number, props.row.original.id, updatedRow);

          if (propertyStore.error) {
            selectedFormat.value = props.row.original.format;
            toast({description: propertyStore.error, variant: 'destructive'});
          } else {
            props.row.original.format = newValue;
            toast({description: 'Format updated successfully'});
          }
        };

        return () =>
          h(
            'div',
            { class: 'w-28' },
            h(
              Select,
              {
                modelValue: selectedFormat.value,
                'onUpdate:modelValue': handleChange,
              },
              {
                default: () => [
                  h(SelectTrigger, null, { default: () => h(SelectValue, { placeholder: 'format' }) }),
                  h(SelectContent, null, {
                    default: () =>
                      h(SelectGroup, null, {
                        default: () =>
                          options.map((option) =>
                            h(SelectItem, { key: option, value: option }, () => option)
                          ),
                      }),
                  }),
                ],
              }
            )
          );
      },
    }) as unknown as ColumnDef<any>['cell'],
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'required',
    header: ({ column }) => h(DataTableColumnHeader, { class: 'w-20', column, title: 'required' }),
    cell: defineComponent({
      props: ['row'],
      setup(props) {
        const isRequired = ref(props.row.getValue('required'));
  
        const handleChange = async (newValue: boolean) => {
          isRequired.value = newValue;
          const objectId = objectStore.getSelectedObjectId();
          const updatedRow = { ...props.row.original, required: newValue};

          await propertyStore.updatePropertyDefinition(objectId as number, props.row.original.id, updatedRow)

          if (propertyStore.error) {
            toast({ description: propertyStore.error, variant: 'destructive' })
          } else {
            toast({ description: `Value of 'required' updated to ${newValue}` })
            props.row.original.required = newValue;
          }

          await propertyStore.fetchPropertyDefinitions(objectId as number);
        };
  
        return () =>
          h(
            'div',
            { class: 'w-28' },
            h(Checkbox, {
              checked: isRequired.value,
              'onUpdate:checked': handleChange,
              'ariaLabel': 'Is required',
              'class': 'translate-y-0.5'
            })
          );
      },
    }) as unknown as ColumnDef<any>['cell'],
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => h(EditProperty, { row })
  }
]
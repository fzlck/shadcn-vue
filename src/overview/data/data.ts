import { h } from 'vue'

import { CheckCircledIcon, CrossCircledIcon, PaperPlaneIcon, Pencil2Icon, MinusCircledIcon } from '@radix-icons/vue'

export const statuses = [
  {
    value: 'production release',
    label: 'Production Release',
    icon: h(PaperPlaneIcon),
  },
  {
    value: 'drawing created',
    label: 'Drawing Created',
    icon: h(Pencil2Icon),
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: h(CheckCircledIcon),
  },
  {
    value: 'apprehended',
    label: 'Apprehended',
    icon: h(CrossCircledIcon),
  },
  {
    value: 'closed',
    label: 'Closed',
    icon: h(MinusCircledIcon),
  },
]

export const dealers = [
  {
    label: 'Hawle Zentrale',
    value: 'hawle zentrale',
  },
  {
    label: 'Demo Handler',
    value: 'demo handler',
  },
  {
    label: 'Test Trader',
    value: 'test trader',
  }
]

export const products = [
  {
    label: 'HW 10',
    value: 'HW 10',
  },
  {
    label: 'HW 11',
    value: 'HW 11',
  },
  {
    label: 'HW 12',
    value: 'HW 12',
  },
  {
    label: 'HW 15',
    value: 'HW 15',
  }
]
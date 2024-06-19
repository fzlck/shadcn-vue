import { z } from 'zod'

const historyItemSchema = z.object({
  order_no: z.number(),
  status: z.string(),
  comment: z.string(),
  sent_to: z.string(),
  document_type: z.string(),
  file_name: z.string(),
  created_by: z.string(),
  date_created: z.string(),
  changed_by: z.string(),
  date_modified: z.string().optional(),
});

export type History = z.infer<typeof historyItemSchema>

export const orderSchema = z.object({
  type: z.string(),
  com_no: z.string(),
  status: z.string(),
  order_date: z.string(),
  dealer: z.string(),
  last_status: z.string(),
  address: z.string(),
  customer: z.string(),
  salesman: z.string(),
  date_of_installation: z.string(),
  planned_delivery_week: z.string(),
  order_type: z.string(),
  history: z.array(historyItemSchema),
})

export type Order = z.infer<typeof orderSchema>
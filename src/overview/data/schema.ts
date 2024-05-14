import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
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
})

export type Order = z.infer<typeof orderSchema>
import { z } from 'zod';
import { PaginationSchema } from '../pagination';
export const DiscountSchema = z.object({
    id: z.number(),
    code: z.string(),
    start_date: z.string(), // backend trả string (ISO)
    end_date: z.string().nullable().optional(),
    quantity: z.number(),
    total_used: z.number(),
    value: z.string(),
    type: z.string(),
    can_use_with_promotion: z.number(),
    type_option: z.string(),
    target: z.string(),
    display_at_checkout: z.number(),
});

export type DiscountResType = z.TypeOf<typeof DiscountSchema>;

export const DiscountListRes = z.object({
    data: z.array(DiscountSchema),
    pagination: PaginationSchema,
});

export type DiscountListResType = z.TypeOf<typeof DiscountListRes>;

/* =======================
   CREATE DISCOUNT
======================= */

export const CreateDiscountFormSchema = z.object({
    code: z.string().min(4),
    start_date: z.string(),
    end_date: z.string().optional(),
    quantity: z.coerce.number(),
    total_used: z.coerce.number(),
    value: z.string(),
    type: z.string(),
    can_use_with_promotion: z.coerce.number(),
    type_option: z.string(),
    target: z.string(),
    display_at_checkout: z.coerce.number(),
});

export type CreateDiscountFormType = z.infer<
  typeof CreateDiscountFormSchema
>;


/* =========================
   API SCHEMA
   ✅ transform tại đây
========================= */

export const CreateDiscountApiSchema =
    CreateDiscountFormSchema.extend({
        start_date: z.string().transform((v) => new Date(v)),
        end_date: z.string().optional().transform((v) => (v ? new Date(v) : undefined)),
    });

export type CreateDiscountBodyType = z.infer<
    typeof CreateDiscountApiSchema
>;

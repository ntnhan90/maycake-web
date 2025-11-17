import z from 'zod'

export const PaginationSchema = z.object({
    limit: z.number(),
    currentPage: z.number(),
    totalRecords: z.number(),
    totalPages: z.number(),
})

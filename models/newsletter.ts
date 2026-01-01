import {z} from "zod";

export const NewsletterSchema = z.object({
    id: z.preprocess(val => val === null ? undefined : val, z.number().optional()),
    name: z.string().nonempty(),
    email: z.email(),
    newsletter: z.boolean().optional(),
    project: z.string().optional(),
    nature: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.nature === "project" && !data.project) {
        ctx.addIssue({
            code: "custom",
            path: ["project"],
            message: "Project details is required.",
        });
    }
});

export type NewsletterSchemaType = z.infer<typeof NewsletterSchema>;
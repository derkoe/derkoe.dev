import { defineCollection, z } from "astro:content";
import { SITE } from "../config";

const blog = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      summary: z.string(),

      author: z.string().default(SITE.author),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
    }),
});

export const collections = { blog };

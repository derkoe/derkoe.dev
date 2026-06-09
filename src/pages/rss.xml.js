import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  console.log(context);

  const posts = await getCollection("blog");
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: "Christian Köberl's Blog",
    description:
      "My name is Christian Köberl and I am a software engineer @ Porsche Informatik in Salzburg, Austria.",
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.summary,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}

import { MetadataRoute } from "next";
import { getAllTours } from "@/lib/db/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://nadair-tours.com";

  const tours = await getAllTours();

  const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.id}`,
    lastModified: tour.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...tourEntries,
  ];
}

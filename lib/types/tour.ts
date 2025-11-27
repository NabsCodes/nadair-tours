export type Tour = {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  location: string;
  itinerary: string[];
  images: string[];
  sdgGoals: number[];
  maxCapacity: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TourCard = Pick<
  Tour,
  "id" | "title" | "description" | "price" | "duration" | "location" | "images" | "sdgGoals"
>;

export const sdgLabels: Record<number, string> = {
  11: "Sustainable Cities",
  12: "Responsible Consumption",
  15: "Life on Land",
};


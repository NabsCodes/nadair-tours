export type Order = {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string | null;
  bookingDate: string;
  notes: string | null;
  tourItems: Array<{
    tourId: number;
    tourTitle: string;
    quantity: number;
    price: string;
  }>;
  totalPrice: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus = Order["status"];

/**
 * Order types for checkout and MongoDB.
 */

export interface OrderLineItem {
  jerseyId: string;
  title: string;
  quantity: number;
  size?: string;
  customName?: string;
  customNumber?: string;
  /** Patch: champions-league | league | none. When league, patchLabel is the league name. */
  patch?: string;
  patchLabel?: string;
  price: number;
  imageUrl?: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
}

export type ShippingMethod = "home-delivery" | "self-collection";
export type PaymentMethod = "credit-card" | "whatsapp-bit";

export type OrderStatus = "pending-payment" | "paid" | "completed";

export interface OrderPayload {
  items: OrderLineItem[];
  customer: OrderCustomer;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  status?: OrderStatus;
}

export interface Order extends OrderPayload {
  _id?: string;
  orderId?: string;
  status?: OrderStatus;
  createdAt?: Date;
}

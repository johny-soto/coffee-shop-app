export interface OrderSummary {
  id: number;
  orderGrossPrice: number;
  discount: number;
  charges: number;
  total: number;
  date: Date;
}

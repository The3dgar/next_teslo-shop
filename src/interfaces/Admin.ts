export interface AdminDashboard {
  numberOfOrders:          number;
  paidOrders:              number;
  notPaidOrders:           number;
  numberOfClients:         number;
  lowInventory:            number;
  numberOfProducts:        number;
  productsWithNoInventory: number;
}

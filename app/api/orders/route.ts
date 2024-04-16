import { lineItemsIndexedById } from "@/app/api/_mocks/lineItems";
import { orders } from "@/app/api/_mocks/orders";
import dayjs from "@/app/_dayjs";

// Returns a list of orders by date including each order's line items.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // In a larger application, database queries for orders data would
  // support filtering by date and sorting. However, here the orders
  // data was retrieved from a TS file so filtering is below.
  const ordersData = orders
    // filter orders that match the requested order date
    .filter((order) => {
      // The endpoint supports date ranges as a general purpose feature
      // and can return product requirements over any range of time.
      return dayjs(order.orderDate).isBetween(
        dayjs(searchParams.get("startDate")),
        dayjs(searchParams.get("endDate")),
        "day",
        "[]",
      );
    })
    // Embed complete line item objects here prior to sending response to clients.
    .map((order) => {
      return {
        ...order,
        lineItems: order.lineItems.map((lineItem) => {
          // Use an indexed version of the line items data for constant time lookup
          return lineItemsIndexedById[lineItem];
        }),
      };
    });

  return Response.json({ data: ordersData });
}

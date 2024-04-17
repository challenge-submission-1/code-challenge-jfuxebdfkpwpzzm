import { lineItemsIndexedById } from "@/app/api/_mocks/lineItems";
import { orders } from "@/app/api/_mocks/orders";
import dayjs from "@/app/_dayjs";

// Returns a list of product requirements by date grouped by amount.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // In a larger application, database queries for orders data would
  // support filtering by date and sorting. However, here the orders
  // data was retrieved from a TS file so filtering is below.
  const productsData = orders
    // filter orders that match the requested order date
    .filter((order) => {
      // The endpoint supports date ranges as a general purpose feature
      // and can return product requirements over any range of time.
      return dayjs(order.orderDate).isBetween(
        searchParams.get("startDate"),
        searchParams.get("endDate"),
        "day",
        "[]",
      );
    })
    // create a flat list of line item ids
    .flatMap((order) => {
      return order.lineItems;
    })
    // create a flat list of all line item products
    .flatMap((lineItemId) => {
      // Retrieve complete line items by line item id using an indexed
      // version of the line items data for constant time lookup.
      const lineItem = lineItemsIndexedById[lineItemId];

      return lineItem.products;
    })
    // count products by name (product name is unique)
    .reduce<{ [index: string]: number }>((result, product) => {
      const currentCount = result[product.name] ?? 0;

      return {
        ...result,
        [product.name]: currentCount + 1,
      };
    }, {});

  return Response.json({
    data: productsData,
  });
}

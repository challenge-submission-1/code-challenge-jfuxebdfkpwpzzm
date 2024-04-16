// No support for code comments in JSON, use TS.

import { LineItem } from "@/app/_types";

// In contrast to the order data in orders.ts, all line item
// data below is static so no need~ for faker to generate data here.

export const lineItems: LineItem[] = [
  {
    // Each line item can be referenced elsewhere by its id. For example,
    // the orders collection/table references line items by line-item.id.
    id: 1,
    name: "Valentines Box",
    // Products could be stored in their own collection/table and
    // referenced by product id, however, literal values are used here.
    products: [
      // The amount of a product is implicit by presence in the products array.
      // Alternatively, amount can be modelled by adding "amount" fields.
      { name: "Red Roses Bouquet" },
      { name: "Box of chocolates" },
      { name: "Love card" },
      { name: "Women's perfume" },
    ],
  },
  {
    id: 2,
    name: "Birthday Box",
    products: [
      { name: "Birthday cupcake" },
      { name: "$100 Visa Gift Card" },
      { name: "Birthday card" },
    ],
  },
  {
    id: 3,
    name: "Client Gift Box",
    products: [
      { name: "Bottle of wine" },
      { name: "Fruit basket" },
      { name: "Pen" },
    ],
  },
];

// Create an indexed version of line items for faster lookups elsewhere.
export const lineItemsIndexedById = lineItems.reduce<{
  [index: number]: LineItem;
}>((result, lineItem) => {
  return {
    ...result,
    [lineItem.id]: lineItem,
  };
}, {});

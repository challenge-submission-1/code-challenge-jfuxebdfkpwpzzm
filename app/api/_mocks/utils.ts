import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { Order } from "@/app/_types";
import { lineItems } from "./lineItems";
import { challengeSubmitDate } from "@/app/_utils";

// Generate massive amounts of data with faker. Faker is used
// in orders.ts to generate 1k+ orders with random data.
// See: https://fakerjs.dev/
faker.seed(1);

const lineItemIds = lineItems.map((lineItem) => {
  return lineItem.id;
});

// Returns an order populated with randomly generated data.
export const createOrder = (): Order => {
  return {
    id: faker.number.int(),
    // Order formatted as cents, assume CAD currency.
    orderTotal: faker.number.int(),
    orderDate: faker.date
      .between({
        from: dayjs(challengeSubmitDate).toDate(),
        to: dayjs(challengeSubmitDate).add(10, "days").toDate(),
      })
      .toISOString(),
    // Customer objects could be stored in their own collection/table and
    // referenced by customer id, however, literal values are used here.
    customerEmail: faker.internet.email(),
    customerName: faker.person.fullName(),
    // A shipping address is currently a property of an order but could
    // alternatively be modelled as a property of various customer objects.
    shippingAddress: faker.location.streetAddress(),
    // Line items are included by id. A backend (eg., express) or
    // database (eg., mongo) could embed literal values if required.
    lineItems: Array(faker.number.int({ min: 1, max: 10 }))
      .fill(1)
      // The amount of a line item is implicit by presence in the products array.
      // Alternatively, amount can be modelled by adding "amount" fields.
      .map(() => {
        // Generate 1 to 10 line items within the range of possible line item ids.
        return faker.number.int({
          min: Math.min(...lineItemIds),
          max: Math.max(...lineItemIds),
        });
      }),
  };
};

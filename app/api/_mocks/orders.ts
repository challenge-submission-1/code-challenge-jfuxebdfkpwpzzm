// No support for code comments in JSON, use TS.

import { Order } from "@/app/_types";
import { createOrder } from "@/app/api/_mocks/utils";

const ordersToGenerate = 1000;

export const orders: Order[] = Array(ordersToGenerate)
  .fill(1)
  .map(() => {
    return createOrder();
  });

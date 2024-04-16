import dayjs from "dayjs";
import { OrderWithLineItems, ProductRequirements } from "../_types";

interface GetOrdersOptions {
  endDate?: string;
  startDate?: string;
}

// Returns a set of orders within a date range including embeded line items.
export const getOrders = async (
  options: GetOrdersOptions,
): Promise<OrderWithLineItems[]> => {
  // This function should be available server side and client side,
  // the root url should come from a config system, hardcode for now.
  const url = new URL("http://localhost:3000");

  url.pathname = "/api/orders";

  // Use the startDate and endDate provided in options or use reasonable
  // defaults. The function could be updated to have defaults configurable.
  url.searchParams.set(
    "endDate",
    options.endDate ?? dayjs().endOf("day").toISOString(),
  );
  url.searchParams.set(
    "startDate",
    options.startDate ?? dayjs().startOf("day").toISOString(),
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Some essential fetch error handling here (ie., response.ok). Additional
  // error handling can be added here in the future, (eg., response from server).
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const responseJson = await response.json();

  return responseJson.data;
};

interface GetProductRequirementsOptions {
  endDate?: string;
  startDate?: string;
}

// Returns order products requirements grouped by requirement amount within a date range.
export const getProductRequirements = async (
  options: GetProductRequirementsOptions,
): Promise<ProductRequirements> => {
  // This function should be available server side and client side,
  // the root url should come from a config system, hardcode for now.
  const url = new URL("http://localhost:3000");

  url.pathname = "/api/product-requirements";

  // Use the startDate and endDate provided in options or use reasonable
  // defaults. The function could be updated to have defaults configurable.
  url.searchParams.set(
    "endDate",
    options.endDate ?? dayjs().endOf("day").toISOString(),
  );
  url.searchParams.set(
    "startDate",
    options.startDate ?? dayjs().startOf("day").toISOString(),
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Some essential fetch error handling here (ie., response.ok). Additional
  // error handling can be added here in the future, (eg., via response from server).
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const responseJson = await response.json();

  return responseJson.data;
};

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
} from "@mui/material";
import { OrderWithLineItems } from "@/app/_types";
import OrdersTableRow from "./OrdersTableRow";

// Always extend root~ node of component and spread remaining props to that node.
interface OrdersTableProps extends TableProps {
  orders: OrderWithLineItems[];
}

// Tables with lots of data could be virtualized in a future version.

export const OrdersTable = ({ orders, ...props }: OrdersTableProps) => {
  return (
    <TableContainer>
      <Table aria-label="Orders Table" size="small" {...props}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Row</TableCell>
            <TableCell>Order Id</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Shipping Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => {
            return (
              <OrdersTableRow key={order.id} index={index} order={order} />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;

"use client";

import { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  TableRowProps,
  Typography,
} from "@mui/material";
import { OrderWithLineItems } from "@/app/_types";
import LineItemsTable from "./LineItemsTable";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import dayjs from "dayjs";

// Always extend root~ node of component and spread remaining props to that node.
interface OrdersRowProps extends TableRowProps {
  index: number;
  order: OrderWithLineItems;
}

export const OrdersTableRow = ({ index, order, ...props }: OrdersRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow {...props}>
        <TableCell>
          <IconButton
            aria-label="Expand row"
            size="small"
            onClick={() => setOpen((open) => !open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{dayjs(order.orderDate).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{order.customerName}</TableCell>
        <TableCell>{order.shippingAddress}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} sx={{ py: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ my: 4 }}>
              <Typography variant="h3" sx={{ fontSize: 18 }}>
                Line Items
              </Typography>
              <LineItemsTable lineItems={order.lineItems} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersTableRow;

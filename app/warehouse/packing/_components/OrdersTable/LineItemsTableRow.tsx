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
import { LineItem } from "@/app/_types";
import { ProductsTable } from "./ProductsTable";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

// Always extend root~ node of component and spread remaining props to that node.
interface LineItemsTableRowProps extends TableRowProps {
  index: number;
  lineItem: LineItem;
}

export const LineItemsTableRow = ({
  index,
  lineItem,
  ...props
}: LineItemsTableRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ borderBottom: "none" }} {...props}>
        <TableCell>
          <IconButton
            aria-lable="Expand row"
            size="small"
            onClick={() => setOpen((open) => !open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{lineItem.id}</TableCell>
        <TableCell>{lineItem.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 4 }}>
              <Typography variant="h4" sx={{ fontSize: 18 }}>
                Products
              </Typography>
              <ProductsTable products={lineItem.products} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default LineItemsTableRow;

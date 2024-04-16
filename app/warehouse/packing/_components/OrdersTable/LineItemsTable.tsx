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
import { LineItem } from "@/app/_types";
import LineItemsTableRow from "./LineItemsTableRow";

// Always extend root~ node of component and spread remaining props to that node.
interface LineItemsTableProps extends TableProps {
  lineItems: LineItem[];
}

export const LineItemsTable = ({
  lineItems,
  ...props
}: LineItemsTableProps) => {
  return (
    <TableContainer>
      <Table aria-label="Line Items Table" size="small" {...props}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Row</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((lineItem, index) => {
            return (
              <LineItemsTableRow
                key={lineItem.id}
                index={index}
                lineItem={lineItem}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LineItemsTable;

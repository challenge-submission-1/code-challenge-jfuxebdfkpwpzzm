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
import { ProductRequirements } from "@/app/_types";

// Always extend root~ node of component and spread remaining props to that node.
interface ProductRequirementTableProps extends TableProps {
  productRequirements: ProductRequirements;
}

export const ProductRequirementsTable = ({
  productRequirements,
  ...props
}: ProductRequirementTableProps) => {
  return (
    <TableContainer>
      <Table aria-label="Product Requirements Table" {...props}>
        <TableHead>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(productRequirements).map(([name, amount], index) => {
            return (
              <TableRow key={name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductRequirementsTable;

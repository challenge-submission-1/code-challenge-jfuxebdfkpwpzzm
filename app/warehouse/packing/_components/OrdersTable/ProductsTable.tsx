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
import { Product } from "@/app/_types";

// Always extend root~ node of component and spread remaining props to that node.
interface ProductsTableProps extends TableProps {
  products: Product[];
}

export const ProductsTable = ({ products, ...props }: ProductsTableProps) => {
  return (
    <TableContainer>
      <Table aria-label="Products Table" {...props}>
        <TableHead>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => {
            return (
              <TableRow key={product.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;

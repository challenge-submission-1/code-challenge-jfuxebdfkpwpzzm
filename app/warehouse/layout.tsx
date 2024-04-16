"use client";

import {
  AppBar,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

// This layout includes an app/nav bar visible on all sub-pages containing
// links to the two warehouse problem solutions: packing and picking.

export default function WarehouseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack direction="column" spacing={2}>
      <AppBar
        color="transparent"
        sx={{ position: "static" }}
        variant="outlined"
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Warehouse</Typography>
          <Stack component="nav" direction="row" spacing={2}>
            <Link href="/warehouse/packing">Packing</Link>
            <Link href="/warehouse/picking">Picking</Link>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container sx={{ margin: "0 auto" }}>{children}</Container>
    </Stack>
  );
}

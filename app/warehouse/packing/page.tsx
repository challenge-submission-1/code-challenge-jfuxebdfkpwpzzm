// Next.js will pre-render (ssg/ssr) client component initial state server side.
// See: https://www.reddit.com/r/nextjs/comments/185xxq5/does_initial_state_get_prerendered_and_sent_to/
"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getOrders } from "@/app/warehouse/_utils";
import OrdersTable from "@/app/warehouse/packing/_components/OrdersTable/OrdersTable";
import { OrderWithLineItems } from "@/app/_types";
import { challengeSubmitDate } from "@/app/_utils";

// This Next.js page is the solution for question 1's workflow 2 problem:
// The packing team needs a list of orders, the order information, the line
// items in each order, and the individual products that make up the line item.

export default function PackingPage() {
  const [date, setDate] = useState(dayjs().startOf("day"));
  const [orders, setOrders] = useState<OrderWithLineItems[]>([]);

  useEffect(() => {
    const populate = async () => {
      // All business logic for finding product requirements is serverside (ie., api handlers).
      const orders = await getOrders({
        // The endpoint supports date ranges as a general purpose feature
        // and can return orders over any range of time. Here it's
        // used by the client to only request a single day's orders.
        endDate: date.endOf("day").toISOString(),
        startDate: date.toISOString(),
      });
      setOrders(orders);
    };

    populate();
  }, [date]);

  // The style of a typography element is not coupled to its semantics. Either way,
  // app-wide styling should be done via mui theme files, using sx below instead.
  // See: https://mui.com/material-ui/react-typography/#changing-the-semantic-element

  // The component below (Stack) containing the page title and datepicker
  // components could be made common (eg., via layout) between all workflows.

  // An advanced component like a datagrid (eg., mui data grid) can be a
  // good alternative in place of a table here for its various advanced features.

  return (
    <Stack direction="column" spacing={4}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h1" sx={{ fontSize: 32 }}>
          Packing
        </Typography>
        <DatePicker
          label="Date Picker"
          minDate={challengeSubmitDate}
          onChange={(newValue) => {
            if (newValue) {
              setDate(newValue);
            }
          }}
          slotProps={{
            textField: { size: "small" },
          }}
          value={date}
        />
      </Stack>
      <Box>
        <Typography variant="h2" sx={{ fontSize: 24 }}>
          Orders
        </Typography>
        <OrdersTable orders={orders} />
      </Box>
    </Stack>
  );
}

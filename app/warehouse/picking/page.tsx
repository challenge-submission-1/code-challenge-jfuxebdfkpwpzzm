// Next.js will pre-render (ssg/ssr) client component initial state server side.
// See: https://www.reddit.com/r/nextjs/comments/185xxq5/does_initial_state_get_prerendered_and_sent_to/
"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getProductRequirements } from "@/app/warehouse/_utils";
import ProductRequirementsTable from "@/app/warehouse/picking/_components/ProductRequirementTable/ProductRequirementTable";
import { ProductRequirements } from "@/app/_types";
import { challengeSubmitDate } from "@/app/_utils";

// This Next.js page is the solution for question 1's workflow 1 problem:
// The picking team needs a list of all the items they need to pick up for that day.

export default function PickingPage() {
  const [date, setDate] = useState(dayjs().startOf("day"));
  const [productRequirements, setProductRequirements] =
    useState<ProductRequirements>({});

  useEffect(() => {
    const populate = async () => {
      // All business logic for finding product requirements is serverside (ie., api handlers).
      const productRequirements = await getProductRequirements({
        // The endpoint supports date ranges as a general purpose feature
        // and can return product requirements over any range of time. Here
        // it's used by the client to only request a single day's requirements.
        endDate: date.endOf("day").toISOString(),
        startDate: date.toISOString(),
      });

      setProductRequirements(productRequirements);
    };

    populate();
  }, [date]);

  return (
    <Stack component="main" direction="column" spacing={4}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h1" sx={{ fontSize: 32 }}>
          Picking
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
          Product Requirements
        </Typography>
        <ProductRequirementsTable productRequirements={productRequirements} />
      </Box>
    </Stack>
  );
}

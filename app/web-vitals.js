"use client";

import { useReportWebVitals } from "next/web-vitals";

// Mock implementation (eg., logging) of web vital observability. Ideally,
// this data should be sent to a system that collects observability data.
export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return null;
}

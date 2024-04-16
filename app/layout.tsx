// Next.js will pre-render (ssg/ssr) client component initial state server side.
// See: https://www.reddit.com/r/nextjs/comments/185xxq5/does_initial_state_get_prerendered_and_sent_to/
//
// The warehouse app should be best served as a client side rendered app, there
// may also be some optimizations to consider with statically rendering the app.
"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { WebVitals } from "@/app/web-vitals";

const inter = Inter({ subsets: ["latin"] });

// Typically, mui apps are themed to match the design system. Added theme provider
// below for demonstration but no theme included, any styling done using sx prop.

// Using mui's CssBaseline component to reset styles on the page (eg,. like normalize.css).

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={{}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <WebVitals />
              <CssBaseline />
              {children}
            </LocalizationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bermuda Ferry Schedule | Official Timetable and Routes",
  description: "Find up-to-date Bermuda ferry schedules, routes, and real-time information. Plan your journey across Bermuda's beautiful waters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import "./globals.css";
import { Oswald } from "next/font/google";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
export const metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan, and log every set.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={oswald.variable}>
      <body>
        <PlanProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}

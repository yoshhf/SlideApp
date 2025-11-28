import "./globals.css";
import type { Metadata } from "next";
import ControlsShell from "@/components/ControlsShell";

export const metadata: Metadata = {
  title: "Slidebook",
  description: "Slide book viewer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ControlsShell>
          {children}
        </ControlsShell>
      </body>
    </html>
  );
}

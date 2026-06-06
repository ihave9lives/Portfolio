import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import InteractiveBackground from "@/components/InteractiveBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sashankar J | AI & DevOps Engineer",
  description: "Personal portfolio of Sashankar J - AI-driven DevOps engineering student.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <InteractiveBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

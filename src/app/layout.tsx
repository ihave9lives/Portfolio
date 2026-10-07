import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import InteractiveBackground from "@/components/InteractiveBackground";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Sashankar J | AI & DevOps Engineer",
  description: "Rust + Tauri desktop apps, Streamlit experiences, agentic AI with Hermes. Welcome to the grid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
                  media="print"
                />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect x='4' y='4' width='56' height='56' rx='12' fill='%2305070d' stroke='%2300e5ff' stroke-width='3'/%3E%3Ctext x='32' y='44' font-family='monospace' font-size='30' fill='%23ff2ec4' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E"
        />
        <meta name="theme-color" content="#05070d" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              /* error trap for diagnostics */
              window.__errs = [];
              window.addEventListener('error', function (e) {
                window.__errs.push((e.message || 'err') + ' @' + (e.filename || '?') + ':' + (e.lineno || '?'));
              });
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`} style={{ overflowX: "hidden" }}>
        <div id="net" className="fixed inset-0 z-[-3] pointer-events-none" />
        <div className="noise fixed inset-0 z-[-2] pointer-events-none opacity-[0.035]" />
        <div className="scanlines fixed inset-0 z-[3] pointer-events-none opacity-[0.35]" />
        <InteractiveBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
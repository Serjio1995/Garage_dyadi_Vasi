import "./globals.css";
import type { Metadata } from "next";
import { Russo_One, Oswald, PT_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticCursor from "@/components/ui/MagneticCursor";

const poster = Russo_One({ weight: "400", subsets: ["cyrillic", "latin"], variable: "--f-poster" });
const body = Oswald({ subsets: ["cyrillic", "latin"], variable: "--f-body" });
const mono = PT_Mono({ weight: "400", subsets: ["cyrillic", "latin"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: "Гараж дяди Васи — ремонт и реставрация советских автомобилей",
  description: "Кооператив «Мотор», бокс 17. Капиталка, кузов, салон, карбюраторы. Четыре человека, один подъёмник.",
  icons: { icon: "/images/emblem.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${poster.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/gate-1920.webp" media="(min-width: 801px)" />
        <link rel="preload" as="image" href="/images/gate-1080.webp" media="(max-width: 800px)" />
      </head>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
        <MagneticCursor />
      </body>
    </html>
  );
}

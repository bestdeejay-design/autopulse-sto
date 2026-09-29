import type { Metadata } from "next";
import { Unbounded, Manrope, Inter, JetBrains_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import "../components/components.css";

const display = Unbounded({
  weight: ["600", "700"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-display-next"
});

const head = Manrope({
  weight: ["700", "800"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-head-next"
});

const body = Inter({
  weight: ["400", "500", "600"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-body-next"
});

const mono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-mono-next"
});

export const metadata: Metadata = {
  title: "АвтоПульс — СТО полного цикла в Москве",
  description:
    "АвтоПульс — премиальное СТО полного цикла в Москве: диагностика, ТО, ремонт двигателя, тормозной системы и электрики. Запись онлайн за 1 минуту.",
  openGraph: {
    title: "АвтоПульс — СТО полного цикла в Москве",
    description:
      "Диагностика, ТО, ремонт и электрика. Честные цены в рублях, гарантия 12 месяцев.",
    type: "website",
    locale: "ru_RU",
    siteName: "АвтоПульс"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${head.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import "../components/components.css";

/**
 * Maybach Night Edition — типографика
 *
 * Подход:
 * - Шрифты Google Fonts (Cormorant Garamond, Manrope, Inter, JetBrains Mono)
 *   подключаются через <link> в head (см. ниже) — это опционально и
 *   не ломает сборку при отсутствии сети.
 * - CSS-переменные шрифтов определены в globals.css с качественными
 *   системными fallback'ами, чтобы сайт работал и без веб-шрифтов.
 */

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#050608"
};

export const metadata: Metadata = {
  title: "АвтоПульс — Премиальное СТО в Москве · Maybach-класс обслуживания",
  description:
    "АвтоПульс — премиальная станция техобслуживания в Москве: диагностика, ТО, ремонт двигателя и электрики. Индивидуальный подход, гарантия 24 месяца, фотоотчёт в мессенджер.",
  openGraph: {
    title: "АвтоПульс — Премиальное СТО в Москве",
    description:
      "Сервис уровня Mercedes-Maybach: тотальная диагностика, честная смета, мастера с опытом 10+ лет.",
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
    <html lang="ru">
      <head>
        {/* Preconnect к Google Fonts для ускорения первой загрузки */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Шрифты (опционально — fallback'ы в globals.css обеспечат работу) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
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

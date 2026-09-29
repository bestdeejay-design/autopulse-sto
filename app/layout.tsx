import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import "../components/components.css";

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
    <html lang="ru">
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

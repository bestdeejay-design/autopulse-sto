# АвтоПульс — СТО полного цикла в Москве

Премиальный сайт станции техобслуживания полного цикла: диагностика, ТО,
ремонт двигателя, тормозной системы, подвески и электрики. Тёмная тема,
адаптивная вёрстка, онлайн-калькулятор стоимости и запись на сервис.

## Запуск

```bash
npm install
npm run dev     # разработка: http://localhost:3000
npm run build   # production-сборка
npm start       # запуск собранного сайта
```

## Структура

```
app/
  layout.tsx      # корневой layout, Header/Footer, подключение стилей
  page.tsx        # главная: hero, услуги, преимущества + секции ниже
  globals.css     # тёмные токены, базовые стили
  page.module.css # стили главной страницы
components/
  Calculator.tsx  # калькулятор стоимости (id="calculator")
  BookingForm.tsx # форма онлайн-записи (id="booking")
  Reviews.tsx     # отзывы и кейсы (id="reviews")
  Contacts.tsx    # контакты, мессенджеры, карта (id="contacts")
  pricing.ts      # цены, услуги, слоты времени, отзывы
  index.ts        # баррель-экспорт
  components.css  # тёмные стили интерактивов (ap-*)
  Header.tsx / Footer.tsx
public/
  sto-hero.svg
```

Секции главной идут в порядке: hero → услуги → преимущества →
калькулятор (`#calculator`) → запись (`#booking`) → отзывы (`#reviews`) →
контакты (`#contacts`).

## Стек

Next.js 14 (App Router), React 18, TypeScript strict, чистый CSS без зависимостей.

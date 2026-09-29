# АвтоПульс — Maybach Night Edition

Премиальный сайт станции техобслуживания полного цикла в&nbsp;стиле
Mercedes-Maybach × Porsche. Тёмная ночная тема, шрифт Cormorant Garamond
с засечками для заголовков, звёздный потолок (Maybach Starlight Headliner),
champagne-золото как основной акцент, glass-панели и&nbsp;хромированные
pinstripe'ы.

## Запуск

```bash
npm install
npm run dev     # разработка: http://localhost:3000/autopulse-sto
npm run build   # production-сборка
npm start       # запуск собранного сайта
```

## Концепция (Maybach Night)

- **Палитра:** `obsidian` (#050608) → `onyx` → `carbon` с&nbsp;champagne-золотом
  (#D4B87A) и&nbsp;ruby (#A8313A) как акцентами.
- **Типографика:**
  - **Cormorant Garamond** (с кириллицей) — заголовки и&nbsp;лид-тексты,
    курсивные акценты в&nbsp;золоте
  - **Manrope** — UI, навигация, кнопки
  - **Inter** — основной текст
  - **JetBrains Mono** — цены, время, мета-данные, бейджи
- **Эффекты:**
  - **Starlight Headliner** — 140 мерцающих точек в&nbsp;hero (медленный twinkle),
    80 в&nbsp;футере, с&nbsp;редкой shooting star
  - **Pulse Trace** — золотая горизонтальная полоса с&nbsp;бегущим бликом
  - **Glass** — полупрозрачные панели с&nbsp;blur(20px) saturate(1.4)
  - **Chrome Trim** — хромированная обводка через gradient mask
  - **Ambient Glow** — мягкое свечение при hover на&nbsp;карточках преимуществ
- **Без эмодзи, без неона, без фиолетовых градиентов.** Весь дизайн&nbsp;—
  в&nbsp;тёмных тонах с&nbsp;одним тёплым золотым акцентом и&nbsp;холодным
  ruby для вторичных сигналов.

## Структура

```
app/
  layout.tsx      # корневой layout, Header/Footer, подключение шрифтов через <link>
  page.tsx        # главная: 11 секций (см. ниже)
  globals.css     # токены Maybach Night, glass, starlight, pulse-trace
  page.module.css # стили главной страницы
components/
  Header.tsx / Header.module.css
  Footer.tsx / Footer.module.css           # со звёздным потолком
  HeroScene.tsx                             # SVG-сцена "Maybach в цеху"
  Starlight.tsx                             # звёздный потолок (генерирует ~120 точек)
  FaqSection.tsx / FaqSection.module.css    # аккордеон
  Calculator.tsx                            # калькулятор ТО (id="calculator")
  BookingForm.tsx                           # форма онлайн-записи (id="booking")
  Reviews.tsx                               # отзывы (id="reviews")
  Contacts.tsx                              # контакты (id="contacts")
  Icons.tsx                                 # набор иконок (Wrench, Pulse, Engine, ...)
  pricing.ts                                # цены, услуги, отзывы, контакты
  components.css                            # стили интерактивов (ap-*)
  index.ts                                  # баррель-экспорт
```

## Секции главной (в порядке скролла)

1. **Hero** — звёздный потолок, заголовок «Сервис уровня Maybach. Для всех.»,
   SVG-сцена авто в&nbsp;цеху, плавающая карточка «Сейчас в&nbsp;работе»,
   статы (12 лет · 9 400+ · 4,9 · 24 мес.)
2. **Trust bar** — премиальные марки (Mercedes, Porsche, BMW...) + бейджи
   гарантии и&nbsp;оплаты
3. **Преимущества** — 4 стеклянные карточки (смета, гарантия, фотоотчёт, склад)
4. **Услуги** — 8 карточек с&nbsp;ценой, акцентная «Популярно» на&nbsp;ТО
5. **Калькулятор** (`#calculator`) — класс авто, услуги, sticky-итог в&nbsp;золоте
6. **Процесс** — 5 шагов с&nbsp;хромированными стрелками между ними
7. **Кейсы** (`#cases`) — 3 премиум-кейса (Maybach S 580, Porsche Cayenne, BMW X5)
8. **Отзывы** (`#reviews`) — слайдер, 5 звёзд, рейтинг 4,9
9. **FAQ** — аккордеон на&nbsp;5 вопросов
10. **Запись** (`#booking`) — форма с&nbsp;маской телефона и&nbsp;слотами времени
11. **Контакты** (`#contacts`) — адрес, часы, мессенджеры, заглушка карты

## Стек

Next.js 14 (App Router) + React 18 + TypeScript strict. Чистый CSS
без UI-зависимостей. Шрифты подгружаются через `<link>` (опционально,
есть system fallback'и).

## Изображения и&nbsp;иконки

Вместо внешних фото&nbsp;— кастомные SVG-сцены (`HeroScene.tsx`), которые
идеально масштабируются, весят килобайты и&nbsp;полностью контролируются
по&nbsp;палитре. Все иконки&nbsp;— inline SVG (`Icons.tsx`), stroke 1.5,
круглые концы. Никаких эмодзи.

## Производительность

- First Load JS: ~95 KB (страница 8.2 KB)
- Никаких внешних ресурсов в&nbsp;критическом пути (шрифты&nbsp;— preconnect + async)
- Все анимации только `transform`/`opacity`
- `prefers-reduced-motion` уважается

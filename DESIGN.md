# DESIGN.md — «АвтоПульс» СТО полного цикла

> Статус: дизайн-контракт v1.0 (гринфилд). Любой UI-код обязан ссылаться на токены из этого файла. Хардкод цветов/отступов/кеглей вне токенов — запрещён.
> Стек: Next.js (App Router) + CSS-переменные. Без UI-фреймворка на старте.
> Компания-заглушка: «АвтоПульс», СТО полного цикла, Москва. Язык контента — русский.

## 0. Направление (taste)

**Тезис:** ночь, трасса, точность. Тёмный премиум уровня Tesla / Porsche / Linear / Stripe: глубокий асфальтовый фон, один электрический акцент, стекло, крупные фото авто, инженерная сетка и моноширинные данные (цены, VIN, время).

**Три AI-клише под запретом:**
1. Кремовый фон + serif + терракота — нет.
2. Near-black + кислотный неон на всё подряд — нет (лайм только как сигнал, дозированно).
3. Газетная верстка с hairline-линейками — нет (линии только конструктивные: сетка, трасса).

**Signature-элемент: «Световая трасса» (Pulse Trace).** Тонкая горизонтальная световая полоса (1–2px, градиент прозрачный → лайм → прозрачный + мягкое свечение `blur`), проходящая сквозь лендинг как разметка ночной трассы. В hero — под заголовком / поверх фото авто. Между секциями — разделитель-трасса с бегущим пульсом (анимация только `opacity` + `transform: translateX`). На десктопе пульс движется при скролле (scrub через `transform`), на мобильных — статичен или медленный loop. Один на страницу акцентный изгиб трассы — в секции «Процесс» (SVG-путь из 5 точек-шагов).

**Материал:** стекло (`glass`) + карбон. Карточки — полупрозрачные панели на фоне с шумом асфальта и крупными фото (фары, диск, мотор). Никаких плоских фиолетовых градиентов.

---

## 1. Токены

### 1.1. Палитра (ядро — 6 hex)

| Токен | Hex | Роль |
|---|---|---|
| `--void` | `#0A0C10` | Фон страницы, глубокий асфальт |
| `--carbon` | `#141922` | Поверхность: карточки, шапка, футер |
| `--bone` | `#F2F4F7` | Основной текст |
| `--steel` | `#98A2B3` | Вторичный текст, подписи, плейсхолдеры |
| `--pulse` | `#C9F31D` | Главный акцент — электрик-лайм: CTA, активные состояния, трасса, цены-хиты |
| `--volt` | `#4D7CFE` | Вторичный акцент — электрик-синий: статусы, свечение фар, ссылки, инфо-бейджи |

Производные (только через `color-mix`, новых hex не вводить):
- `--line: color-mix(in srgb, var(--bone) 12%, transparent)` — бордеры (~`#262E3D` на `--void`).
- `--glass: color-mix(in srgb, var(--carbon) 72%, transparent)` — фон стеклянных панелей.
- `--pulse-dim: color-mix(in srgb, var(--pulse) 14%, transparent)` — подложка бейджей/ховеров.
- `--pulse-ink: #111400` — текст на лайм-кнопке (тёмный для контраста ≥ 12:1).
- Состояния: `--success: var(--pulse)`; `--info: var(--volt)`; `--warning: #FFB224`; `--danger: #FF5C5C` (warning/danger — только для форм/ошибок, не для декора).
- Оверлей на фото: `linear-gradient(180deg, rgba(10,12,16,.1), rgba(10,12,16,.82))` — текст поверх фото всегда на затемнении.

Правила использования:
- Лайм — только действие и сигнал: 1 primary-CTA на экран, активный таб, пульс трассы, маркер «хит». Запрещено заливать лаймом крупные фоны.
- Синий `--volt` — только информация: статусы («Свободно сегодня»), свечение, ссылки. Не конкурирует с лаймом в одном блоке.
- Текст на фото — только `--bone` на оверлее ≥ 60% затемнения снизу.

### 1.2. Типографика (кириллица обязательна)

| Роль | Шрифт | Веса | Применение |
|---|---|---|---|
| Display | `Unbounded`, fallback `Manrope` | 600 / 700 | Hero H1, цифры-статы, номера секций. Только заголовки, не body |
| Heading | `Manrope` | 700 / 800 | H2/H3, заголовки карточек |
| Body | `Inter` | 400 / 500 / 600 | Текст, пункты, кнопки, навигация |
| Mono | `JetBrains Mono` | 400 / 500 | Цены, VIN, время, бейджи, лейблы секций, калькулятор |

Загрузка: `next/font/google` — `Unbounded:wght@600;700`, `Manrope:wght@500;700;800`, `Inter:wght@400;500;600`, `JetBrains Mono:wght@400;500` — все с `subsets: ['cyrillic','latin']`, `display: swap`.

Шкала (desktop / mobile):
- `display-xl: 64/40`, `lh 1.02`, `ls -0.02em` — только H1 hero.
- `display-m: 48/32`, `lh 1.05` — H2 секций.
- `h3: 24/20`, `lh 1.2` — карточки услуг/кейсов.
- `body-l: 18/17`, `lh 1.6` — лид-абзацы.
- `body-m: 16/15`, `lh 1.6` — основной текст.
- `caption: 13`, `lh 1.5`, `steel` — подписи.
- `mono-label: 12`, `uppercase`, `ls .12em` —-eyebrow над H2 (`01 — Услуги`).

Правила: одно H1 на страницу; H2 всегда с mono-eyebrow (`номер — название`); длина строки body ≤ 68ch; Display не уже 3 слов переноса; sentence case (не КАПС, кроме mono-label).

### 1.3. Spacing (база 4px)

`--s1:4, --s2:8, --s3:12, --s4:16, --s6:24, --s8:32, --s12:48, --s16:64, --s24:96, --s32:128`

- Ритм секций: `padding-block: var(--s24)` desktop (96px), `var(--s16)` mobile (64px).
- Контейнер: `max-width: 1200px`, `padding-inline: 24px` (mobile 16px).
- Сетка: 12 колонок desktop, 6 tablet, 4 mobile; gutter 24/16.
- Gap в карточках: 16 внутри, 24 между. Кнопка: `padding: 14px 28px`, иконка SVG 18px + gap 8.
- Произвольные значения (`margin:13px`) запрещены — только шкала.

### 1.4. Радиусы, тени, бордеры, стекло

- Радиусы: `--r-s:10px` (инпуты, бейджи-квадратные), `--r-m:14px` (кнопки), `--r-l:20px` (карточки), `--r-full:999px` (пилюли, FAB, аватары).
- Бордеры: `1px solid var(--line)` на всех карточках; активная карточка — `1px solid color-mix(in srgb, var(--pulse) 55%, transparent)`.
- Тени: `--shadow-card: 0 12px 40px rgba(0,0,0,.45)`; `--shadow-glow: 0 0 24px rgba(201,243,29,.28)` (только для primary-CTA hover и пульса трассы). Синее свечение фар на фото — в самом изображении, не CSS-фильтром.
- Стекло: `.glass { background: var(--glass); backdrop-filter: blur(16px) saturate(1.2); border: 1px solid var(--line); border-radius: var(--r-l); }` — шапка при скролле, карточка калькулятора, форма записи поверх фото цеха.

### 1.5. CSS-переменные (канон для кода)

```css
:root {
  --void:#0A0C10; --carbon:#141922; --bone:#F2F4F7; --steel:#98A2B3;
  --pulse:#C9F31D; --volt:#4D7CFE; --pulse-ink:#111400;
  --line:color-mix(in srgb, var(--bone) 12%, transparent);
  --glass:color-mix(in srgb, var(--carbon) 72%, transparent);
  --font-display:"Unbounded","Manrope",system-ui,sans-serif;
  --font-head:"Manrope",system-ui,sans-serif;
  --font-body:"Inter",system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
}
```

---

## 2. Primitives (состояния обязательны: default / hover / focus-visible / active / disabled)

### Buttons
- **Primary (лайм):** фон `--pulse`, текст `--pulse-ink`, `Manrope 700 16px`, `radius var(--r-m)`, `padding 14px 28px`. Hover: `transform: translateY(-1px)` + `--shadow-glow`. Active: `translateY(0) scale(.99)`. Disabled: `opacity .4`, без свечения. SVG-стрелка `→` 18px справа.
- **Secondary (ghost):** прозрачный, `1px var(--line)`, текст `--bone`. Hover: бордер `var(--pulse)` + текст `var(--pulse)`.
- **Tertiary (text):** без фона, текст `--steel`, hover — `--bone`. Для «Все услуги», «Схема проезда».
- Правило: один primary на вьюпорт. В hero — «Записаться на диагностику», остальные — secondary.

### Cards
- **Service-card:** `.glass`, `padding 24`, иконка SVG 28px в лайм-чипе 48×48 (`--pulse-dim` фон), H3 + 2 строки + mono-цена «от 2 500 ₽» + link «Подробнее →». Hover: `translateY(-4px)`, бордер в лайм 55%. Вся карточка — `<a>` (кликабельная, focus-visible обводка).
- **Price/calc-card:** `--carbon` сплошной + бордер; строки калькулятора — mono-цены справа; итог — Display 32px + лайм.
- **Case-card:** фото 16/10 с оверлеем, снизу glass-плашка: mono-метка (`BMW X5 · Двигатель`), H3-результат, 2 метрики mono (`4 дня · −38% расход масла`).
- **Review-card:** аватар 40 круг + имя + mono (`Kia Rio · ТО-60`), звёзды — SVG 5×16px (заливка `--pulse`, не эмодзи), текст ≤ 3 строк + «Читать» (expand).

### Inputs (форма записи)
- Тёмные: фон `color-mix(in srgb, var(--bone) 5%, transparent)`, бордер `var(--line)`, `radius var(--r-s)`, `padding 14px 16px`, текст `--bone`, плейсхолдер `--steel`. Focus: бордер `--pulse` + `outline: 2px solid color-mix(in srgb, var(--pulse) 40%, transparent)`. Error: бордер `#FF5C5C` + подпись 13px. Лейблы 13px `--steel` над полем. Поля: имя, телефон (`+7 ___ ___-__-__`, маска), авто (марка/модель), услуга (select), дата/время (select слотов), комментарий (textarea). Чекбокс согласия — кастомный 20px, focus-visible обязателен.
- Сегмент-калькулятора (табы услуг) — пилюли `r-full`, активная — лайм-фон + тёмный текст.

### Badges / chips
- `.badge`: mono 12 uppercase, `padding 6px 12px`, `r-full`, бордер `var(--line)`, текст `--steel`. Варианты: `--hit` (лайм фон + тёмный текст, «Хит — ТО от 4 900 ₽»), `--free` (синий тинт, «Свободно сегодня»), `--warranty` («Гарантия 1 год», бордер-лайм). Иконки — только inline-SVG 14px (галочка, часы, щит), эмодзи запрещены везде.

### Header / nav / footer
- Шапка: фиксированная, transparent → `.glass` после 24px скролла; логотип — SVG-пульс (искра/тахометр, не чужой логотип) + «АвтоПульс» Manrope 800; nav 15px; справа mono-телефон + primary «Записаться». Mobile — бургер → полноэкранное меню.
- Кнопка «наверх»: круг 48px `r-full`, бордер, стрелка SVG, появляется после 600px, `aria-label="Наверх"`.
- Футер: `--carbon`, 3 колонки (услуги / контакты / режим), mono-реквизиты, ссылка «Политика».

---

## 3. Motion (только transform + opacity)

- Easing: `--ease-out: cubic-bezier(.22,1,.36,1)`; длительности `--d-fast:150ms` (ховеры), `--d-med:300ms` (появления), `--d-slow:600ms` (hero, трасса).
- Появление секций: `opacity 0 → 1` + `translateY(16px → 0)`, `300ms var(--ease-out)`, stagger 60ms, запуск по IntersectionObserver один раз. Анимация layout-свойств (`width/height/margin/top`) запрещена.
- Пульс трассы: псевдо-элемент 120px градиента едет `translateX(-10% → 110%)`, `3.2s linear infinite`, только `opacity/transform`. Scrub-вариант на десктопе — `translateX` от прогресса скролла.
- Кнопки/карточки — только `translateY/scale` (см. §2). Фото — медленный `scale(1.04)` при hover карточки (transform, `600ms`).
- `prefers-reduced-motion: reduce` — все анимации `none`, трасса статична, появления мгновенные.

---

## 4. Responsive

| Брейкпоинт | Контейнер / сетка | Hero | Секции |
|---|---|---|---|
| **375 (mobile)** | `padding 16`, 4 колонки, 1 карточка в ряд | H1 40, фото 16/10 под текстом, CTA full-width, статы 2×2 | Секции 64px; калькулятор — аккордеон; процесс — вертикальная трасса; отзывы — свайп-карусель |
| **768 (tablet)** | `padding 24`, 6 колонок | H1 48, двухколоночный hero (текст/фото), CTA в ряд | Услуги 2 кол., кейсы 2 кол., форма под калькулятором |
| **1280 (desktop)** | `max 1200`, 12 колонок, gutter 24 | H1 64, hero 7/5 (текст / фото цеха с glass-плашкой «Свободно 3 поста»), трасса под H1 | Услуги 3–4 кол., калькулятор 7/5 (опции/итог sticky), процесс — горизонтальная SVG-трасса из 5 шагов, кейсы 3 кол. |

- Изображения: `next/image`, `sizes="(max-width:768px) 100vw, 50vw"`, hero — `priority`, остальные — `loading="lazy"`, `alt` на русском со смыслом («Механик проверяет тормозной диск BMW»).
- Тач-таргеты ≥ 44px; таблицы цен на mobile — карточки, не горизонтальный скролл.
- Бэк-ту-топ + sticky-mobile CTA («Записаться» bottom-bar) только ≤ 768px.

---

## 5. A11y-ограничения (обязательные)

- Контраст: `--bone` на `--void` ~15:1; `--steel` на `--void` ≥ 4.6:1 (только крупный/вторичный текст, body на `steel` запрещён); `--pulse-ink` на `--pulse` ≥ 12:1. Лайм-текст на тёмном — только mono ≥ 14px bold или крупный.
- Фокус: `:focus-visible { outline: 2px solid var(--pulse); outline-offset: 3px; border-radius: 6px; }` на всех интерактивных. Порядок таба: шапка → hero CTA → секции → форма → футер; ловушек фокуса нет, кроме mobile-меню и модалки успеха.
- Семантика: один `h1`; секции — `<section aria-labelledby>`; калькулятор — `fieldset/legend` + `aria-live="polite"` на итоге; форма — `<label>` к каждому полю, ошибки `aria-describedby` + `role="alert"`; телефон — `type="tel" autocomplete="tel"`.
- Не-текст: все иконки `aria-hidden="true"`, декоративная трасса `aria-hidden`; фото информативные — с `alt`, декоративные — `alt=""`. Звёзды рейтинга — `role="img" aria-label="Оценка 5 из 5"`, не эмодзи.
- Движение/зрение: `prefers-reduced-motion` (см. §3); авто-карусели с паузой по hover/focus и кнопками; минимальный размер текста 13px; дальтонизм — статусы дублируются текстом, не только цветом.
- Клавиатура: табы/аккордеон/карусель — стрелками + Enter/Space; `Esc` закрывает меню/модалку.

---

## 6. Структура лендинга (порядок = путь клиента: hook → доверие → услуги → цены → доказательства → конверсия)

1. **Hero (hook).** Eyebrow mono «СТО полного цикла · Москва»; H1 Display «Чиним так, чтобы вы забыли дорогу в сервис»; лид «ТО за 90 минут, диагностика 0 ₽ при ремонте, гарантия 1 год»; 2 CTA (primary «Записаться на диагностику» + ghost «Рассчитать ТО»); трасса-пульс под CTA; справа — фото цеха + glass-чип «Свободно 3 поста сегодня». Статы Display: `12 лет · 8 400 авто · 4.9 на картах`.
2. **Полоса доверия.** Логотипы марок текстом (mono, без чужих лого): BMW · Toyota · Kia · VAG · Lada + бейджи «Гарантия 1 год», «Оплата после приёмки», «Фото-отчёт в мессенджер».
3. **Преимущества (почему мы).** 4 glass-карточки с SVG: «90 минут ТО», «Диагностика 0 ₽», «Запчасти в наличии», «Честная смета до старта». Каждой — 1 строка доказательства («пост + склад в одном здании»).
4. **Услуги.** 7 карточек + 1 «Не нашли? Спросите»: ТО / Диагностика / Двигатель / Тормозная система / Электрика / Шиномонтаж / Детейлинг. Формат: SVG-иконка + H3 + «от N ₽» mono + срок. Клик — якорь к калькулятору с предвыбранной услугой.
5. **Калькулятор ТО (цены).** Слева — опции (услуга, класс авто, допы: масло/колодки/фильтры — чипы-пилюли); справа sticky-итог: Display-цена + срок + кнопка «Зафиксировать цену» → скролл к форме с подставленной суммой. Подпись: «Смета фиксируется до начала работ». `aria-live` на итоге.
6. **Процесс (трасса из 5 шагов).** Горизонтальная SVG-трасса: Заявка → Диагностика (30 мин, бесплатно при ремонте) → Смета → Ремонт + фото-отчёт → Приёмка и гарантия. Каждый шаг — точка на трассе + время mono.
7. **Кейсы.** 3 фото-кейса: «BMW X5 — капитальный ремонт N55 за 4 дня», «Camry — тормоза в круг за 3 часа», «Polo — электрика: плавающая ошибка за 1 день». Метрики mono. (Фото-заглушки: мотор/диск/диагностика.)
8. **Отзывы.** Рейтинг-шапка «4.9 · 620 отзывов» + 3–6 review-cards со звёздами SVG. Ссылка «Читать все на картах» (tertiary).
9. **Запись (конверсия).** Двухколоночный: слева — оффер «Диагностика 0 ₽ при ремонте до [дата]» + телефон + режим (Пн–Сб 9–21); справа — glass-форма (имя/телефон/авто/услуга/слот) + primary «Записаться» + согласие. Успех — модалка «Заявка принята, перезвоним за 15 минут».
10. **Контакты + карта.** Адрес, схема проезда, парковка, заглушка карты (тёмный блок 16/9 с пином SVG + кнопка «Построить маршрут»). Реквизиты mono в футере.
11. **FAQ (снятие возражений, перед футером).** Аккордеон 5: цена/гарантия/свои запчасти/время/оплата.

Копирайт-тон: активный залог, со стороны водителя («Забираете авто в 18:00»), без канцелярита. CTA-глаголы: «Записаться», «Рассчитать», «Зафиксировать цену».

---

## 7. Фото / SVG-иконки (без эмодзи)

- Фото: hero — ночной цех/подъёмник; услуги — 7 детальных кадров (масло/сканер/мотор/диск/проводка/шина/полировка); кейсы — до/после. Все с оверлеем §1.1. Источники — только лицензионные стоки, лица/номера — заблюрены.
- Иконки: inline-SVG, stroke 1.8, круглые концы, 24px сетка: гаечный ключ, сканер/пульс, поршень, диск, молния, колесо, капля (детейлинг), щит, часы, чек. Эмодзи-иконки запрещены (линтовать на ревью).

## 8. Что дальше (не в этом файле)

`globals.css` (переменные §1.5 + `prefers-reduced-motion`) → `layout.tsx` (шрифты next/font) → primitives (`Button/Card/Input/Badge`) → секции по §6. Проверка приёмки: `DESIGN.md` существует; Lighthouse/contrast/a11y — в `frontend-perfection` на этапе реализации; `/visual-qa` — 375/768/1280 со скриншотами.

---

## 9. Аудит v2 (2026-09-29, премиум-уровень Tesla/Porsche — статус: НЕ СООТВЕТСТВУЕТ, 7 дефектов)

> Сверено: `DESIGN.md` v1 (§1–§8) против `app/layout.tsx`, `app/globals.css`, `app/page.module.css`, `app/page.tsx`, `components/components.css`, `components/Header.module.css`, `components/Footer.module.css`, `public/sto-hero.svg`, `next.config.mjs`. Код компонентов НЕ правился — только контракт.

### Топ-7 дефектов (с путями)

1. **Шрифты не подключены (критично).** `app/layout.tsx:1-38` — нет `next/font/google`; `app/globals.css:14` — `--font-sans: system-ui…` вместо канона §1.5 (`--font-display:"Unbounded"`, `--font-head:"Manrope"`, `--font-body:"Inter"`, `--font-mono:"JetBrains Mono"`). Итог: весь сайт на системном шрифте, Display-характер нулевой, кириллица Unbounded/Manrope не проверена.
2. **SVG-заглушка вместо фото (критично).** `public/sto-hero.svg:1-13` — примитив из `rect`/`circle` (серый бокс + лайм-прямоугольник + два «колеса»); `app/page.tsx:141-149` — `<img src="./sto-hero.svg">` вместо `next/image` + `priority` + `sizes`. Нет фото цеха, нет оверлея `linear-gradient(180deg, rgba(10,12,16,.1), rgba(10,12,16,.82))` (§1.1), текст-на-фото невозможен.
3. **Нет signature «Pulse Trace».** Поиск по `page.module.css` + `page.tsx` — ноль совпадений `trace/pulse`. Нет 1–2px полосы с `blur`-свечением под H1, нет разделителей с бегущим пульсом (`translateX(-10%→110%), 3.2s linear infinite`), нет SVG-трассы процесса из 5 точек (§0, §3, §6-п.6). Сайт выглядит статично/плоско.
4. **Нет glass по контракту.** `app/globals.css:1-24` — нет `--glass`, `--line`, `--pulse-dim`, `--volt`; `components/Header.module.css:5-6` — `rgba(10,12,16,.86)+blur(12px)` вместо `.glass { blur(16px) saturate(1.2) }` (§1.4); форма/калькулятор — сплошной `--bg-card`, не стекло поверх фото.
5. **Двойная палитра, дрейф акцента.** Канон: `--pulse:#C9F31D`, `--volt:#4D7CFE`. Факт: `app/globals.css:7 --accent:#c6f135` (≈, но не канон); `components/components.css:9 --ap-accent:#ffb020` — оранжевый конкурирует с лаймом (запрещено §1.1); `--volt` отсутствует везде — статусу «Свободно» нечем светиться. Две системы токенов (`--bg*` + `--ap-*`) вместо одной (§1.5).
6. **Слабые отступы + body-статы.** `app/globals.css:15-23` — шкала обрезана на `--space-16:64` (нет `--s24:96/--s32:128`); `app/page.module.css:136-138` — секции `padding: var(--space-16)` вместо `s24/s16` (§1.3); `.title` 54px max вместо `display-xl 64/40`; `.statValue` — body 24px `--accent`, не `Display` (§6-п.1: `12 лет · 8 400 авто · 4.9`); нет `mono-eyebrow 01 — Услуги` перед H2 (§1.2).
7. **Hero не 7/5 + обрезанный лендинг.** `app/page.module.css:240-243` — hero `1.05fr/0.95fr` (≈50/50) вместо `7/5`; нет glass-чипа «Свободно 3 поста сегодня» поверх фото (§4-desktop, §6-п.1); отсутствуют §6-п.2 (полоса доверия), п.6 (процесс-трасса), п.7 (кейсы), п.10 (карта), п.11 (FAQ-аккордеон 5). Порядок hero→услуги→преимущества нарушает путь hook→доверие→услуги.

### Готовые токены для бригады-2 (замена в `app/globals.css :root`, §1.5 — канон)

```css
:root {
  --void:#0A0C10; --carbon:#141922; --bone:#F2F4F7; --steel:#98A2B3;
  --pulse:#C9F31D; --volt:#4D7CFE; --pulse-ink:#111400;
  --line:color-mix(in srgb, var(--bone) 12%, transparent);
  --glass:color-mix(in srgb, var(--carbon) 72%, transparent);
  --pulse-dim:color-mix(in srgb, var(--pulse) 14%, transparent);
  --font-display:"Unbounded","Manrope",system-ui,sans-serif;
  --font-head:"Manrope",system-ui,sans-serif;
  --font-body:"Inter",system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
  --s24:96px; --s32:128px;
  --ease-out:cubic-bezier(.22,1,.36,1); --d-fast:150ms; --d-med:300ms; --d-slow:600ms;
}
```

### CSS-рецепты (копипаст, только transform/opacity)

```css
/* Шрифты — app/layout.tsx (кириллица обязательна) */
import { Unbounded, Manrope, Inter, JetBrains_Mono } from "next/font/google";
const display = Unbounded({ weight: ["600","700"], subsets: ["cyrillic","latin"], display: "swap", variable: "--font-display" });
const head = Manrope({ weight: ["500","700","800"], subsets: ["cyrillic","latin"], display: "swap", variable: "--font-head" });
const body = Inter({ weight: ["400","500","600"], subsets: ["cyrillic","latin"], display: "swap", variable: "--font-body" });
const mono = JetBrains_Mono({ weight: ["400","500"], subsets: ["cyrillic","latin"], display: "swap", variable: "--font-mono" });

/* Стекло — шапка при скролле, калькулятор, форма поверх фото */
.glass { background: var(--glass); backdrop-filter: blur(16px) saturate(1.2); border: 1px solid var(--line); border-radius: 20px; }

/* Pulse Trace — полоса под H1 + разделитель секций */
.pulse-trace { position: relative; height: 2px; background: linear-gradient(90deg, transparent, var(--pulse), transparent); overflow: hidden; }
.pulse-trace::after { content:""; position:absolute; top:0; left:0; width:120px; height:100%;
  background: linear-gradient(90deg, transparent, var(--pulse), transparent);
  filter: blur(4px); animation: trace-run 3.2s linear infinite; }
@keyframes trace-run { from { transform: translateX(-10%); opacity:0; } 15% { opacity:1; } 85% { opacity:1; } to { transform: translateX(110vw); opacity:0; } }

/* Hero 7/5 + Display + статы */
@media (min-width:1280px){ .heroInner { grid-template-columns: 7fr 5fr; } }
.title { font-family: var(--font-display); font-size: clamp(40px, 4.5vw, 64px); line-height:1.02; letter-spacing:-0.02em; }
.statValue { font-family: var(--font-display); font-weight:700; color: var(--bone); }
.glass-chip { font-family: var(--font-mono); font-size:12px; text-transform:uppercase; letter-spacing:.12em;
  background: color-mix(in srgb, var(--volt) 18%, var(--glass)); border:1px solid var(--line); border-radius:999px; padding:8px 14px; }
.photo-overlay::after { content:""; position:absolute; inset:0;
  background: linear-gradient(180deg, rgba(10,12,16,.1), rgba(10,12,16,.82)); border-radius: inherit; }
```

### Фото-стратегия без нарушения лицензий

- Hero и кейсы — реальные фото цеха/деталей, `next/image`, `sizes="(max-width:768px) 100vw, 50vw"`, hero `priority`, остальное `lazy`, `alt` на русском («Механик проверяет тормозной диск BMW»).
- Источник: прямые файлы Unsplash CDN (`images.unsplash.com/photo-<id>?w=1600&q=80&auto=format&fit=crop`) с указанием автора/ссылки в `README.md` или подписью mono 12px; локальный fallback — копия в `public/` (напр. `public/sto-ceh.jpg`) на случай недоступности CDN; `sto-hero.svg` удалить после замены.
- Затемнение ≥60% снизу (§1.1-оверлей), текст поверх — только `--bone`; лица/номера — блюр до публикации; чужие логотипы марок — только текстом mono, без картинок.
- Запрет: кислотная заливка лаймом крупных фонов; синий `--volt` — только статусы/свечение, не CTA.

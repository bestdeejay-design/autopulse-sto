import styles from "./page.module.css";
import HeroScene from "../components/HeroScene";
import Starlight from "../components/Starlight";
import FaqSection from "../components/FaqSection";
import { BookingForm, Calculator, Contacts, Reviews } from "../components";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoxIcon,
  CameraIcon,
  CheckIcon,
  CogIcon,
  DiscBrakeIcon,
  EngineIcon,
  LightningIcon,
  MaybachStarIcon,
  PulseIcon,
  ShieldIcon,
  SparkleIcon,
  WheelIcon,
  WrenchIcon,
} from "../components/Icons";

type Service = {
  title: string;
  description: string;
  price: string;
  icon: React.JSX.Element;
  accent?: boolean;
};

const services: Service[] = [
  {
    title: "Компьютерная диагностика",
    description: "Полная проверка 60+ параметров, отчёт и план ремонта за 45 минут.",
    price: "от 1 500 ₽",
    icon: <PulseIcon size={24} />,
  },
  {
    title: "Техобслуживание (ТО)",
    description: "Масло, фильтры, проверка подвески и тормозов по регламенту.",
    price: "от 4 900 ₽",
    icon: <CogIcon size={24} />,
    accent: true,
  },
  {
    title: "Ремонт двигателя",
    description: "ГРМ, ГБЦ, капитальный ремонт с гарантией 24 месяца.",
    price: "от 8 000 ₽",
    icon: <EngineIcon size={24} />,
  },
  {
    title: "Тормозная система",
    description: "Колодки, диски, суппорты, прокачка. Проверка на стенде.",
    price: "от 2 500 ₽",
    icon: <DiscBrakeIcon size={24} />,
  },
  {
    title: "Подвеска и рулевое",
    description: "Амортизаторы, рычаги, ШРУС, развал-схождение 3D.",
    price: "от 1 900 ₽",
    icon: <WheelIcon size={24} />,
  },
  {
    title: "Электрика и АКБ",
    description: "Стартер, генератор, проводка, установка сигнализаций.",
    price: "от 1 200 ₽",
    icon: <LightningIcon size={24} />,
  },
  {
    title: "Кондиционер и климат",
    description: "Заправка, антибактериальная обработка, ремонт компрессора.",
    price: "от 2 900 ₽",
    icon: <SparkleIcon size={24} />,
  },
  {
    title: "Шиномонтаж и хранение",
    description: "Балансировка, сезонная замена, хранение комплекта.",
    price: "от 3 500 ₽",
    icon: <BoxIcon size={24} />,
  },
];

const advantages = [
  {
    title: "Фиксированная смета",
    description: "Цена в заказ-наряде до старта работ. Никаких сюрпризов в чеке.",
    icon: <ShieldIcon size={26} />,
  },
  {
    title: "Гарантия 24 месяца",
    description: "На работы и запчасти. Все условия — письменно в договоре.",
    icon: <CheckIcon size={26} />,
  },
  {
    title: "Фото и видеоотчёт",
    description: "Состояние узлов в мессенджер до согласования каждого этапа.",
    icon: <CameraIcon size={26} />,
  },
  {
    title: "Склад запчастей",
    description: "Оригинал и проверенные аналоги в наличии. Без ожидания неделями.",
    icon: <BoxIcon size={26} />,
  },
];

const stats = [
  { value: "12 лет", label: "опыта на рынке Москвы" },
  { value: "9 400+", label: "обслуженных автомобилей" },
  { value: "4,9", label: "средняя оценка на картах" },
  { value: "24 мес.", label: "гарантия на работы" },
];

const process = [
  {
    step: "01",
    title: "Заявка",
    desc: "Звонок или онлайн-форма. Ответим за 10 минут в рабочее время.",
    time: "10 мин",
  },
  {
    step: "02",
    title: "Диагностика",
    desc: "60+ параметров на стенде. Бесплатно при заказе ремонта.",
    time: "45 мин",
  },
  {
    step: "03",
    title: "Смета",
    desc: "Точная цена, фиксируем письменно. Согласование каждого пункта.",
    time: "15 мин",
  },
  {
    step: "04",
    title: "Ремонт",
    desc: "Фотоотчёт в мессенджер. Оригинальные запчасти со склада.",
    time: "1–4 дня",
  },
  {
    step: "05",
    title: "Приёмка",
    desc: "Проверка вместе с вами. Гарантийный талон и чек на руки.",
    time: "20 мин",
  },
];

const cases = [
  {
    brand: "Mercedes-Maybach S 580",
    title: "Капитальный ремонт V8 BiTurbo",
    result: "Восстановление компрессии, замена ГРМ и маслонасоса",
    metrics: ["4 дня", "−72% расход масла"],
    badge: "Maybach",
  },
  {
    brand: "Porsche Cayenne Turbo",
    title: "Полная диагностика + тормоза",
    result: "Замена дисков и колодок Brembo, адаптация ESP",
    metrics: ["1 день", "−3 м тормозной путь"],
    badge: "Porsche",
  },
  {
    brand: "BMW X5 (G05)",
    title: "Плавающая ошибка АКПП",
    result: "Адаптация ZF 8HP, замена соленоидов, обновление ПО",
    metrics: ["2 дня", "стабильная работа"],
    badge: "BMW",
  },
];

const brands = [
  "Mercedes-Benz",
  "Porsche",
  "BMW",
  "Audi",
  "Lexus",
  "Volkswagen",
  "Toyota",
  "Maybach",
];

const faqs = [
  {
    q: "Сколько стоит диагностика?",
    a: "Компьютерная диагностика стоит 1 500 ₽. При заказе ремонта от 5 000 ₽ — бесплатно. Диагностика ходовой на подъёмнике — 900 ₽.",
  },
  {
    q: "Какая гарантия на работы?",
    a: "24 месяца на работы и установленные запчасти. Гарантия фиксируется в заказ-наряде. Оригинал хранится у нас 3 года.",
  },
  {
    q: "Можно ли привезти свои запчасти?",
    a: "Да, можем установить ваши запчасти. Однако гарантия 24 месяца распространяется только на работы, а не на сами детали.",
  },
  {
    q: "Сколько занимает ТО?",
    a: "ТО Стандарт (масло, фильтры, диагностика) занимает 90 минут. Для ТО Макси — около 2,5 часов. Можно подождать в нашем лаундже.",
  },
  {
    q: "Какие способы оплаты?",
    a: "Наличные, банковские карты, переводы для юрлиц с НДС. Также доступна оплата по QR-коду через СБП.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* =========================================================
          HERO — звёздное небо + сцена Maybach в цеху + статы
         ========================================================= */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.starlightWrap} aria-hidden="true">
          <Starlight count={140} goldChance={0.15} bigChance={0.08} shooting />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Премиальное СТО · Москва, Автомоторная 7с2
            </p>
            <h1 id="hero-title" className={styles.title}>
              <span className={styles.titleLine}>Сервис уровня</span>
              <span className={styles.titleAccent}>Maybach.</span>
              <span className={styles.titleLine}>Для&nbsp;всех.</span>
            </h1>
            <p className={styles.subtitle}>
              Диагностика, ТО и&nbsp;сложный ремонт с&nbsp;индивидуальным подходом.
              Фиксированная смета, фотоотчёт в&nbsp;мессенджер, гарантия 24&nbsp;месяца.
            </p>

            <div className={styles.ctaRow}>
              <a href="#booking" className={`${styles.ctaPrimary} chrome-trim`}>
                <span>Записаться на сервис</span>
                <ArrowRightIcon size={18} />
              </a>
              <a href="#calculator" className={styles.ctaGhost}>
                Рассчитать стоимость ТО
              </a>
            </div>

            <div className={`pulse-trace ${styles.trace}`} aria-hidden="true" />

            <dl className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <dt className={styles.statValue}>{s.value}</dt>
                  <dd className={styles.statLabel}>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.heroVisual}>
            <div className={`${styles.heroPhotoWrap} chrome-trim`}>
              <HeroScene className={styles.heroPhoto} />
              <div className={styles.heroOverlay} aria-hidden="true" />
              <span className={styles.heroChip}>
                <span className={styles.heroChipDot} aria-hidden="true" />
                Свободно 3 поста
              </span>
              <span className={styles.heroBadge}>
                <MaybachStarIcon size={14} />
                <span>Maybach · сервис</span>
              </span>
            </div>
            <div className={styles.heroFloatingCard} aria-hidden="true">
              <span className={styles.heroFloatingDot} />
              <div>
                <p className={styles.heroFloatingLabel}>Сейчас в работе</p>
                <p className={styles.heroFloatingValue}>BMW X5 · G05</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ПОЛОСА ДОВЕРИЯ — марки автомобилей + бейджи
         ========================================================= */}
      <section className={styles.trustBar} aria-label="Обслуживаемые марки">
        <div className={`container ${styles.trustInner}`}>
          <span className={styles.trustLabel}>Работаем с&nbsp;премиальными марками</span>
          <ul className={styles.brands}>
            {brands.map((b) => (
              <li key={b} className={styles.brandItem}>{b}</li>
            ))}
          </ul>
          <ul className={styles.badges}>
            <li className={styles.badge}>
              <CheckIcon size={14} /> Гарантия 24&nbsp;мес.
            </li>
            <li className={styles.badge}>
              <CheckIcon size={14} /> Оплата после приёмки
            </li>
            <li className={styles.badge}>
              <CheckIcon size={14} /> Фотоотчёт в&nbsp;мессенджер
            </li>
          </ul>
        </div>
      </section>

      {/* =========================================================
          ПРЕИМУЩЕСТВА — 4 стеклянные карточки
         ========================================================= */}
      <section className={styles.section} aria-labelledby="why-title">
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>01</span> Преимущества
          </p>
          <h2 id="why-title" className={styles.h2}>
            Обслуживание без компромиссов —
            <br />
            <span className={styles.h2Accent}>как для Maybach</span>
          </h2>
          <p className={styles.lead}>
            Каждый этап&nbsp;— от&nbsp;приёмки до&nbsp;выдачи&nbsp;— построен вокруг вашего спокойствия.
          </p>
          <ul className={styles.advGrid}>
            {advantages.map((a) => (
              <li key={a.title} className={`${styles.advCard} ambient-glow`}>
                <span className={styles.advIcon} aria-hidden="true">{a.icon}</span>
                <h3 className={styles.advTitle}>{a.title}</h3>
                <p className={styles.advText}>{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================
          УСЛУГИ — карточки с золотым акцентом
         ========================================================= */}
      <section id="services" className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="services-title">
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>02</span> Услуги и&nbsp;цены
          </p>
          <h2 id="services-title" className={styles.h2}>
            Полный цикл работ —
            <br />
            <span className={styles.h2Accent}>от диагностики до капиталки</span>
          </h2>
          <p className={styles.lead}>
            Фиксированные цены на&nbsp;сайте. Точную смету называем после бесплатного осмотра.
          </p>
          <ul className={styles.grid}>
            {services.map((s) => (
              <li
                key={s.title}
                className={`${styles.card} ${s.accent ? styles.cardAccent : ""}`}
              >
                {s.accent && (
                  <span className={styles.cardBadge}>
                    <MaybachStarIcon size={12} /> Популярно
                  </span>
                )}
                <span className={styles.cardIcon} aria-hidden="true">{s.icon}</span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardText}>{s.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>{s.price}</span>
                  <a href="#calculator" className={styles.cardLink}>
                    <span>Подробнее</span>
                    <ArrowUpRightIcon size={14} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================
          КАЛЬКУЛЯТОР
         ========================================================= */}
      <section className={styles.section} aria-labelledby="calculator-heading">
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>03</span> Калькулятор
          </p>
          <h2 id="calculator-heading" className={styles.h2}>
            Узнайте стоимость ТО
            <br />
            <span className={styles.h2Accent}>за 30&nbsp;секунд</span>
          </h2>
          <p className={styles.lead}>
            Выберите класс автомобиля и&nbsp;услуги&nbsp;— цена и&nbsp;время появятся сразу.
            Смета фиксируется до&nbsp;начала работ.
          </p>
          <Calculator id="calculator" />
        </div>
      </section>

      {/* =========================================================
          ПРОЦЕСС — 5 шагов с хромированной трассой
         ========================================================= */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="process-title">
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>04</span> Процесс
          </p>
          <h2 id="process-title" className={styles.h2}>
            От заявки до выдачи —
            <br />
            <span className={styles.h2Accent}>прозрачно на каждом шаге</span>
          </h2>

          <ol className={styles.process}>
            {process.map((p, i) => (
              <li key={p.step} className={styles.processStep}>
                <span className={styles.processStepNum}>{p.step}</span>
                <h3 className={styles.processStepTitle}>{p.title}</h3>
                <p className={styles.processStepDesc}>{p.desc}</p>
                <span className={styles.processStepTime}>{p.time}</span>
                {i < process.length - 1 && (
                  <span className={styles.processArrow} aria-hidden="true">
                    <ArrowRightIcon size={20} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================================================
          КЕЙСЫ — фото-карточки с метриками
         ========================================================= */}
      <section id="cases" className={styles.section} aria-labelledby="cases-title">
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>05</span> Кейсы
          </p>
          <h2 id="cases-title" className={styles.h2}>
            Работы из нашего цеха —
            <br />
            <span className={styles.h2Accent}>на&nbsp;Maybach, Porsche, BMW</span>
          </h2>
          <p className={styles.lead}>
            Три примера из&nbsp;недавних работ. Каждый кейс&nbsp;— с&nbsp;фотоотчётом, сроками и&nbsp;результатом.
          </p>
          <ul className={styles.casesGrid}>
            {cases.map((c) => (
              <li key={c.brand} className={`${styles.caseCard} chrome-trim`}>
                <div className={styles.caseBadge}>
                  <MaybachStarIcon size={11} /> {c.badge}
                </div>
                <div className={styles.caseImage} aria-hidden="true">
                  <span className={styles.caseImageText}>{c.brand.split(" ")[0]}</span>
                </div>
                <div className={styles.caseBody}>
                  <p className={styles.caseBrand}>{c.brand}</p>
                  <h3 className={styles.caseTitle}>{c.title}</h3>
                  <p className={styles.caseResult}>{c.result}</p>
                  <div className={styles.caseMetrics}>
                    {c.metrics.map((m) => (
                      <span key={m} className={styles.caseMetric}>{m}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================
          ОТЗЫВЫ
         ========================================================= */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="reviews-heading">
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>06</span> Отзывы
          </p>
          <h2 id="reviews-heading" className={styles.h2}>
            4,9 на&nbsp;картах —
            <br />
            <span className={styles.h2Accent}>620+ отзывов клиентов</span>
          </h2>
          <Reviews id="reviews" variant="slider" />
        </div>
      </section>

      {/* =========================================================
          FAQ
         ========================================================= */}
      <FaqSection faqs={faqs} />

      {/* =========================================================
          ЗАПИСЬ
         ========================================================= */}
      <section
        id="booking"
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="booking-heading"
      >
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>07</span> Онлайн-запись
          </p>
          <h2 id="booking-heading" className={styles.h2}>
            Запишитесь прямо сейчас —
            <br />
            <span className={styles.h2Accent}>перезвоним за&nbsp;15&nbsp;минут</span>
          </h2>
          <BookingForm id="booking-form" />
        </div>
      </section>

      {/* =========================================================
          КОНТАКТЫ
         ========================================================= */}
      <section className={styles.section} aria-labelledby="contacts-heading">
        <div className="container">
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>08</span> Контакты
          </p>
          <h2 id="contacts-heading" className={styles.h2}>
            Приезжайте в&nbsp;гости —
            <br />
            <span className={styles.h2Accent}>мы рядом с&nbsp;метро Войковская</span>
          </h2>
          <Contacts id="contacts" />
        </div>
      </section>
    </>
  );
}


import styles from "./page.module.css";
import { BookingForm, Calculator, Contacts, Reviews } from "../components";

type Service = {
  title: string;
  description: string;
  price: string;
  icon: JSX.Element;
};

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const services: Service[] = [
  {
    title: "Компьютерная диагностика",
    description: "Полная проверка 60+ параметров, отчёт и план ремонта за 45 минут.",
    price: "от 1 500 ₽",
    icon: <Icon d="M3 12h4l2-6 4 12 2-6h6" />
  },
  {
    title: "Техобслуживание (ТО)",
    description: "Масло, фильтры, проверка подвески и тормозов по регламенту.",
    price: "от 4 900 ₽",
    icon: <Icon d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  },
  {
    title: "Ремонт двигателя",
    description: "ГРМ, ГБЦ, капитальный ремонт с гарантией 12 месяцев.",
    price: "от 8 000 ₽",
    icon: <Icon d="M7 8h10v8H7zM4 10h3M17 10h3M12 8V4M9 20v-4M15 20v-4" />
  },
  {
    title: "Тормозная система",
    description: "Колодки, диски, суппорты и прокачка. Проверка на стенде.",
    price: "от 2 500 ₽",
    icon: <Icon d="M12 3a9 9 0 1 0 9 9M12 7v5l3 3M19 3l-2 2" />
  },
  {
    title: "Подвеска и рулевое",
    description: "Амортизаторы, рычаги, ШРУС, развал-схождение 3D.",
    price: "от 1 900 ₽",
    icon: <Icon d="M4 16l4-9 4 9 4-9 4 9M3 20h18" />
  },
  {
    title: "Электрика и АКБ",
    description: "Стартер, генератор, проводка, установка сигнализаций.",
    price: "от 1 200 ₽",
    icon: <Icon d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  },
  {
    title: "Кондиционер и климат",
    description: "Заправка, антибактериальная обработка, ремонт компрессора.",
    price: "от 2 900 ₽",
    icon: <Icon d="M12 2v20M4 6l16 12M20 6L4 18M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  },
  {
    title: "Шиномонтаж и хранение",
    description: "Балансировка, сезонная замена, хранение комплекта.",
    price: "от 3 500 ₽",
    icon: <Icon d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
  }
];

const advantages = [
  {
    title: "Честная смета до старта",
    description: "Фиксируем цену в заказ-наряде. Никаких «внезапных» работ без звонка.",
    d: "M20 6L9 17l-5-5"
  },
  {
    title: "Гарантия 12 месяцев",
    description: "На работы и запчасти. Все условия — письменно в договоре.",
    d: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"
  },
  {
    title: "Фото и видеоотчёт",
    description: "Присылаем состояние узлов в мессенджер до согласования ремонта.",
    d: "M4 7h3l2-2h6l2 2h3v12H4zM12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
  },
  {
    title: "Запчасти в наличии",
    description: "Оригинал и проверенные аналоги на складе. Не ждёте неделю.",
    d: "M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"
  }
];

const stats = [
  { value: "12 лет", label: "на рынке Москвы" },
  { value: "9 400+", label: "обслуженных авто" },
  { value: "4,9", label: "средняя оценка" },
  { value: "60 мин", label: "средний срок ТО" }
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>СТО полного цикла · Москва, ул. Примерная, 12</p>
            <h1 id="hero-title" className={styles.title}>
              Ремонтируем авто так, как хотели бы для своих
            </h1>
            <p className={styles.subtitle}>
              «АвтоПульс» — диагностика, ТО и сложный ремонт. Смета до начала работ,
              гарантия 12 месяцев, онлайн-запись за минуту.
            </p>
            <div className={styles.ctaRow}>
              <a href="#booking" className={styles.ctaPrimary}>
                Записаться на сервис
              </a>
              <a href="#services" className={styles.ctaGhost}>
                Смотреть услуги и цены
              </a>
            </div>
            <dl className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <dt className={styles.statValue}>{s.value}</dt>
                  <dd className={styles.statLabel}>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.heroVisual} aria-hidden="false">
            <img
              src="/sto-hero.svg"
              alt="Механик «АвтоПульс» проводит диагностику автомобиля на подъёмнике"
              width={520}
              height={420}
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section id="services" className={styles.section} aria-labelledby="services-title">
        <div className="container">
          <p className={styles.eyebrow}>Услуги и цены</p>
          <h2 id="services-title" className={styles.h2}>
            8 направлений — от диагностики до капиталки
          </h2>
          <p className={styles.lead}>
            Цены-заглушки для старта. Точную смету называем после бесплатного осмотра.
          </p>
          <ul className={styles.grid}>
            {services.map((s) => (
              <li key={s.title} className={styles.card}>
                <span className={styles.cardIcon}>{s.icon}</span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardText}>{s.description}</p>
                <p className={styles.cardPrice}>{s.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="why-title">
        <div className="container">
          <p className={styles.eyebrow}>Почему «АвтоПульс»</p>
          <h2 id="why-title" className={styles.h2}>
            Преимущества, которые чувствуются в чеке
          </h2>
          <ul className={styles.advGrid}>
            {advantages.map((a) => (
              <li key={a.title} className={styles.advCard}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon d={a.d} />
                </span>
                <h3 className={styles.cardTitle}>{a.title}</h3>
                <p className={styles.cardText}>{a.description}</p>
              </li>
            ))}
          </ul>
          <div id="booking-cta" className={styles.booking}>
            <div>
              <h3 className={styles.bookingTitle}>Запись на сервис</h3>
              <p className={styles.bookingText}>
                Оставьте заявку — перезвоним за 10 минут, подтвердим время и смету.
                Ежедневно 8:00–21:00, +7 (495) 120-45-67.
              </p>
            </div>
            <a href="tel:+74951204567" className={styles.ctaPrimary}>
              Позвонить: +7 (495) 120-45-67
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="calculator-heading">
        <div className="container">
          <span id="calculator-heading" className={styles.eyebrow}>
            Калькулятор
          </span>
          <Calculator id="calculator" />
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="booking-heading"
      >
        <div className="container">
          <span id="booking-heading" className={styles.eyebrow}>
            Онлайн-запись
          </span>
          <BookingForm id="booking" />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="reviews-heading">
        <div className="container">
          <span id="reviews-heading" className={styles.eyebrow}>
            Отзывы
          </span>
          <Reviews id="reviews" variant="slider" />
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="contacts-heading"
      >
        <div className="container">
          <span id="contacts-heading" className={styles.eyebrow}>
            Контакты
          </span>
          <Contacts id="contacts" />
        </div>
      </section>
    </>
  );
}

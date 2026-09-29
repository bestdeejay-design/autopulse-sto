import styles from "./Footer.module.css";
import Starlight from "./Starlight";
import { MaybachStarIcon, PhoneIcon, PinIcon, ClockIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.starlightWrap} aria-hidden="true">
        <Starlight count={80} goldChance={0.15} bigChance={0.06} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <a href="#main" className={styles.brand} aria-label="АвтоПульс — на главную">
            <span className={styles.logoMark} aria-hidden="true">
              <MaybachStarIcon size={24} />
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>АвтоПульс</span>
              <span className={styles.brandTag}>Maybach · сервис</span>
            </span>
          </a>
          <p className={styles.tagline}>
            Премиальная станция технического обслуживания в&nbsp;Москве.
            Обслуживание уровня Mercedes-Maybach с&nbsp;гарантией 24&nbsp;месяца.
          </p>
          <div className={styles.social}>
            <a href="https://wa.me/74951204567" className={styles.socialBtn} aria-label="WhatsApp">
              WA
            </a>
            <a href="https://t.me/avtopuls_msk" className={styles.socialBtn} aria-label="Telegram">
              TG
            </a>
            <a href="https://instagram.com/avtopuls" className={styles.socialBtn} aria-label="Instagram">
              IG
            </a>
          </div>
        </div>

        <nav className={styles.navCol} aria-label="Разделы">
          <p className={styles.colTitle}>Сервис</p>
          <a href="#services">Услуги и цены</a>
          <a href="#calculator">Калькулятор ТО</a>
          <a href="#cases">Кейсы</a>
          <a href="#reviews">Отзывы</a>
        </nav>

        <nav className={styles.navCol} aria-label="Контакты">
          <p className={styles.colTitle}>Контакты</p>
          <a href="tel:+74951204567" className={styles.contactLine}>
            <PhoneIcon size={16} />
            +7 (495) 120-45-67
          </a>
          <span className={styles.contactLine}>
            <PinIcon size={16} />
            Москва, Автомоторная 7с2
          </span>
          <span className={styles.contactLine}>
            <ClockIcon size={16} />
            Пн–Пт 8:00–21:00 · Сб–Вс 9:00–19:00
          </span>
        </nav>
      </div>

      <div className={`container ${styles.legal}`}>
        <p>© 2026 «АвтоПульс». Цены на сайте ориентировочные и указаны в рублях.</p>
        <a href="#privacy" className={styles.legalLink}>
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
}

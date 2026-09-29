import styles from "./Header.module.css";
import { PhoneIcon, MaybachStarIcon } from "./Icons";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#main" className={styles.brand} aria-label="АвтоПульс — на главную">
          <span className={styles.logoMark} aria-hidden="true">
            <MaybachStarIcon size={20} />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>АвтоПульс</span>
            <span className={styles.brandTag}>Maybach · сервис</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Основная навигация">
          <a href="#services">Услуги</a>
          <a href="#cases">Кейсы</a>
          <a href="#calculator">Калькулятор</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <div className={styles.contact}>
          <a href="tel:+74951204567" className={styles.phone}>
            <PhoneIcon size={16} />
            <span className={styles.phoneText}>
              <span className={styles.phoneLabel}>Ежедневно 8–21</span>
              <span className={styles.phoneNumber}>+7 (495) 120-45-67</span>
            </span>
          </a>
          <a href="#booking" className={`${styles.cta} chrome-trim`}>
            Записаться
          </a>
        </div>
      </div>
      <div className={styles.chromeBar} aria-hidden="true" />
    </header>
  );
}

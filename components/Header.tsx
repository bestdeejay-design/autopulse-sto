import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.brand} aria-label="АвтоПульс — на главную">
          <span className={styles.logo} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
            </svg>
          </span>
          <span className={styles.brandText}>
            АвтоПульс
            <small>СТО полного цикла</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Основная навигация">
          <a href="#services">Услуги</a>
          <a href="#booking">Запись</a>
          <a href="tel:+74951204567">+7 (495) 120-45-67</a>
        </nav>
        <a href="#booking" className={styles.cta}>
          Записаться
        </a>
      </div>
    </header>
  );
}

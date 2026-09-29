import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.brand}>АвтоПульс</p>
          <p className={styles.muted}>
            СТО полного цикла · Москва, ул. Примерная, 12<br />
            Ежедневно 8:00–21:00
          </p>
        </div>
        <nav className={styles.nav} aria-label="Навигация в подвале">
          <a href="#services">Услуги и цены</a>
          <a href="#booking">Запись</a>
          <a href="tel:+74951204567">+7 (495) 120-45-67</a>
        </nav>
        <p className={styles.muted}>© 2026 «АвтоПульс». Цены на сайте — ориентировочные в рублях.</p>
      </div>
    </footer>
  );
}

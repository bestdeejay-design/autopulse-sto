"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";
import { ChevronRightIcon, MaybachStarIcon } from "./Icons";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number): void {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowNum}>07</span> Вопросы
        </p>
        <h2 id="faq-title" className={styles.h2}>
          Часто задают —
          <br />
          <span className={styles.h2Accent}>короткие ответы</span>
        </h2>

        <ul className={styles.list}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;
            return (
              <li
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  id={btnId}
                  type="button"
                  className={styles.btn}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className={styles.q}>
                    <span className={styles.qMark} aria-hidden="true">
                      <MaybachStarIcon size={11} />
                    </span>
                    {item.q}
                  </span>
                  <span className={styles.icon} aria-hidden="true">
                    <ChevronRightIcon size={18} />
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className={styles.panel}
                >
                  <p className={styles.a}>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { REVIEWS, type ReviewItem } from './pricing';

export interface ReviewsProps {
  id?: string;
  /** Режим отображения: слайдер (по одной) или сетка */
  variant?: 'slider' | 'grid';
  items?: ReviewItem[];
}

function Star({ filled }: { filled: boolean }): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

function ReviewCard({ item }: { item: ReviewItem }): React.JSX.Element {
  return (
    <article className="ap-review" aria-label={`Отзыв: ${item.name}, ${item.service}`}>
      <div className="ap-stars" role="img" aria-label={`Оценка ${item.rating} из 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} filled={n <= item.rating} />
        ))}
      </div>
      <p className="ap-review__text">«{item.text}»</p>
      <footer className="ap-review__meta">
        <strong>{item.name}</strong>
        <span className="ap-muted"> · {item.car} · {item.service}</span>
        <br />
        <small className="ap-muted">{item.date}</small>
      </footer>
    </article>
  );
}

export default function Reviews({
  id = 'reviews',
  variant = 'slider',
  items = REVIEWS,
}: ReviewsProps): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const current = items[Math.min(index, total - 1)];

  function prev(): void {
    setIndex((i) => (i - 1 + total) % total);
  }
  function next(): void {
    setIndex((i) => (i + 1) % total);
  }

  if (variant === 'grid') {
    return (
      <section id={id} className="ap-block" aria-labelledby={`${id}-title`}>
        <h2 id={`${id}-title`}>Отзывы и кейсы</h2>
        <p className="ap-muted">Реальные работы из цеха «АвтоПульс», Москва.</p>
        <div className="ap-reviews-grid">
          {items.map((r) => (
            <ReviewCard key={r.id} item={r} />
          ))}
        </div>
      </section>
    );
  }

  if (!current) return <section id={id} className="ap-block"><h2>Отзывы</h2><p className="ap-muted">Пока нет отзывов.</p></section>;

  return (
    <section id={id} className="ap-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>Отзывы и кейсы</h2>
      <p className="ap-muted">Реальные работы из цеха «АвтоПульс», Москва.</p>

      <div
        className="ap-slider"
        role="region"
        aria-roledescription="слайдер"
        aria-label={`Отзыв ${index + 1} из ${total}`}
      >
        <ReviewCard item={current} />
        <div className="ap-slider__nav">
          <button type="button" className="ap-btn ap-btn--ghost" onClick={prev} aria-label="Предыдущий отзыв">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            Назад
          </button>
          <span className="ap-muted" aria-live="polite">{index + 1} / {total}</span>
          <button type="button" className="ap-btn ap-btn--ghost" onClick={next} aria-label="Следующий отзыв">
            Далее
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
        <div className="ap-dots" role="tablist" aria-label="Выбор отзыва">
          {items.map((r, n) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={n === index}
              aria-label={`Отзыв ${n + 1}: ${r.name}`}
              className={`ap-dot${n === index ? ' ap-dot--active' : ''}`}
              onClick={() => setIndex(n)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

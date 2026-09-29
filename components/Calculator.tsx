'use client';

import { useMemo, useState } from 'react';
import {
  CAR_CLASSES,
  SERVICES,
  formatDuration,
  formatRub,
  priceFor,
  type CarClassId,
} from './pricing';

export interface CalculatorProps {
  /** Предвыбранный класс авто */
  defaultCarClass?: CarClassId;
  /** Предвыбранные услуги */
  defaultSelected?: string[];
  /** Колбэк при пересчёте (для связи с формой записи) */
  onChange?: (total: number, minutes: number, serviceIds: string[]) => void;
  id?: string;
}

function WrenchIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default function Calculator({
  defaultCarClass = 'c',
  defaultSelected = ['to-standart'],
  onChange,
  id = 'calculator',
}: CalculatorProps): React.JSX.Element {
  const [carClass, setCarClass] = useState<CarClassId>(defaultCarClass);
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const { total, minutes } = useMemo(() => {
    let sum = 0;
    let min = 0;
    for (const sid of selected) {
      sum += priceFor(sid, carClass);
      min += SERVICES.find((s) => s.id === sid)?.durationMin ?? 0;
    }
    return { total: sum, minutes: min };
  }, [selected, carClass]);

  function toggle(sid: string): void {
    setSelected((prev) => {
      const next = prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid];
      const sum = next.reduce((acc, id2) => acc + priceFor(id2, carClass), 0);
      const min = next.reduce(
        (acc, id2) => acc + (SERVICES.find((s) => s.id === id2)?.durationMin ?? 0),
        0,
      );
      onChange?.(sum, min, next);
      return next;
    });
  }

  function pickClass(next: CarClassId): void {
    setCarClass(next);
    const sum = selected.reduce((acc, sid) => acc + priceFor(sid, next), 0);
    onChange?.(sum, minutes, selected);
  }

  return (
    <section id={id} className="ap-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>Калькулятор ТО</h2>
      <p className="ap-muted">Выберите класс автомобиля и услуги — цена и время посчитаются сразу.</p>

      <fieldset className="ap-fieldset">
        <legend>Класс автомобиля</legend>
        <div className="ap-chips" role="radiogroup" aria-label="Класс автомобиля">
          {CAR_CLASSES.map((c) => (
            <label
              key={c.id}
              className={`ap-chip${carClass === c.id ? ' ap-chip--active' : ''}`}
            >
              <input
                type="radio"
                name={`${id}-carclass`}
                value={c.id}
                checked={carClass === c.id}
                onChange={() => pickClass(c.id)}
                className="ap-visually-hidden"
              />
              <span aria-hidden="true"><WrenchIcon /></span>
              <span>
                <strong>{c.label}</strong>
                <small className="ap-muted"> · {c.description}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="ap-fieldset">
        <legend>Услуги</legend>
        <ul className="ap-servicelist">
          {SERVICES.map((s) => {
            const checked = selected.includes(s.id);
            const price = priceFor(s.id, carClass);
            return (
              <li key={s.id}>
                <label className={`ap-service${checked ? ' ap-service--active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(s.id)}
                    aria-describedby={`${id}-${s.id}-price`}
                  />
                  <span className="ap-service__main">
                    <span>{s.label}</span>
                    <small className="ap-muted">{formatDuration(s.durationMin)}</small>
                  </span>
                  <strong id={`${id}-${s.id}-price`}>{formatRub(price)}</strong>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="ap-result" role="status" aria-live="polite">
        <div>
          <div className="ap-muted">Итого</div>
          <div className="ap-total">{formatRub(total)}</div>
          <div className="ap-muted">Время: {formatDuration(minutes)} · работа без стоимости запчастей, точную смету подтвердит мастер</div>
        </div>
        <a className="ap-btn" href="#booking" aria-label="Перейти к онлайн-записи с выбранными услугами">
          Записаться
        </a>
      </div>
    </section>
  );
}

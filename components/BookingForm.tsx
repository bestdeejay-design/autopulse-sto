'use client';

import { useMemo, useState } from 'react';
import {
  SERVICES,
  TIME_SLOTS,
  isValidPhoneRu,
  maskPhoneRu,
} from './pricing';

export interface BookingFormProps {
  id?: string;
  /** Предвыбранная услуга (например, из калькулятора) */
  defaultServiceId?: string;
}

interface FieldErrors {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  consent?: string;
}

function todayIso(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function CheckIcon(): React.JSX.Element {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m8.5 12.5 2.5 2.5 5-5.5" />
    </svg>
  );
}

export default function BookingForm({
  id = 'booking',
  defaultServiceId = 'to-standart',
}: BookingFormProps): React.JSX.Element {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(defaultServiceId);
  const [date, setDate] = useState(todayIso());
  const [time, setTime] = useState('10:00');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState(false);

  const phoneMasked = useMemo(() => maskPhoneRu(phone), [phone]);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (name.trim().length < 2) e.name = 'Укажите имя (минимум 2 буквы)';
    if (!isValidPhoneRu(phone)) e.phone = 'Введите корректный номер: +7 (XXX) XXX-XX-XX';
    if (!SERVICES.some((s) => s.id === serviceId)) e.service = 'Выберите услугу из списка';
    if (!date) e.date = 'Выберите дату';
    else if (date < todayIso()) e.date = 'Дата не может быть в прошлом';
    if (!TIME_SLOTS.includes(time)) e.time = 'Выберите время из списка';
    if (!consent) e.consent = 'Нужно согласие на обработку персональных данных';
    return e;
  }

  function onSubmit(ev: React.FormEvent): void {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector(`#${id} [aria-invalid="true"]`) as HTMLElement | null;
      first?.focus();
      return;
    }
    // Без бэкенда: только success-state. Данные остаются в state для отображения.
    setDone(true);
  }

  function reset(): void {
    setDone(false);
    setName('');
    setPhone('');
    setComment('');
    setConsent(false);
    setErrors({});
  }

  if (done) {
    const service = SERVICES.find((s) => s.id === serviceId);
    return (
      <section id={id} className="ap-block" aria-labelledby={`${id}-title`}>
        <h2 id={`${id}-title`}>Заявка принята</h2>
        <div className="ap-success" role="status" aria-live="polite">
          <CheckIcon />
          <p>
            <strong>{name.trim()}, спасибо!</strong> Мы ждём вас {date} в {time}.
            <br />
            Услуга: {service?.label ?? serviceId}. Перезвоним на {phoneMasked} в течение 15 минут
            в рабочее время для подтверждения.
          </p>
          <button type="button" className="ap-btn ap-btn--ghost" onClick={reset}>
            Создать ещё одну заявку
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="ap-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>Онлайн-запись</h2>
      <p className="ap-muted">Оставьте заявку — перезвоним за 15 минут в рабочее время. Без предоплаты.</p>

      <form onSubmit={onSubmit} noValidate className="ap-form">
        <div className="ap-grid2">
          <div className="ap-field">
            <label htmlFor={`${id}-name`}>Имя *</label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Как к вам обращаться"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${id}-name-err` : undefined}
            />
            {errors.name && <p id={`${id}-name-err`} role="alert" className="ap-error">{errors.name}</p>}
          </div>

          <div className="ap-field">
            <label htmlFor={`${id}-phone`}>Телефон *</label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              value={phoneMasked === '+7' ? '' : phoneMasked}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${id}-phone-err` : `${id}-phone-hint`}
            />
            <small id={`${id}-phone-hint`} className="ap-muted">Формат: +7 (XXX) XXX-XX-XX</small>
            {errors.phone && <p id={`${id}-phone-err`} role="alert" className="ap-error">{errors.phone}</p>}
          </div>
        </div>

        <div className="ap-field">
          <label htmlFor={`${id}-service`}>Услуга *</label>
          <select
            id={`${id}-service`}
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${id}-service-err` : undefined}
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          {errors.service && <p id={`${id}-service-err`} role="alert" className="ap-error">{errors.service}</p>}
        </div>

        <div className="ap-grid2">
          <div className="ap-field">
            <label htmlFor={`${id}-date`}>Дата *</label>
            <input
              id={`${id}-date`}
              type="date"
              min={todayIso()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? `${id}-date-err` : undefined}
            />
            {errors.date && <p id={`${id}-date-err`} role="alert" className="ap-error">{errors.date}</p>}
          </div>
          <div className="ap-field">
            <label htmlFor={`${id}-time`}>Время *</label>
            <select
              id={`${id}-time`}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? `${id}-time-err` : undefined}
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.time && <p id={`${id}-time-err`} role="alert" className="ap-error">{errors.time}</p>}
          </div>
        </div>

        <div className="ap-field">
          <label htmlFor={`${id}-comment`}>Комментарий</label>
          <textarea
            id={`${id}-comment`}
            rows={3}
            placeholder="Марка авто, год, симптомы (необязательно)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="ap-field ap-check">
          <input
            id={`${id}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id}-consent-err` : undefined}
          />
          <label htmlFor={`${id}-consent`}>
            Соглашаюсь на обработку персональных данных для связи по заявке *
          </label>
        </div>
        {errors.consent && <p id={`${id}-consent-err`} role="alert" className="ap-error">{errors.consent}</p>}

        <button type="submit" className="ap-btn">Записаться</button>
      </form>
    </section>
  );
}

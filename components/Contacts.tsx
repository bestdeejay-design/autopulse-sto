import { SHOP } from './pricing';

export interface ContactsProps {
  id?: string;
  /** Показать заглушку карты */
  showMap?: boolean;
}

function PhoneIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function PinIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function ChatIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l2-5.4a8.2 8.2 0 0 1-1.5-4.6A8.4 8.4 0 0 1 12 2.6a8.4 8.4 0 0 1 9 8.9Z" />
    </svg>
  );
}

export default function Contacts({
  id = 'contacts',
  showMap = true,
}: ContactsProps): React.JSX.Element {
  return (
    <section id={id} className="ap-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>Контакты</h2>

      <div className="ap-contacts">
        <ul className="ap-contactlist">
          <li>
            <span aria-hidden="true"><PinIcon /></span>
            <div>
              <strong>Адрес</strong>
              <br />
              <span>{SHOP.address}</span>
            </div>
          </li>
          <li>
            <span aria-hidden="true"><ClockIcon /></span>
            <div>
              <strong>Часы работы</strong>
              <br />
              <span>{SHOP.hoursWeekdays}</span>
              <br />
              <span>{SHOP.hoursWeekend}</span>
            </div>
          </li>
          <li>
            <span aria-hidden="true"><PhoneIcon /></span>
            <div>
              <strong>Телефон</strong>
              <br />
              <a href={SHOP.phoneHref}>{SHOP.phoneDisplay}</a>
            </div>
          </li>
        </ul>

        <div className="ap-messengers">
          <a className="ap-btn" href={SHOP.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp">
            <span aria-hidden="true"><ChatIcon /></span> WhatsApp
          </a>
          <a className="ap-btn ap-btn--ghost" href={SHOP.telegram} target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram">
            <span aria-hidden="true"><ChatIcon /></span> Telegram
          </a>
          <a className="ap-btn ap-btn--ghost" href="#booking" aria-label="Перейти к онлайн-записи">
            Онлайн-запись
          </a>
        </div>

        {showMap && (
          <div
            className="ap-map"
            role="img"
            aria-label={`Заглушка карты: ${SHOP.address}. ${SHOP.mapPlaceholder}`}
          >
            <div className="ap-map__inner">
              <span aria-hidden="true"><PinIcon /></span>
              <p>
                <strong>{SHOP.brand}, {SHOP.city}</strong>
                <br />
                {SHOP.address}
                <br />
                <small>{SHOP.mapPlaceholder}</small>
              </p>
              <small className="ap-muted">Интерактивная карта подключается отдельно (iframe провайдера)</small>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

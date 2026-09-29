/**
 * АвтоПульс — общие данные для интерактивов.
 * Источник цен в рублях: PRICING. Все компоненты читают цены отсюда.
 */

/** Класс автомобиля */
export type CarClassId = 'b' | 'c' | 'crossover' | 'business' | 'suv';

export interface CarClass {
  id: CarClassId;
  label: string;
  /** Множитель к базовой цене услуги */
  multiplier: number;
  description: string;
}

export const CAR_CLASSES: CarClass[] = [
  { id: 'b', label: 'B-класс', multiplier: 1, description: 'Rio, Polo, Solaris' },
  { id: 'c', label: 'C-класс', multiplier: 1.15, description: 'Octavia, Elantra, Cerato' },
  { id: 'crossover', label: 'Кроссовер', multiplier: 1.3, description: 'Creta, Duster, Qashqai' },
  { id: 'business', label: 'Бизнес-класс', multiplier: 1.5, description: 'Camry, K5, Superb' },
  { id: 'suv', label: 'Внедорожник / Премиум', multiplier: 1.7, description: 'LC, X5, GLE' },
];

/** Услуга ТО */
export interface ServiceItem {
  id: string;
  label: string;
  short: string;
  /** Базовая цена в рублях (для B-класса) */
  basePrice: number;
  /** Длительность в минутах */
  durationMin: number;
  category: 'to' | 'diagnostics' | 'brakes' | 'chassis' | 'extra';
}

export const SERVICES: ServiceItem[] = [
  { id: 'to-mini', label: 'ТО Мини (масло + фильтры)', short: 'ТО Мини', basePrice: 4500, durationMin: 60, category: 'to' },
  { id: 'to-standart', label: 'ТО Стандарт (масло, фильтры, диагностика)', short: 'ТО Стандарт', basePrice: 7500, durationMin: 90, category: 'to' },
  { id: 'to-maxi', label: 'ТО Макси (все жидкости + ГРМ осмотр)', short: 'ТО Макси', basePrice: 12000, durationMin: 150, category: 'to' },
  { id: 'diag-computer', label: 'Компьютерная диагностика', short: 'Диагностика', basePrice: 1500, durationMin: 30, category: 'diagnostics' },
  { id: 'diag-suspension', label: 'Диагностика ходовой на подъёмнике', short: 'Ходовая', basePrice: 900, durationMin: 30, category: 'diagnostics' },
  { id: 'brakes-pads', label: 'Замена тормозных колодок (ось)', short: 'Колодки', basePrice: 2200, durationMin: 45, category: 'brakes' },
  { id: 'brakes-discs', label: 'Замена дисков и колодок (ось)', short: 'Диски + колодки', basePrice: 4500, durationMin: 90, category: 'brakes' },
  { id: 'brakes-fluid', label: 'Замена тормозной жидкости', short: 'Тормозная жидкость', basePrice: 1800, durationMin: 40, category: 'brakes' },
  { id: 'chassis-shock', label: 'Замена амортизаторов (сторона)', short: 'Амортизаторы', basePrice: 3200, durationMin: 80, category: 'chassis' },
  { id: 'chassis-alignment', label: 'Сход-развал 3D', short: 'Сход-развал', basePrice: 2800, durationMin: 45, category: 'chassis' },
  { id: 'extra-ac', label: 'Заправка кондиционера', short: 'Кондиционер', basePrice: 2500, durationMin: 50, category: 'extra' },
  { id: 'extra-battery', label: 'Проверка и замена АКБ (без стоимости АКБ)', short: 'АКБ', basePrice: 800, durationMin: 20, category: 'extra' },
];

/**
 * PRICING — единый источник цен в рублях.
 * Ключ: id услуги. Значение: базовая цена (B-класс).
 * Итоговая цена = Math.round(basePrice * multiplier / 100) * 100
 */
export const PRICING: Record<string, number> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.basePrice]),
);

/** Посчитать цену с учётом класса авто (округление до 100 руб.) */
export function priceFor(serviceId: string, carClassId: CarClassId): number {
  const base = PRICING[serviceId] ?? 0;
  const klass = CAR_CLASSES.find((c) => c.id === carClassId);
  const mult = klass?.multiplier ?? 1;
  return Math.round((base * mult) / 100) * 100;
}

/** Форматирование рублей: 12 500 ₽ */
export function formatRub(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

/** Форматирование длительности: 1 ч 30 мин */
export function formatDuration(totalMin: number): string {
  if (totalMin < 60) return `${totalMin} мин`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h} ч` : `${h} ч ${m} мин`;
}

/** Валидация и маска телефона RU: +7 (XXX) XXX-XX-XX */
export function normalizePhoneRu(input: string): string {
  const digits = input.replace(/\D/g, '');
  let core = digits;
  if (core.startsWith('8')) core = `7${core.slice(1)}`;
  if (core.startsWith('9') && core.length === 10) core = `7${core}`;
  if (!core.startsWith('7')) core = `7${core}`;
  core = core.slice(0, 11);
  return core;
}

export function maskPhoneRu(input: string): string {
  const core = normalizePhoneRu(input);
  const d = core.startsWith('7') ? core.slice(1) : core;
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);
  let out = '+7';
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += ')';
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

export function isValidPhoneRu(input: string): boolean {
  const core = normalizePhoneRu(input);
  return /^7\d{10}$/.test(core);
}

/** Контакты бренда — единый источник для Contacts.tsx и BookingForm */
export const SHOP = {
  brand: 'АвтоПульс',
  city: 'Москва',
  address: 'Москва, ул. Автомоторная, 7, стр. 2',
  hoursWeekdays: 'Пн–Пт: 8:00–21:00',
  hoursWeekend: 'Сб–Вс: 9:00–19:00',
  phoneDisplay: '+7 (495) 120-45-67',
  phoneHref: 'tel:+74951204567',
  whatsapp: 'https://wa.me/74951204567',
  telegram: 'https://t.me/avtopuls_msk',
  mapPlaceholder: 'Схема проезда: м. Войковская, 10 мин пешком, парковка для клиентов',
} as const;

/** Отзывы / кейсы */
export interface ReviewItem {
  id: string;
  name: string;
  car: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Дмитрий К.',
    car: 'Skoda Octavia',
    service: 'ТО Стандарт',
    rating: 5,
    text: 'Делал ТО Стандарт на Октавии. Показали старые фильтры, всё объяснили, уложились в полтора часа. Цена совпала с калькулятором на сайте.',
    date: 'сентябрь 2026',
  },
  {
    id: 'r2',
    name: 'Анна С.',
    car: 'Hyundai Creta',
    service: 'Диагностика + кондиционер',
    rating: 5,
    text: 'Перестал холодить кондиционер. Нашли утечку, заправили, дали гарантию. Записывалась онлайн — перезвонили через 10 минут.',
    date: 'август 2026',
  },
  {
    id: 'r3',
    name: 'Игорь В.',
    car: 'Toyota Camry',
    service: 'Тормоза: диски + колодки',
    rating: 4,
    text: 'Менял диски и колодки по кругу. Работа заняла полдня, но машину вернули чистой, старые запчасти отдали. Четыре звезды только за очередь в субботу.',
    date: 'август 2026',
  },
  {
    id: 'r4',
    name: 'Сергей Л.',
    car: 'BMW X3',
    service: 'Сход-развал 3D',
    rating: 5,
    text: 'После ямы тянуло вправо. Сделали 3D сход-развал, распечатку отдали. Руль теперь стоит ровно, резину не ест.',
    date: 'июль 2026',
  },
];

/** Слоты времени для онлайн-записи */
export const TIME_SLOTS: string[] = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00',
];

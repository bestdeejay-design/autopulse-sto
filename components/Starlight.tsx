"use client";

import { useMemo } from "react";

/**
 * Maybach Starlight Headliner — звёздный потолок.
 * Генерирует набор точек со случайными позициями и задержками анимации.
 * ~120 звёзд — похоже на реальный Starlight Headliner.
 */

interface StarlightProps {
  /** Количество звёзд (по умолчанию 120) */
  count?: number;
  /** Вероятность "золотых" звёзд 0..1 */
  goldChance?: number;
  /** Вероятность "больших" звёзд 0..1 */
  bigChance?: number;
  /** Показать падающую звезду */
  shooting?: boolean;
  /** aria-hidden по умолчанию */
  ariaHidden?: boolean;
}

interface Star {
  top: string;
  left: string;
  delay: string;
  duration: string;
  variant: "regular" | "gold" | "big";
}

function makeStars(count: number, goldChance: number, bigChance: number): Star[] {
  // Простой детерминированный PRNG для одинаковой картинки при SSR/CSR
  let seed = 9173;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const top = rand() * 100;
    const left = rand() * 100;
    const delay = rand() * 5;
    const duration = 3 + rand() * 3;
    const roll = rand();
    let variant: Star["variant"] = "regular";
    if (roll < goldChance) variant = "gold";
    else if (roll < goldChance + bigChance) variant = "big";
    stars.push({
      top: `${top}%`,
      left: `${left}%`,
      delay: `${delay}s`,
      duration: `${duration}s`,
      variant,
    });
  }
  return stars;
}

export default function Starlight({
  count = 120,
  goldChance = 0.12,
  bigChance = 0.08,
  shooting = false,
  ariaHidden = true,
}: StarlightProps): React.JSX.Element {
  const stars = useMemo(
    () => makeStars(count, goldChance, bigChance),
    [count, goldChance, bigChance]
  );

  return (
    <div
      className="starlight"
      aria-hidden={ariaHidden ? "true" : undefined}
      role={ariaHidden ? undefined : "presentation"}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className={
            s.variant === "gold"
              ? "starlight__star starlight__star--gold"
              : s.variant === "big"
              ? "starlight__star starlight__star--big"
              : "starlight__star"
          }
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
      {shooting && (
        <span
          className="starlight__shooting"
          style={{
            top: "10%",
            left: "20%",
          }}
        />
      )}
    </div>
  );
}

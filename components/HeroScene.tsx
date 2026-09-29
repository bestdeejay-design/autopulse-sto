/**
 * Hero Scene SVG — стилизованная иллюстрация "Maybach в нашем цеху".
 * Cinematic dark scene: тёмный пол цеха, силуэт премиум-седана,
 * свечение LED-панелей сверху, блики на кузове, ambient-золото.
 * Масштабируется идеально, весит < 4KB.
 */

interface HeroSceneProps {
  className?: string;
  ariaLabel?: string;
}

export default function HeroScene({
  className,
  ariaLabel = "Силуэт премиального седана в освещённом цеху АвтоПульс",
}: HeroSceneProps): React.JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Градиент фона: тёмный пол → глубокий верх */}
        <linearGradient id="bg-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c0e14" />
          <stop offset="40%" stopColor="#14181f" />
          <stop offset="100%" stopColor="#050608" />
        </linearGradient>

        {/* Свечение потолочных LED */}
        <radialGradient id="ceiling-glow" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#e9cf94" stopOpacity="0.35" />
          <stop offset="30%" stopColor="#d4b87a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d4b87a" stopOpacity="0" />
        </radialGradient>

        {/* Кузов авто — угольно-чёрный с лёгким градиентом */}
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f3c" />
          <stop offset="50%" stopColor="#14181f" />
          <stop offset="100%" stopColor="#0c0e14" />
        </linearGradient>

        {/* Блик на крыше (золотой отблеск от LED) */}
        <linearGradient id="car-top-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4b87a" stopOpacity="0" />
          <stop offset="40%" stopColor="#d4b87a" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d4b87a" stopOpacity="0" />
        </linearGradient>

        {/* Стекло лобовое */}
        <linearGradient id="windshield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4252" />
          <stop offset="100%" stopColor="#1c2230" />
        </linearGradient>

        {/* Свет фар — золотой */}
        <radialGradient id="headlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8e0" />
          <stop offset="40%" stopColor="#e9cf94" />
          <stop offset="100%" stopColor="#d4b87a" stopOpacity="0" />
        </radialGradient>

        {/* Красный задний фонарь */}
        <radialGradient id="taillight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff7878" />
          <stop offset="50%" stopColor="#a8313a" />
          <stop offset="100%" stopColor="#a8313a" stopOpacity="0" />
        </radialGradient>

        {/* Блик на полу */}
        <radialGradient id="floor-reflection" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d4b87a" stopOpacity="0" />
        </radialGradient>

        {/* LED-панель сверху */}
        <linearGradient id="led-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e9cf94" stopOpacity="0.3" />
        </linearGradient>

        {/* Размытие */}
        <filter id="soft-blur">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        <filter id="light-blur">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* Фон */}
      <rect width="800" height="600" fill="url(#bg-floor)" />

      {/* Потолочное свечение */}
      <rect width="800" height="280" fill="url(#ceiling-glow)" />

      {/* LED-панели сверху (3 шт) */}
      <g opacity="0.6">
        <rect x="120" y="40" width="120" height="6" rx="3" fill="url(#led-panel)" />
        <rect x="340" y="30" width="120" height="6" rx="3" fill="url(#led-panel)" />
        <rect x="560" y="40" width="120" height="6" rx="3" fill="url(#led-panel)" />
      </g>

      {/* Лёгкая перспектива пола — горизонт */}
      <line
        x1="0"
        y1="380"
        x2="800"
        y2="380"
        stroke="#d4b87a"
        strokeOpacity="0.15"
        strokeWidth="1"
      />

      {/* Силуэт автомобиля — премиум-седан, вид сбоку с лёгким 3/4 */}
      <g transform="translate(120, 230)">
        {/* Отражение на полу */}
        <ellipse
          cx="280"
          cy="270"
          rx="240"
          ry="20"
          fill="url(#floor-reflection)"
          filter="url(#light-blur)"
        />

        {/* Тень под авто */}
        <ellipse cx="280" cy="248" rx="230" ry="10" fill="#050608" opacity="0.7" />

        {/* Кузов — основная масса */}
        <path
          d="M 40 180
             L 80 140
             Q 100 120 140 115
             L 200 95
             Q 230 85 280 85
             Q 340 85 380 100
             L 440 120
             Q 480 130 510 155
             L 540 180
             L 540 220
             L 40 220
             Z"
          fill="url(#car-body)"
          stroke="#d4b87a"
          strokeOpacity="0.2"
          strokeWidth="1"
        />

        {/* Крыша — блик */}
        <path
          d="M 100 140
             Q 120 122 158 117
             L 218 97
             Q 248 88 280 88
             Q 335 88 372 102
             L 432 122
             Q 460 130 488 150
             L 488 152
             Q 460 132 432 124
             L 372 104
             Q 335 90 280 90
             Q 248 90 218 99
             L 158 119
             Q 120 124 100 142
             Z"
          fill="url(#car-top-shine)"
          opacity="0.85"
        />

        {/* Лобовое стекло */}
        <path
          d="M 168 110
             L 220 92
             Q 248 85 278 85
             L 320 87
             L 290 130
             L 175 130
             Z"
          fill="url(#windshield)"
          opacity="0.85"
        />

        {/* Заднее стекло */}
        <path
          d="M 415 110
             L 380 92
             Q 350 87 322 87
             L 318 90
             L 348 130
             L 425 130
             Z"
          fill="url(#windshield)"
          opacity="0.85"
        />

        {/* Боковое окно */}
        <path
          d="M 300 95
             L 305 90
             L 360 95
             L 372 102
             L 350 130
             L 295 130
             Z"
          fill="url(#windshield)"
          opacity="0.75"
        />

        {/* Передняя фара (свет) */}
        <ellipse
          cx="528"
          cy="170"
          rx="18"
          ry="6"
          fill="url(#headlight)"
          filter="url(#light-blur)"
        />
        <ellipse cx="528" cy="170" rx="10" ry="3" fill="#fff8e0" opacity="0.9" />

        {/* Луч от фары */}
        <path
          d="M 540 170 L 720 145 L 720 175 L 540 175 Z"
          fill="url(#headlight)"
          opacity="0.35"
          filter="url(#light-blur)"
        />

        {/* Задний фонарь */}
        <ellipse cx="52" cy="170" rx="8" ry="3" fill="#a8313a" opacity="0.95" />
        <ellipse
          cx="52"
          cy="170"
          rx="20"
          ry="6"
          fill="url(#taillight)"
          opacity="0.7"
          filter="url(#light-blur)"
        />

        {/* Хромированная решётка радиатора (перед) */}
        <g opacity="0.6">
          <line x1="510" y1="200" x2="535" y2="200" stroke="#d4b87a" strokeWidth="0.5" />
          <line x1="510" y1="205" x2="535" y2="205" stroke="#d4b87a" strokeWidth="0.5" />
          <line x1="510" y1="210" x2="535" y2="210" stroke="#d4b87a" strokeWidth="0.5" />
        </g>

        {/* Диски */}
        <circle cx="135" cy="225" r="32" fill="#0c0e14" stroke="#d4b87a" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="135" cy="225" r="22" fill="#1c2230" />
        <circle cx="135" cy="225" r="6" fill="#d4b87a" opacity="0.6" />

        <circle cx="445" cy="225" r="32" fill="#0c0e14" stroke="#d4b87a" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="445" cy="225" r="22" fill="#1c2230" />
        <circle cx="445" cy="225" r="6" fill="#d4b87a" opacity="0.6" />

        {/* Хромированная линия по борту (pinstripe Maybach) */}
        <line
          x1="60"
          y1="175"
          x2="510"
          y2="175"
          stroke="#d4b87a"
          strokeOpacity="0.6"
          strokeWidth="0.5"
        />

        {/* Логотип на капоте — трёхлучевая звезда (стилизация Maybach) */}
        <g transform="translate(495, 155)" opacity="0.9">
          <circle cx="0" cy="0" r="5" fill="#d4b87a" />
          <path d="M 0 -7 L 1 -1 L 7 0 L 1 1 L 0 7 L -1 1 L -7 0 L -1 -1 Z" fill="#0c0e14" />
        </g>
      </g>

      {/* Подсветка снизу — от подиума */}
      <ellipse
        cx="400"
        cy="500"
        rx="350"
        ry="30"
        fill="#d4b87a"
        opacity="0.08"
        filter="url(#soft-blur)"
      />

      {/* Виньетка */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="60%" stopColor="#050608" stopOpacity="0" />
        <stop offset="100%" stopColor="#050608" stopOpacity="0.8" />
      </radialGradient>
      <rect width="800" height="600" fill="url(#vignette)" />
    </svg>
  );
}

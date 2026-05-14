import { GL } from "./gl";
import { useState } from "react";
import { Header } from "./Header";

interface HeroProps {
  onBooking?: () => void;
}

export function Hero({ onBooking }: HeroProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col h-svh justify-between relative z-10 overflow-hidden">
      <GL hovering={hovering} />
      <Header onBooking={onBooking} />

      {/* Фото Дарьи — призрак за текстом справа */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Десктоп: справа */}
        <img
          src="https://cdn.poehali.dev/projects/a8d4720b-dad4-4d34-a7af-da8f70bb9a72/bucket/1f8175ee-356d-40ff-b12e-9ecf7966b813.png"
          alt=""
          className="hidden sm:block absolute bottom-0 right-0 h-[88%] w-auto object-cover object-top select-none"
          style={{
            opacity: 0.18,
            filter: 'brightness(0.65) saturate(0.5)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.1) 75%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.1) 75%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)',
          }}
          draggable={false}
        />
        {/* Мобайл: по центру, совсем лёгкий */}
        <img
          src="https://cdn.poehali.dev/projects/a8d4720b-dad4-4d34-a7af-da8f70bb9a72/bucket/1f8175ee-356d-40ff-b12e-9ecf7966b813.png"
          alt=""
          className="block sm:hidden absolute bottom-0 left-1/2 -translate-x-1/2 h-[70%] w-auto object-cover object-top select-none"
          style={{
            opacity: 0.1,
            filter: 'brightness(0.6) saturate(0.4)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to top, transparent 0%, black 20%)',
          }}
          draggable={false}
        />
      </div>

      <div className="pb-20 mt-auto text-center relative px-4" style={{ zIndex: 2 }}>
        <div className="mb-6 flex items-center justify-center gap-3 text-foreground/40 tracking-[0.3em] text-xs uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span style={{ color: '#B68B40' }}>✦</span>
          <span>Таро · Руны · Астрология</span>
          <span style={{ color: '#B68B40' }}>✦</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sentient leading-tight" style={{ color: '#EDE0C8' }}>
          Дарья Маг
        </h1>
        <p className="font-sentient text-xl sm:text-2xl md:text-3xl italic text-foreground/60 mt-3 mb-6">
          Тайные знания и точные предсказания
        </p>
        <p className="text-sm text-foreground/45 text-balance max-w-[480px] mx-auto leading-relaxed tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
          Расклады Таро, руны, астрология, диагностика по фото.<br />
          Честно, бережно, без привязки к датам и телефонам.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="#divinations">
            <button
              className="px-8 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-gold"
              style={{
                background: 'rgba(182,139,64,0.12)',
                border: '1px solid rgba(182,139,64,0.5)',
                color: '#B68B40',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Выбрать гадание
            </button>
          </a>
          <a href="#reviews">
            <button
              className="px-8 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Отзывы
            </button>
          </a>
        </div>

        <div className="mt-14 flex justify-center">
          <a href="#divinations" className="flex flex-col items-center gap-2 text-foreground/30 hover:text-foreground/60 transition-colors">
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px' }}>Листать вниз</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 4L8 20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

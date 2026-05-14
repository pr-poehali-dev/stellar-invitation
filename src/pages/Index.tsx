import { Hero } from "@/components/Hero";
import { BookingModal } from "@/components/BookingModal";
import { useState } from "react";
import Icon from "@/components/ui/icon";

const GOLD = "#B68B40";
const GOLD_DIM = "rgba(182,139,64,0.15)";
const GOLD_BORDER = "rgba(182,139,64,0.25)";
const BG_CARD = "rgba(15,10,30,0.65)";
const TEXT_MAIN = "#EDE0C8";

const divinations = [
  {
    icon: "Star",
    category: "Таро",
    items: [
      { name: "Три карты", desc: "Прошлое, настоящее, будущее", price: "800 ₽" },
      { name: "Кельтский крест", desc: "Детальный расклад на ситуацию", price: "1 500 ₽" },
      { name: "Пирамида влюбленных", desc: "Отношения, чувства, перспектива", price: "2 000 ₽" },
    ],
  },
  {
    icon: "Zap",
    category: "Руны",
    items: [
      { name: "Один рун", desc: "Ответ на один конкретный вопрос", price: "800 ₽" },
      { name: "Три руны", desc: "Прошлое, настоящее, совет", price: "1 200 ₽" },
      { name: "Молот Тора", desc: "Защита, сила, путь вперёд", price: "1 800 ₽" },
    ],
  },
  {
    icon: "Moon",
    category: "Астрология",
    items: [
      { name: "Прогноз на месяц", desc: "Главные тенденции ближайших недель", price: "1 500 ₽" },
      { name: "Прогноз на год", desc: "Полная астрологическая карта года", price: "2 500 ₽" },
      { name: "Синастрия", desc: "Совместимость двух людей", price: "2 500 ₽" },
    ],
  },
  {
    icon: "Eye",
    category: "Диагностика по фото",
    items: [
      { name: "Энергетический срез", desc: "Общее состояние энергетики", price: "1 800 ₽" },
      { name: "Блоки и зажимы", desc: "Что мешает двигаться вперёд", price: "2 000 ₽" },
      { name: "Диагностика порчи", desc: "Наличие негативных программ", price: "2 200 ₽" },
    ],
  },
  {
    icon: "Coffee",
    category: "Воск и кофе",
    items: [
      { name: "Гадание на воске", desc: "Старинный ритуал раскрытия тайн", price: "1 000 ₽" },
      { name: "Кофейная гуща", desc: "Образы и символы вашей судьбы", price: "1 000 ₽" },
      { name: "Комбо: воск + кофе", desc: "Двойное чтение символов", price: "1 800 ₽" },
    ],
  },
  {
    icon: "Layers",
    category: "Игральные карты",
    items: [
      { name: "Расклад на 7 карт", desc: "Классический ответ на вопрос", price: "800 ₽" },
      { name: "Полный расклад 36", desc: "Развёрнутое чтение судьбы", price: "1 500 ₽" },
      { name: "Годовой прогноз", desc: "По 3 карты на каждый месяц", price: "3 000 ₽" },
    ],
  },
];

const reviews = [
  {
    initials: "А.М.",
    text: "Делала расклад Кельтский крест на ситуацию с работой. Дарья очень точно описала то, что происходит — я была поражена. PDF получила через 3 часа. Очень рекомендую.",
    service: "Таро — Кельтский крест",
    stars: 5,
  },
  {
    initials: "В.С.",
    text: "Заказывала синастрию на пару. Дарья разобрала всё деликатно и без осуждения. Помогло понять многое в отношениях. Спасибо за честность и бережность.",
    service: "Синастрия",
    stars: 5,
  },
  {
    initials: "Т.Л.",
    text: "Боялась, что будут пустые слова. Но нет — конкретно, по делу, без страшилок. Расклад руны Молот Тора помог принять сложное решение. Анонимно и точно.",
    service: "Руны — Молот Тора",
    stars: 5,
  },
  {
    initials: "О.К.",
    text: "Диагностика по фото оказалась очень точной. Дарья описала именно те блоки, которые я чувствовала. Получила запись голосового и PDF. Всё профессионально.",
    service: "Диагностика по фото",
    stars: 5,
  },
];

const faqItems = [
  {
    q: "Нужно ли моё фото для гадания?",
    a: "Для диагностики по фото — да, потребуется ваша фотография. Для всех остальных видов гадания достаточно имени (можно псевдоним) и чёткого вопроса.",
  },
  {
    q: "Как я получу результат?",
    a: "Результат приходит на ваш Email или в Telegram — на тот контакт, который вы укажете при заказе. Форматы: текстовый PDF, голосовое сообщение или оба варианта. Звонков не будет.",
  },
  {
    q: "Можно ли задать уточняющий вопрос?",
    a: "Да, один дополнительный уточняющий вопрос после получения расклада — бесплатно. Это позволяет глубже понять полученный ответ.",
  },
  {
    q: "Это магия или психология?",
    a: "Я соединяю символизм карт и рун с анализом вашей ситуации. Таро и руны — это язык образов, который помогает увидеть скрытые закономерности. Решение всегда остаётся за вами.",
  },
  {
    q: "Всё конфиденциально?",
    a: "Абсолютно. Ваши данные, вопросы и результаты не передаются третьим лицам. Вы можете использовать псевдоним — это ваше право.",
  },
];

const instruments = [
  { emoji: "🃏", name: "Колода Таро Золотой Зари", desc: "Классическая система Уэйта с авторской интерпретацией" },
  { emoji: "ᚱ", name: "Рунный набор ясеня", desc: "Руны Старшего Футарка, вырезанные вручную из ясеня" },
  { emoji: "🕯", name: "Воск и травы", desc: "Ритуальные свечи и травяные составы для обрядов" },
  { emoji: "💎", name: "Кристаллы и камни", desc: "Лабрадорит, аметист и чёрный турмалин для работы" },
  { emoji: "⭐", name: "Натальные карты", desc: "Астрологические карты по дате и месту рождения" },
  { emoji: "☕", name: "Кофе и воск", desc: "Старинные техники чтения символов судьбы" },
];

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="font-sentient text-4xl md:text-5xl mb-4" style={{ color: TEXT_MAIN }}>{children}</h2>
      {sub && (
        <p className="text-sm text-foreground/45 max-w-md mx-auto tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>{sub}</p>
      )}
      <div className="divider-gold mt-6" />
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: GOLD, fontSize: '12px' }}>★</span>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer transition-all duration-300"
      style={{
        background: open ? 'rgba(182,139,64,0.07)' : BG_CARD,
        border: `1px solid ${open ? GOLD_BORDER : 'rgba(182,139,64,0.12)'}`,
        backdropFilter: 'blur(8px)',
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-sentient text-lg pr-4" style={{ color: TEXT_MAIN }}>{q}</span>
        <span style={{ color: GOLD, fontSize: '18px', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
      </div>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-foreground/60 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState("");

  const openBooking = (service?: string) => {
    setBookingService(service || "");
    setBookingOpen(true);
  };

  return (
    <>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialService={bookingService} />

      {/* HERO */}
      <Hero onBooking={() => openBooking()} />

      {/* Stars decoration between sections */}
      <div className="relative z-10">

        {/* ── ГАДАНИЯ ── */}
        <section id="divinations" className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(10,6,20,0.95)' }}>
          <div className="container">
            <SectionTitle sub="Выберите подходящий формат — я подберу нужный расклад">
              Виды гаданий
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {divinations.map((cat) => (
                <div
                  key={cat.category}
                  className="p-6 transition-all duration-300 hover:border-opacity-60"
                  style={{ background: BG_CARD, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(10px)' }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 flex items-center justify-center" style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}` }}>
                      <Icon name={cat.icon as "Star"} size={16} style={{ color: GOLD }} />
                    </div>
                    <h3 className="font-sentient text-xl" style={{ color: TEXT_MAIN }}>{cat.category}</h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-start justify-between gap-2 py-3" style={{ borderBottom: '1px solid rgba(182,139,64,0.08)' }}>
                        <div>
                          <p className="text-sm font-medium" style={{ color: TEXT_MAIN, fontFamily: "'Cormorant Garamond', serif" }}>{item.name}</p>
                          <p className="text-xs text-foreground/40 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                        </div>
                        <span className="text-sm font-light shrink-0" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openBooking(`${cat.category} — ${cat.items[0].name} (${cat.items[0].price})`)}
                    className="mt-5 w-full py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-gold"
                    style={{
                      background: GOLD_DIM,
                      border: `1px solid rgba(182,139,64,0.4)`,
                      color: GOLD,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Записаться
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── КАК ПРОХОДИТ СЕАНС ── */}
        <section id="how" className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(12,7,22,0.97)' }}>
          <div className="container">
            <SectionTitle sub="Всё анонимно, удобно и без встреч">
              Как проходит сеанс
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Выбор и оплата",
                  desc: "Выбираете вид гадания из списка и вносите оплату. Никаких звонков — всё онлайн.",
                },
                {
                  step: "02",
                  title: "Ваш запрос",
                  desc: "Описываете свой вопрос или ситуацию. Анонимно — достаточно имени и сути проблемы.",
                },
                {
                  step: "03",
                  title: "Получение ответа",
                  desc: "Получаете расшифровку — PDF или голосовое сообщение — в течение 2–24 часов.",
                },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div
                    className="w-14 h-14 mx-auto mb-5 flex items-center justify-center"
                    style={{ border: `1px solid ${GOLD_BORDER}`, background: GOLD_DIM }}
                  >
                    <span className="font-sentient text-xl" style={{ color: GOLD }}>{s.step}</span>
                  </div>
                  <h3 className="font-sentient text-xl mb-3" style={{ color: TEXT_MAIN }}>{s.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── О ДАРЬЕ МАГ ── */}
        <section id="about" className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(10,6,20,0.96)' }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">

              {/* Фото */}
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative" style={{ maxWidth: '420px', width: '100%' }}>
                  {/* Золотая рамка-декор */}
                  <div
                    className="absolute -inset-3 pointer-events-none"
                    style={{ border: '1px solid rgba(182,139,64,0.2)' }}
                  />
                  <div
                    className="absolute -inset-6 pointer-events-none"
                    style={{ border: '1px solid rgba(182,139,64,0.08)' }}
                  />
                  <img
                    src="https://cdn.poehali.dev/projects/a8d4720b-dad4-4d34-a7af-da8f70bb9a72/bucket/1f8175ee-356d-40ff-b12e-9ecf7966b813.png"
                    alt="Дарья Маг — таролог и практик"
                    className="w-full object-cover"
                    style={{
                      filter: 'brightness(0.92) contrast(1.05)',
                      display: 'block',
                    }}
                  />
                  {/* Золотой оверлей снизу */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(10,6,20,0.8), transparent)' }}
                  />
                </div>
              </div>

              {/* Текст */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span style={{ color: GOLD, fontSize: '20px' }}>✦</span>
                  <span className="text-xs tracking-[0.25em] uppercase text-foreground/40" style={{ fontFamily: "'Inter', sans-serif" }}>Практик · 7 лет опыта</span>
                </div>
                <h2 className="font-sentient text-4xl md:text-5xl mb-6" style={{ color: TEXT_MAIN }}>О Дарье Маг</h2>
                <div className="divider-gold mb-8" style={{ margin: '0 0 2rem 0' }} />

                <p className="font-sentient text-xl italic mb-6 leading-relaxed" style={{ color: `${TEXT_MAIN}CC` }}>
                  «Я практик с 7-летним стажем. Не гадаю по телефону и не даю пустых обещаний.»
                </p>

                <p className="text-sm text-foreground/55 leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '2' }}>
                  Работаю с Таро Уэйта, Рунами Старшего Футарка и натальными картами.
                  Моя цель — показать возможные пути, а не запугать вас.
                  Ваш запрос всегда остаётся строго конфиденциальным.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Таро Уэйта", "Руны Футарка", "Астрология", "7 лет практики", "Конфиденциально"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs tracking-widest uppercase"
                      style={{
                        border: `1px solid ${GOLD_BORDER}`,
                        color: `${GOLD}CC`,
                        background: GOLD_DIM,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── АТМОСФЕРНАЯ ГАЛЕРЕЯ ── */}
        <section className="relative z-10 py-16" style={{ background: 'rgba(8,4,16,0.98)' }}>
          <div className="container">
            <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
              {[
                {
                  url: "https://cdn.poehali.dev/projects/a8d4720b-dad4-4d34-a7af-da8f70bb9a72/bucket/4215cc09-371d-4522-aaed-fdf2b5a80c3d.png",
                  caption: "Расклад Таро",
                },
                {
                  url: "https://cdn.poehali.dev/projects/a8d4720b-dad4-4d34-a7af-da8f70bb9a72/bucket/7f1c6e0a-fe26-4cff-8cf9-bdfb6a4bc74b.png",
                  caption: "Ритуал с воском",
                },
                {
                  url: "https://cdn.poehali.dev/projects/a8d4720b-dad4-4d34-a7af-da8f70bb9a72/bucket/9ae578ef-a9b0-44fa-81e4-031ed6d8d2a5.png",
                  caption: "Чтение книги",
                },
              ].map((photo) => (
                <div key={photo.url} className="relative overflow-hidden group" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.85) contrast(1.08) saturate(0.9)' }}
                  />
                  {/* золотой оверлей при hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(182,139,64,0.2) 0%, transparent 60%)' }}
                  />
                  {/* рамка */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ border: '1px solid rgba(182,139,64,0.15)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs tracking-widest uppercase text-center" style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}>{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ИНСТРУМЕНТЫ ── */}
        <section id="instruments" className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(12,7,22,0.97)' }}>
          <div className="container">
            <SectionTitle sub="Проверенные инструменты, которыми я работаю">
              Мои инструменты
            </SectionTitle>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {instruments.map((item) => (
                <div
                  key={item.name}
                  className="p-5 text-center transition-all duration-300"
                  style={{ background: BG_CARD, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(8px)' }}
                >
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <p className="font-sentient text-base mb-1" style={{ color: TEXT_MAIN }}>{item.name}</p>
                  <p className="text-xs text-foreground/40 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ОТЗЫВЫ ── */}
        <section id="reviews" className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(10,6,20,0.96)' }}>
          <div className="container">
            <SectionTitle sub="Реальные отзывы клиентов — без имён и контактов">
              Отзывы
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {reviews.map((r) => (
                <div
                  key={r.initials}
                  className="p-6 transition-all duration-300"
                  style={{ background: BG_CARD, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(8px)' }}
                >
                  <StarRating count={r.stars} />
                  <p className="font-sentient text-base italic mt-4 mb-4 leading-relaxed" style={{ color: `${TEXT_MAIN}CC` }}>
                    «{r.text}»
                  </p>
                  <div className="flex items-center justify-between" style={{ borderTop: `1px solid rgba(182,139,64,0.1)`, paddingTop: '12px' }}>
                    <span className="text-xs tracking-widest" style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}>{r.initials}</span>
                    <span className="text-xs text-foreground/30" style={{ fontFamily: "'Inter', sans-serif" }}>{r.service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(12,7,22,0.97)' }}>
          <div className="container">
            <SectionTitle sub="Ответы на самые частые вопросы">
              Часто задаваемые вопросы
            </SectionTitle>

            <div className="flex flex-col gap-3 max-w-2xl mx-auto">
              {faqItems.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── КОНТАКТЫ ── */}
        <section id="contacts" className="relative z-10 py-24 md:py-32" style={{ background: 'rgba(10,6,20,0.98)' }}>
          <div className="container">
            <SectionTitle sub="Напишите удобным способом — отвечаю в течение нескольких часов">
              Контакты
            </SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">

              {/* Left: contact links */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs tracking-widest uppercase text-foreground/40 mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>Способы связи</p>

                  {[
                    { icon: "Mail", label: "Email", value: "darya.mag@example.com", href: "mailto:darya.mag@example.com" },
                    { icon: "Send", label: "Telegram", value: "@daryamag_bot", href: "https://t.me/daryamag_bot" },
                    { icon: "Instagram", label: "Instagram", value: "@darya.mag", href: "https://instagram.com/darya.mag" },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 py-4 group transition-all duration-200"
                      style={{ borderBottom: `1px solid rgba(182,139,64,0.1)` }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ border: `1px solid ${GOLD_BORDER}`, background: GOLD_DIM }}>
                        <Icon name={c.icon as "Mail"} size={14} style={{ color: GOLD }} />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/40 tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>{c.label}</p>
                        <p className="text-sm group-hover:text-foreground/90 transition-colors" style={{ color: TEXT_MAIN, fontFamily: "'Inter', sans-serif" }}>{c.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: form */}
              <div
                className="p-7"
                style={{ background: BG_CARD, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(10px)' }}
              >
                <p className="font-sentient text-xl mb-6" style={{ color: TEXT_MAIN }}>Написать напрямую</p>

                <ContactForm onSubmit={() => {}} />
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative z-10 py-10" style={{ background: '#080510', borderTop: `1px solid rgba(182,139,64,0.12)` }}>
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span style={{ color: GOLD, fontSize: '16px' }}>✦</span>
                <span className="font-sentient text-lg" style={{ color: GOLD }}>Дарья Маг</span>
              </div>

              <p className="text-xs text-center text-foreground/30 max-w-sm" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}>
                Все предсказания носят развлекательный характер.<br />
                Ответственность за принятые решения несёт клиент.
              </p>

              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 border text-foreground/40" style={{ borderColor: 'rgba(255,255,255,0.12)', fontFamily: "'Inter', sans-serif" }}>18+</span>
                <span className="text-xs text-foreground/30" style={{ fontFamily: "'Inter', sans-serif" }}>© 2025</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

function ContactForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("");
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  const services = [
    "Таро", "Руны", "Астрологический прогноз",
    "Диагностика по фото", "Гадание на воске/кофе", "Игральные карты",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    onSubmit();
    setTimeout(() => {
      setSent(false);
      setName(""); setContact(""); setService(""); setQuestion("");
    }, 3000);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(182,139,64,0.18)',
    color: '#EDE0C8',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    padding: '10px 14px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(237,224,200,0.35)',
    fontFamily: "'Inter', sans-serif",
    marginBottom: '6px',
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <div style={{ fontSize: '28px', color: GOLD, marginBottom: '10px' }}>✦</div>
        <p className="font-sentient text-lg" style={{ color: GOLD }}>Сообщение отправлено</p>
        <p className="text-xs text-foreground/40 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>Отвечу в течение нескольких часов</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label style={labelStyle}>Имя (можно псевдоним)</label>
        <input required style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться?" />
      </div>
      <div>
        <label style={labelStyle}>Email или Telegram @nickname</label>
        <input required style={inputStyle} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Как с вами связаться?" />
      </div>
      <div>
        <label style={labelStyle}>Вид гадания</label>
        <select
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={{ ...inputStyle, background: 'rgba(15,10,26,0.99)' }}
        >
          <option value="" disabled style={{ background: '#0F0A1A' }}>Выберите...</option>
          {services.map((s) => <option key={s} value={s} style={{ background: '#0F0A1A' }}>{s}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Ваш вопрос</label>
        <textarea
          required
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Кратко опишите ситуацию..."
        />
      </div>
      <button
        type="submit"
        className="py-3 text-xs tracking-[0.15em] uppercase mt-1 transition-all duration-300 hover:shadow-gold"
        style={{
          background: GOLD_DIM,
          border: `1px solid rgba(182,139,64,0.5)`,
          color: GOLD,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Отправить
      </button>
    </form>
  );
}
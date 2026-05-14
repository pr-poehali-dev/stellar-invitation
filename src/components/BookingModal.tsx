import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const DIVINATION_OPTIONS = [
  "Таро — Три карты (800 ₽)",
  "Таро — Кельтский крест (1500 ₽)",
  "Таро — Пирамида влюбленных (2000 ₽)",
  "Руны — Один рун (800 ₽)",
  "Руны — Три руны (1200 ₽)",
  "Руны — Молот Тора (1800 ₽)",
  "Астрологический прогноз на месяц (1500 ₽)",
  "Астрологический прогноз на год (2500 ₽)",
  "Синастрия (совместимость) (2500 ₽)",
  "Диагностика по фото (1800 ₽)",
  "Гадание на воске/кофейной гуще (1000 ₽)",
  "Гадание на игральных картах (1000 ₽)",
];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  initialService?: string;
}

export function BookingModal({ open, onClose, initialService }: BookingModalProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState(initialService || "");
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setContact("");
      setService("");
      setQuestion("");
      onClose();
    }, 2500);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md p-8 outline-none"
          style={{
            background: 'rgba(15,10,26,0.97)',
            border: '1px solid rgba(182,139,64,0.3)',
          }}
        >
          <Dialog.Title
            className="font-sentient text-2xl mb-1"
            style={{ color: '#EDE0C8' }}
          >
            Запись на сеанс
          </Dialog.Title>
          <Dialog.Description className="text-xs text-foreground/40 mb-6 tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
            Заполните форму — я свяжусь с вами в течение нескольких часов
          </Dialog.Description>

          {sent ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-4">✦</div>
              <p className="font-sentient text-xl" style={{ color: '#B68B40' }}>Заявка принята</p>
              <p className="text-sm text-foreground/50 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Ожидайте ответа на указанный контакт
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs tracking-widest uppercase text-foreground/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Имя (как обращаться)
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Можно псевдоним"
                  className="w-full px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(182,139,64,0.2)',
                    color: '#EDE0C8',
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-foreground/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Telegram или Email
                </label>
                <input
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@nickname или email@example.com"
                  className="w-full px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(182,139,64,0.2)',
                    color: '#EDE0C8',
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-foreground/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Вид гадания
                </label>
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{
                    background: 'rgba(15,10,26,0.98)',
                    border: '1px solid rgba(182,139,64,0.2)',
                    color: service ? '#EDE0C8' : 'rgba(237,224,200,0.35)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <option value="" disabled>Выберите услугу...</option>
                  {DIVINATION_OPTIONS.map((o) => (
                    <option key={o} value={o} style={{ background: '#0F0A1A' }}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-foreground/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Ваш вопрос / ситуация
                </label>
                <textarea
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Опишите кратко, что вас беспокоит..."
                  rows={3}
                  className="w-full px-4 py-3 text-sm outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(182,139,64,0.2)',
                    color: '#EDE0C8',
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-gold"
                style={{
                  background: 'rgba(182,139,64,0.15)',
                  border: '1px solid rgba(182,139,64,0.6)',
                  color: '#B68B40',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Отправить заявку
              </button>
            </form>
          )}

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-foreground/30 hover:text-foreground/70 transition-colors"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

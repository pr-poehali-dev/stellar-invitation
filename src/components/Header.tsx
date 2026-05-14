import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  onBooking?: () => void;
}

export const Header = ({ onBooking }: HeaderProps) => {
  return (
    <div className="fixed z-50 pt-6 md:pt-10 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        <a href="/">
          <Logo className="w-auto" />
        </a>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-8">
          {[
            { label: "Гадания", href: "#divinations" },
            { label: "Услуги", href: "#how" },
            { label: "Обо мне", href: "#about" },
            { label: "Отзывы", href: "#reviews" },
            { label: "Контакты", href: "#contacts" },
          ].map((item) => (
            <a
              className="font-light text-sm text-foreground/60 hover:text-foreground/100 duration-200 transition-colors ease-out tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.15em' }}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          onClick={onBooking}
          className="max-lg:hidden transition-all ease-out duration-200 text-xs tracking-widest uppercase px-5 py-2 border hover:shadow-gold"
          style={{
            borderColor: 'rgba(182,139,64,0.5)',
            color: '#B68B40',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.12em',
            background: 'rgba(182,139,64,0.05)',
          }}
        >
          Запись на сеанс
        </button>
        <MobileMenu onBooking={onBooking} />
      </header>
    </div>
  );
};

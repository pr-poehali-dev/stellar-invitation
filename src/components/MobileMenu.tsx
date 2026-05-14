import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  className?: string;
  onBooking?: () => void;
}

export const MobileMenu = ({ className, onBooking }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Гадания", href: "#divinations" },
    { name: "Как проходит сеанс", href: "#how" },
    { name: "Обо мне", href: "#about" },
    { name: "Отзывы", href: "#reviews" },
    { name: "Контакты", href: "#contacts" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-foreground transition-colors",
            className
          )}
          aria-label="Открыть меню"
        >
          <Menu className="group-[[data-state=open]]:hidden" size={22} color="#B68B40" />
          <X className="hidden group-[[data-state=open]]:block" size={22} color="#B68B40" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div
          data-overlay="true"
          className="fixed z-30 inset-0 bg-black/70 backdrop-blur-sm"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-24 md:py-36"
          style={{ background: 'rgba(15,10,26,0.97)' }}
        >
          <Dialog.Title className="sr-only">Меню</Dialog.Title>

          <nav className="flex flex-col space-y-5 container mx-auto">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-lg font-light uppercase text-foreground/60 transition-colors ease-out duration-150 hover:text-foreground/100 py-1 tracking-widest"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em', fontSize: '13px' }}
              >
                {item.name}
              </a>
            ))}

            <div className="mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBooking?.();
                }}
                className="text-sm tracking-widest uppercase px-6 py-3 border"
                style={{
                  borderColor: 'rgba(182,139,64,0.5)',
                  color: '#B68B40',
                  background: 'rgba(182,139,64,0.07)',
                  letterSpacing: '0.12em',
                }}
              >
                Запись на сеанс
              </button>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

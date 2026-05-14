export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span style={{ fontSize: '22px', color: '#B68B40' }}>✦</span>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px',
          fontWeight: 400,
          color: '#B68B40',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
        }}
      >
        Дарья Маг
      </span>
    </div>
  );
};

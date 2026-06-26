export function BbLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect width="48" height="48" rx="12" fill="#FFED00" />
      <path d="M14 14h20v8H22v4h10v8H14V14z" fill="#003DA5" />
      <circle cx="34" cy="20" r="4" fill="#003DA5" />
    </svg>
  );
}

export function CieloLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect width="48" height="48" rx="12" fill="#006EFF" />
      <path d="M24 12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S30.627 12 24 12z" fill="white" fillOpacity="0.2" />
      <text x="24" y="28" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">C</text>
    </svg>
  );
}

export function RedeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect width="48" height="48" rx="12" fill="#E30613" />
      <path d="M15 18h18v4H15zm0 8h18v4H15z" fill="white" fillOpacity="0.9" />
      <circle cx="24" cy="24" r="3" fill="white" />
    </svg>
  );
}

export function VindiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect width="48" height="48" rx="12" fill="#6C2EB9" />
      <path d="M20 16v16l4-8 4 8V16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function PagseguroLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect width="48" height="48" rx="12" fill="#00B2A9" />
      <path d="M18 20h12a4 4 0 010 8H22v4h-4V20z" fill="white" />
      <circle cx="32" cy="24" r="4" fill="white" fillOpacity="0.3" />
    </svg>
  );
}

export function PagarMeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect width="48" height="48" rx="12" fill="#3D4D5C" />
      <path d="M16 24c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="24" r="3" fill="white" />
    </svg>
  );
}

export function PaymentLogo({ methodId, className }: { methodId: string; className?: string }) {
  switch (methodId) {
    case 'bb': return <BbLogo className={className} />;
    case 'cielo': return <CieloLogo className={className} />;
    case 'rede': return <RedeLogo className={className} />;
    case 'vindi': return <VindiLogo className={className} />;
    case 'pagseguro': return <PagseguroLogo className={className} />;
    case 'pagarme': return <PagarMeLogo className={className} />;
    default: return null;
  }
}

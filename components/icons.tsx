/**
 * Иконки контактов. В прототипе на их месте стояли текстовые глифы
 * (✈ ✆ @) — хендофф просит заменить их на нормальный набор.
 */
type IconProps = { className?: string };

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.8 4.2 18.9 19c-.2 1-.8 1.2-1.6.7l-4.5-3.3-2.2 2.1c-.2.2-.5.5-.9.5l.3-4.6 8.3-7.5c.4-.3-.1-.5-.6-.2L7.4 13.2 2.9 11.8c-1-.3-1-1 .2-1.4l17.4-6.7c.8-.3 1.5.2 1.3 1.5z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a14 14 0 0 1-6.3-5.5c-.5-.7-.8-1.6-.8-2.4 0-.9.5-1.4.7-1.6.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.3.4c-.1.2-.3.3-.1.6.6 1 1.3 1.7 2.3 2.3.3.2.4.1.6-.1l.5-.6c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3v1z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.2 5.5a1.5 1.5 0 0 0 1.6 0L21 7" />
    </svg>
  );
}

export default function ZippyAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Yellow background */}
      <circle cx="40" cy="40" r="40" fill="#FFC72C"/>

      {/* Spiky orange hair — 5 triangular spikes behind the face */}
      <polygon points="13,34 18,21 23,34" fill="#F97316"/>
      <polygon points="22,31 27,13 33,31" fill="#F97316"/>
      <polygon points="33,29 40,7 47,29" fill="#F97316"/>
      <polygon points="47,31 53,13 58,31" fill="#F97316"/>
      <polygon points="57,34 62,21 67,34" fill="#F97316"/>

      {/* Face */}
      <ellipse cx="40" cy="48" rx="19" ry="21" fill="#FFD4A8"/>

      {/* Eyebrows — angled up at outer edge (energy) */}
      <path d="M28 40 Q32 37 37 40" stroke="#C85A00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M43 40 Q48 37 52 40" stroke="#C85A00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Eyes */}
      <circle cx="33" cy="46" r="4.5" fill="white"/>
      <circle cx="47" cy="46" r="4.5" fill="white"/>
      <circle cx="33" cy="46" r="2.8" fill="#1F2A44"/>
      <circle cx="47" cy="46" r="2.8" fill="#1F2A44"/>
      <circle cx="34.2" cy="44.8" r="1" fill="white"/>
      <circle cx="48.2" cy="44.8" r="1" fill="white"/>

      {/* Big grin */}
      <path d="M30 56 Q40 67 50 56" stroke="#C85A00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Energy sparks on cheeks */}
      <line x1="18" y1="47" x2="23" y2="44" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="51" x2="23" y2="49" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
      <line x1="57" y1="44" x2="62" y2="47" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
      <line x1="57" y1="49" x2="62" y2="51" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

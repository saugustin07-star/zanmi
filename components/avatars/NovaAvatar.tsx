export default function NovaAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Deep blue background */}
      <circle cx="40" cy="40" r="40" fill="#1E3A8A"/>

      {/* Afro puffs — two large circles behind the face */}
      <circle cx="21" cy="30" r="14" fill="#110833"/>
      <circle cx="59" cy="30" r="14" fill="#110833"/>

      {/* Face */}
      <ellipse cx="40" cy="48" rx="19" ry="21" fill="#7C4D19"/>

      {/* 4-pointed star on forehead */}
      <path d="M40,30 L41.6,34 L46,35.5 L41.6,37 L40,41 L38.4,37 L34,35.5 L38.4,34 Z" fill="#FFC72C"/>

      {/* Eyebrows — gently arched (curious) */}
      <path d="M29 42 Q33 39.5 37 41" stroke="#4A2800" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M43 41 Q47 39.5 51 42" stroke="#4A2800" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Eyes — large and curious */}
      <circle cx="33" cy="47" r="5.5" fill="white"/>
      <circle cx="47" cy="47" r="5.5" fill="white"/>
      <circle cx="33" cy="47" r="3.4" fill="#1F2A44"/>
      <circle cx="47" cy="47" r="3.4" fill="#1F2A44"/>
      {/* Star-shaped highlight in each eye */}
      <circle cx="34.5" cy="45.5" r="1.1" fill="white"/>
      <circle cx="48.5" cy="45.5" r="1.1" fill="white"/>

      {/* Gentle smile */}
      <path d="M32 57 Q40 64 48 57" stroke="#4A2800" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

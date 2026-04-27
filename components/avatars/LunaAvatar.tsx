export default function LunaAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Purple background */}
      <circle cx="40" cy="40" r="40" fill="#7C3AED"/>

      {/* Side hair flowing down */}
      <ellipse cx="22" cy="52" rx="9" ry="17" fill="#1A0A40"/>
      <ellipse cx="58" cy="52" rx="9" ry="17" fill="#1A0A40"/>

      {/* Hair bun on top */}
      <circle cx="40" cy="24" r="13" fill="#1A0A40"/>
      {/* Hair band connecting bun to head */}
      <rect x="33" y="34" width="14" height="5" rx="2.5" fill="#2D1060"/>

      {/* Crescent moon clip on bun — made with two overlapping circles */}
      <circle cx="44" cy="20" r="6" fill="#FFC72C"/>
      <circle cx="47" cy="19" r="5" fill="#1A0A40"/>

      {/* Face */}
      <ellipse cx="40" cy="50" rx="19" ry="21" fill="#C4814A"/>

      {/* Eyebrows — soft, slightly lifted (dreamy) */}
      <path d="M29 42 Q33 39 37 41" stroke="#7B4A00" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M43 41 Q47 39 51 42" stroke="#7B4A00" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Eyes — large and dreamy */}
      <circle cx="33" cy="48" r="5.5" fill="white"/>
      <circle cx="47" cy="48" r="5.5" fill="white"/>
      <circle cx="33" cy="48" r="3.4" fill="#1F2A44"/>
      <circle cx="47" cy="48" r="3.4" fill="#1F2A44"/>
      <circle cx="34.5" cy="46.5" r="1.1" fill="white"/>
      <circle cx="48.5" cy="46.5" r="1.1" fill="white"/>
      {/* Soft lower lash line */}
      <path d="M28.5 51 Q33 53 37.5 51" stroke="#7B4A00" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M42.5 51 Q47 53 51.5 51" stroke="#7B4A00" strokeWidth="1" fill="none" opacity="0.5"/>

      {/* Gentle smile */}
      <path d="M33 59 Q40 65 47 59" stroke="#7B4A00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Tiny star detail near right eye */}
      <path d="M53,41 L53.8,43.2 L56,43.2 L54.3,44.5 L55,46.7 L53,45.3 L51,46.7 L51.7,44.5 L50,43.2 L52.2,43.2 Z" fill="#FFC72C" opacity="0.8"/>
    </svg>
  );
}

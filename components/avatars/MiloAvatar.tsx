export default function MiloAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Green background */}
      <circle cx="40" cy="40" r="40" fill="#15803D"/>

      {/* Hair — rounded cap shape behind face */}
      <path d="M20,36 Q19,14 40,13 Q61,14 60,36 Z" fill="#7B4A2D"/>
      {/* Side hair curls */}
      <circle cx="21" cy="38" r="5" fill="#7B4A2D"/>
      <circle cx="59" cy="38" r="5" fill="#7B4A2D"/>

      {/* Face */}
      <ellipse cx="40" cy="48" rx="19" ry="21" fill="#F5DEB3"/>

      {/* Friendly eyebrows — gentle arch */}
      <path d="M28 40 Q33 37.5 37 40" stroke="#7B4A2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M43 40 Q47 37.5 52 40" stroke="#7B4A2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Eyes — slightly squinting for a happy friendly look */}
      <circle cx="33" cy="46" r="4.5" fill="white"/>
      <circle cx="47" cy="46" r="4.5" fill="white"/>
      <circle cx="33" cy="46" r="2.8" fill="#1F2A44"/>
      <circle cx="47" cy="46" r="2.8" fill="#1F2A44"/>
      <circle cx="34.2" cy="44.8" r="1" fill="white"/>
      <circle cx="48.2" cy="44.8" r="1" fill="white"/>
      {/* Squint lines under eyes */}
      <path d="M29 49.5 Q33 51 37 49.5" stroke="#C8A87A" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M43 49.5 Q47 51 51 49.5" stroke="#C8A87A" strokeWidth="1.2" strokeLinecap="round" fill="none"/>

      {/* Big open grin */}
      <path d="M30 56 Q40 68 50 56" stroke="#7B4A2D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Freckles — 3 dots on each cheek */}
      <circle cx="27" cy="51" r="1.2" fill="#C8915A" opacity="0.7"/>
      <circle cx="29.5" cy="54" r="1.2" fill="#C8915A" opacity="0.7"/>
      <circle cx="26.5" cy="56.5" r="1.2" fill="#C8915A" opacity="0.7"/>
      <circle cx="53" cy="51" r="1.2" fill="#C8915A" opacity="0.7"/>
      <circle cx="50.5" cy="54" r="1.2" fill="#C8915A" opacity="0.7"/>
      <circle cx="53.5" cy="56.5" r="1.2" fill="#C8915A" opacity="0.7"/>
    </svg>
  );
}

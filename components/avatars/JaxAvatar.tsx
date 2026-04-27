export default function JaxAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red/coral background */}
      <circle cx="40" cy="40" r="40" fill="#DC2626"/>

      {/* Hair showing under cap sides */}
      <ellipse cx="22" cy="42" rx="7" ry="9" fill="#2C1A10"/>
      <ellipse cx="58" cy="42" rx="7" ry="9" fill="#2C1A10"/>

      {/* Backwards baseball cap */}
      {/* Cap dome */}
      <path d="M21,38 Q21,18 40,16 Q59,18 59,38" fill="#1F2A44"/>
      {/* Cap band at the bottom of dome */}
      <path d="M21,38 Q40,35 59,38" stroke="#374151" strokeWidth="3" fill="none"/>
      {/* Cap strap/brim in back (left side — backwards so brim goes left) */}
      <path d="M21 32 Q12 32 11 37 Q11 41 21 40" fill="#1F2A44"/>
      <path d="M13 37 Q13 39 21 39" stroke="#374151" strokeWidth="1.5" fill="none"/>

      {/* Face */}
      <ellipse cx="40" cy="50" rx="19" ry="20" fill="#A0611B"/>

      {/* Confident eyebrows — slightly lower/straight */}
      <path d="M29 43 Q33 41 37 42" stroke="#5C3410" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M43 42 Q47 41 51 43" stroke="#5C3410" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Eyes — slightly narrowed / confident */}
      <circle cx="33" cy="48" r="4.5" fill="white"/>
      <circle cx="47" cy="48" r="4.5" fill="white"/>
      {/* Slight squint — half-ellipse lid */}
      <path d="M28.5 48 Q33 44 37.5 48" fill="#A0611B"/>
      <path d="M42.5 48 Q47 44 51.5 48" fill="#A0611B"/>
      <circle cx="33" cy="49" r="2.8" fill="#1F2A44"/>
      <circle cx="47" cy="49" r="2.8" fill="#1F2A44"/>
      <circle cx="34.2" cy="47.8" r="1" fill="white"/>
      <circle cx="48.2" cy="47.8" r="1" fill="white"/>

      {/* Smirk — curves up more on one side */}
      <path d="M32 59 Q42 67 50 58" stroke="#5C3410" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

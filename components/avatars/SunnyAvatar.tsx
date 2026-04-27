export default function SunnyAvatar({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Warm orange background */}
      <circle cx="40" cy="40" r="40" fill="#EA580C"/>

      {/* Big round hair with rays — sun-like */}
      {/* Central hair mass */}
      <circle cx="40" cy="26" r="20" fill="#EAB308"/>
      {/* Triangle rays around hair */}
      <polygon points="37,7 40,1 43,7" fill="#EAB308"/>
      <polygon points="55,10 61,6 58,13" fill="#EAB308"/>
      <polygon points="64,24 71,22 67,29" fill="#EAB308"/>
      <polygon points="20,10 19,6 25,13" fill="#EAB308"/>
      <polygon points="16,24 9,22 13,29" fill="#EAB308"/>

      {/* Face */}
      <ellipse cx="40" cy="49" rx="19" ry="21" fill="#D4883B"/>

      {/* Eyebrows — cheerful high arch */}
      <path d="M28 41 Q33 37.5 37 40" stroke="#8B5400" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M43 40 Q47 37.5 52 41" stroke="#8B5400" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Eyes — bright and round */}
      <circle cx="33" cy="47" r="4.5" fill="white"/>
      <circle cx="47" cy="47" r="4.5" fill="white"/>
      <circle cx="33" cy="47" r="2.8" fill="#1F2A44"/>
      <circle cx="47" cy="47" r="2.8" fill="#1F2A44"/>
      <circle cx="34.2" cy="45.8" r="1" fill="white"/>
      <circle cx="48.2" cy="45.8" r="1" fill="white"/>

      {/* Rosy cheeks */}
      <ellipse cx="26" cy="53" rx="6" ry="4" fill="#FF9B8A" opacity="0.55"/>
      <ellipse cx="54" cy="53" rx="6" ry="4" fill="#FF9B8A" opacity="0.55"/>

      {/* Big warm smile */}
      <path d="M29 57 Q40 69 51 57" stroke="#8B5400" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

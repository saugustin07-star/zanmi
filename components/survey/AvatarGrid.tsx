'use client';

import { AvatarOption } from '@/lib/types';
import { AVATAR_COMPONENTS } from '@/components/avatars';

interface AvatarGridProps {
  avatars: AvatarOption[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function AvatarGrid({ avatars, selected, onSelect }: AvatarGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {avatars.map((avatar) => {
        const isSelected = selected === avatar.id;
        const AvatarSvg = AVATAR_COMPONENTS[avatar.id];

        return (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar.id)}
            className={`
              flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-150
              ${isSelected
                ? 'border-zpurple bg-zpurple/5 scale-105 shadow-lg'
                : 'border-transparent bg-zbg hover:border-zpurple/30 hover:scale-102'
              }
            `}
            style={{
              borderColor: isSelected ? '#7C3AED' : 'transparent',
            }}
          >
            {/* Avatar illustration */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                {AvatarSvg ? <AvatarSvg size={64} /> : (
                  <div
                    className="w-full h-full flex items-center justify-center text-2xl font-black"
                    style={{ backgroundColor: avatar.bgColor, color: avatar.primaryColor }}
                  >
                    {avatar.name[0]}
                  </div>
                )}
              </div>
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-zpurple rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs font-black">✓</span>
                </div>
              )}
            </div>

            {/* Name */}
            <div className="text-center">
              <p className={`text-sm font-black leading-none ${isSelected ? 'text-zpurple' : 'text-zdark'}`}>
                {avatar.name}
              </p>
              <p className="text-xs text-zdark/40 font-semibold mt-0.5 leading-tight">{avatar.theme}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

import { getInitials, getAvatarColor } from '../../utils/avatarUtils';
import { getHealthDotColor } from '../../utils/healthIndicator';
import type { HealthRisk } from '../../types/employee';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<AvatarSize, { container: string; text: string; dot: string; dotRing: string }> = {
  xs: { container: 'h-7 w-7', text: 'text-[10px]', dot: 'h-2 w-2', dotRing: 'ring-1' },
  sm: { container: 'h-8 w-8', text: 'text-[11px]', dot: 'h-2 w-2', dotRing: 'ring-1' },
  md: { container: 'h-10 w-10', text: 'text-xs', dot: 'h-2.5 w-2.5', dotRing: 'ring-2' },
  lg: { container: 'h-12 w-12', text: 'text-sm', dot: 'h-3 w-3', dotRing: 'ring-2' },
  xl: { container: 'h-14 w-14', text: 'text-base', dot: 'h-3 w-3', dotRing: 'ring-2' },
};

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  healthRisk?: HealthRisk;
  className?: string;
}

export function Avatar({ name, size = 'md', healthRisk, className = '' }: AvatarProps) {
  const sizes = sizeClasses[size];
  const initials = getInitials(name);
  const color = getAvatarColor(name);

  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        className={`${sizes.container} ${sizes.text} ${color} flex items-center justify-center rounded-full font-semibold text-white shadow-sm`}
        aria-label={name}
      >
        {initials}
      </div>
      {healthRisk && (
        <div
          className={`absolute -bottom-0.5 -right-0.5 ${sizes.dot} rounded-full ${sizes.dotRing} ring-white ${getHealthDotColor(healthRisk)}`}
        />
      )}
    </div>
  );
}

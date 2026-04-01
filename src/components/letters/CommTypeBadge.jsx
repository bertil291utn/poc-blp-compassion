import { ArrowLeftRight, Circle, CircleDot, CalendarCheck, MailX } from 'lucide-react';
import clsx from 'clsx';

export const COMM_TYPE_CONFIG = {
  'reciproca': {
    label: 'Recíproca',
    Icon: ArrowLeftRight,
    classes: 'bg-blue-50 text-blue-700',
  },
  'regalo-pequeno': {
    label: 'Regalo pequeño',
    Icon: Circle,
    classes: 'bg-amber-50 text-amber-700',
  },
  'regalo-grande': {
    label: 'Regalo grande',
    Icon: CircleDot,
    classes: 'bg-purple-50 text-purple-700',
  },
  'programada': {
    label: 'Programada',
    Icon: CalendarCheck,
    classes: 'bg-green-50 text-green-700',
  },
  'salida': {
    label: 'Salida',
    Icon: MailX,
    classes: 'bg-gray-100 text-gray-600',
  },
};

export default function CommTypeBadge({ type, size = 'sm' }) {
  const cfg = COMM_TYPE_CONFIG[type];
  if (!cfg) return null;
  const { label, Icon, classes } = cfg;
  return (
    <span className={clsx(
      'inline-flex items-center gap-1 rounded-full font-medium',
      classes,
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
    )}>
      <Icon size={size === 'sm' ? 11 : 14} strokeWidth={2.2} />
      {label}
    </span>
  );
}

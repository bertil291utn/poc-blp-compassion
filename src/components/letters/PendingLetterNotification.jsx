import { useNavigate } from 'react-router-dom';
import { X, PenLine } from 'lucide-react';
import { useState } from 'react';
import CommTypeBadge, { COMM_TYPE_CONFIG } from './CommTypeBadge';
import clsx from 'clsx';

const TYPE_BORDER = {
  'reciproca':     'border-blue-300 bg-blue-50',
  'regalo-pequeno':'border-amber-300 bg-amber-50',
  'regalo-grande': 'border-purple-300 bg-purple-50',
  'programada':    'border-green-300 bg-green-50',
  'salida':        'border-gray-300 bg-gray-50',
};

const TYPE_BTN = {
  'reciproca':     'bg-blue-600 hover:bg-blue-700',
  'regalo-pequeno':'bg-amber-600 hover:bg-amber-700',
  'regalo-grande': 'bg-purple-600 hover:bg-purple-700',
  'programada':    'bg-green-600 hover:bg-green-700',
  'salida':        'bg-gray-600 hover:bg-gray-700',
};

export default function PendingLetterNotification({ action, onDismiss }) {
  const navigate = useNavigate();
  const cfg = COMM_TYPE_CONFIG[action.commType];

  function formatDue(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  }

  const due = formatDue(action.dueDate);

  return (
    <div className={clsx(
      'rounded-xl border px-4 py-3 flex gap-3 items-start',
      TYPE_BORDER[action.commType] ?? 'border-gray-200 bg-gray-50'
    )}>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <CommTypeBadge type={action.commType} />
          {due && (
            <span className="text-xs text-gray-500">Vence {due}</span>
          )}
        </div>
        <p className="text-sm text-gray-700 leading-snug">{action.message}</p>

        <button
          onClick={() => navigate('/compose')}
          className={clsx(
            'mt-2.5 flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors',
            TYPE_BTN[action.commType] ?? 'bg-gray-600 hover:bg-gray-700'
          )}
        >
          <PenLine size={12} />
          Escribir ahora
        </button>
      </div>

      <button
        onClick={() => onDismiss(action.id)}
        className="p-1 rounded-full hover:bg-black/10 transition-colors flex-shrink-0 mt-0.5"
        aria-label="Descartar"
      >
        <X size={14} className="text-gray-400" />
      </button>
    </div>
  );
}

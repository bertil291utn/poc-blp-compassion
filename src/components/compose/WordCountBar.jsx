import clsx from 'clsx';

export default function WordCountBar({ current, min }) {
  const pct = Math.min(100, Math.round((current / min) * 100));
  const met = current >= min;

  return (
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-gray-500">Longitud mínima</span>
        <span className={clsx(
          'text-xs font-semibold',
          met ? 'text-green-600' : 'text-red-500'
        )}>
          {current} de {min} palabras {met && '✓'}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300',
            met ? 'bg-green-500' : 'bg-red-400'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

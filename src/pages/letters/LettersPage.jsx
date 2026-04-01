import { useState } from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import { letters as initialLetters, pendingActions as initialPending } from '../../data/mockData';
import LetterCard from '../../components/letters/LetterCard';
import PendingLetterNotification from '../../components/letters/PendingLetterNotification';

const filters = [
  { key: 'all', label: 'Todas' },
  { key: 'received', label: 'Recibidas' },
  { key: 'sent', label: 'Enviadas' },
  { key: 'draft', label: 'Borradores' },
];

export default function LettersPage() {
  const [letters, setLetters] = useState(initialLetters);
  const [pending, setPending] = useState(initialPending);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const unreadCount = letters.filter(l => l.isUnread).length;

  const filtered = letters.filter(l => {
    if (filter !== 'all' && l.status !== filter) return false;
    if (search && !l.subject.toLowerCase().includes(search.toLowerCase()) &&
        !l.preview.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function handleDelete(id) {
    setLetters(prev => prev.filter(l => l.id !== id));
  }

  function handleDismissPending(id) {
    setPending(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900">Cartas</h1>
          {unreadCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount} nueva{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cartas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-compassion-blue/30 focus:border-compassion-blue"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={clsx(
                'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
                filter === f.key
                  ? 'bg-compassion-blue text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              )}
            >
              {f.label}
              {f.key === 'received' && unreadCount > 0 && (
                <span className="ml-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs inline-flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pending notifications */}
      {pending.length > 0 && (
        <div className="px-4 pb-1 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-1">
            Pendiente{pending.length > 1 ? 's' : ''}
          </p>
          {pending.map(action => (
            <PendingLetterNotification
              key={action.id}
              action={action}
              onDismiss={handleDismissPending}
            />
          ))}
        </div>
      )}

      {/* List */}
      <div className="px-4 pb-4 space-y-3 mt-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">No hay cartas{search ? ' que coincidan' : ''}</p>
          </div>
        ) : (
          filtered.map(letter => (
            <LetterCard key={letter.id} letter={letter} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}

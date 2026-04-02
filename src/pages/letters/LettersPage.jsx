import { useState } from 'react';
import { Search, X } from 'lucide-react';
import clsx from 'clsx';
import { letters as initialLetters, pendingActions as initialPending } from '../../data/mockData';
import LetterCard from '../../components/letters/LetterCard';
import PendingLetterNotification from '../../components/letters/PendingLetterNotification';

const filters = [
  { key: 'received', label: 'Recibidas' },
  { key: 'sent', label: 'Enviadas' },
  { key: 'draft', label: 'Borradores' },
];

export default function LettersPage() {
  const [letters, setLetters] = useState(initialLetters);
  const [pending, setPending] = useState(initialPending);
  const [filter, setFilter] = useState('received');
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const unreadCount = letters.filter(l => l.isUnread).length;

  const filtered = letters.filter(l => {
    if (l.status !== filter) return false;
    if (search && !l.subject.toLowerCase().includes(search.toLowerCase()) &&
        !l.preview.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function handleDelete(id) {
    setLetters(prev => prev.filter(l => l.id !== id));
  }

  function closeSearch() {
    setSearch('');
    setSearchOpen(false);
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          {searchOpen ? (
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-compassion-blue/30 focus:border-compassion-blue"
                />
              </div>
              <button onClick={closeSearch} className="text-gray-400 p-1">
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-gray-900">Cartas</h1>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Search size={18} className="text-gray-500" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={clsx(
                'flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors',
                filter === f.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {f.label}
              {f.key === 'received' && unreadCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 bg-orange-500 rounded-full text-white text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pending notifications — only in received tab */}
      {filter === 'received' && pending.length > 0 && (
        <div className="px-4 pt-1 pb-1 space-y-2">
          {pending.map(action => (
            <PendingLetterNotification
              key={action.id}
              action={action}
              onDismiss={(id) => setPending(prev => prev.filter(p => p.id !== id))}
            />
          ))}
        </div>
      )}

      {/* List */}
      <div className="px-4 pb-4 space-y-2 mt-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">
              {search ? 'Sin resultados' : 'No hay cartas aquí'}
            </p>
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

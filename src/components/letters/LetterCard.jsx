import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import CommTypeBadge from './CommTypeBadge';
import DeleteModal from './DeleteModal';

export default function LetterCard({ letter, onDelete }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - d) / 86400000);
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return d.toLocaleDateString('es-ES', { weekday: 'short' });
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  }

  return (
    <>
      <div
        className={clsx(
          'bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 cursor-pointer hover:shadow-md transition-shadow',
          letter.isUnread && 'border-l-4 border-l-compassion-blue'
        )}
        onClick={() => navigate(`/letters/${letter.id}`)}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {letter.status === 'received' && (
              <p className={clsx(
                'text-xs mb-0.5',
                letter.isUnread ? 'text-compassion-blue font-semibold' : 'text-gray-400'
              )}>
                De: {letter.from}
              </p>
            )}
            {letter.status === 'sent' && (
              <p className="text-xs mb-0.5 text-gray-400">
                Para: {letter.to}
              </p>
            )}
            <p className={clsx(
              'text-sm leading-snug truncate',
              letter.isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-800'
            )}>
              {letter.subject}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            <span className="text-xs text-gray-400">{formatDate(letter.date)}</span>
            {letter.isUnread && (
              <span className="w-2 h-2 bg-orange-500 rounded-full ml-1" />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors ml-0.5"
            >
              <MoreVertical size={14} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Preview */}
        <p className="text-xs text-gray-500 mt-1 line-clamp-1 leading-relaxed">
          {letter.preview}
        </p>

        {/* Footer */}
        {((letter.status !== 'received' && letter.commType) || (letter.status === 'draft' && letter.minWords)) && (
          <div className="flex items-center gap-2 mt-2">
            {letter.status !== 'received' && letter.commType && <CommTypeBadge type={letter.commType} />}
            {letter.status === 'draft' && letter.minWords && (
              <span className={clsx(
                'text-xs font-medium',
                letter.wordCount >= letter.minWords ? 'text-green-600' : 'text-orange-500'
              )}>
                {letter.wordCount}/{letter.minWords} palabras
              </span>
            )}
          </div>
        )}
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)}>
          <div
            className="absolute bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-36 z-50"
            style={{ top: '50%', right: '1rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowMenu(false); setShowDeleteModal(true); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          letter={letter}
          onConfirm={() => { setShowDeleteModal(false); onDelete(letter.id); }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
